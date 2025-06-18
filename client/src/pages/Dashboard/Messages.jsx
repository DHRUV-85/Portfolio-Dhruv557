"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TrashIcon, EyeIcon, CheckIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import api from "../../services/api"
import { useToast } from "../../contexts/ToastContext"
import LoadingSpinner from "../../components/Dashboard/LoadingSpinner"

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState({})
  const { showSuccess, showError } = useToast()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await api.get("/messages")
      setMessages(response.data.data)
    } catch (error) {
      showError("Failed to fetch messages")
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    setActionLoading((prev) => ({ ...prev, [id]: "read" }))
    try {
      await api.put(`/messages/${id}/mark-read`)
      setMessages(messages.map((msg) => (msg._id === id ? { ...msg, read: true } : msg)))
      showSuccess("Message marked as read")
    } catch (error) {
      showError("Failed to mark message as read")
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }))
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return
    }

    setActionLoading((prev) => ({ ...prev, [id]: "delete" }))
    try {
      await api.delete(`/messages/${id}`)
      setMessages(messages.filter((msg) => msg._id !== id))
      showSuccess("Message deleted successfully")
    } catch (error) {
      showError("Failed to delete message")
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="mt-1 text-sm text-gray-600">Manage contact form messages</p>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12">
          <ChatBubbleLeftIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No messages</h3>
          <p className="mt-1 text-sm text-gray-500">No contact messages have been received yet.</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {messages.map((message) => (
              <li key={message._id}>
                <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {!message.read && <div className="h-2 w-2 bg-blue-600 rounded-full"></div>}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium truncate ${
                            !message.read ? "text-gray-900" : "text-gray-600"
                          }`}
                        >
                          {message.name}
                        </p>
                        <p className="text-sm text-gray-500">{new Date(message.createdAt).toLocaleDateString()}</p>
                      </div>

                      <p className={`text-sm truncate ${!message.read ? "text-gray-900" : "text-gray-600"}`}>
                        {message.subject}
                      </p>

                      <p className="text-sm text-gray-500 truncate">{message.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/admin/messages/${message._id}`}
                      className="p-2 text-gray-400 hover:text-blue-600"
                      title="View message"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Link>

                    {!message.read && (
                      <button
                        onClick={() => handleMarkAsRead(message._id)}
                        disabled={actionLoading[message._id] === "read"}
                        className="p-2 text-gray-400 hover:text-green-600 disabled:opacity-50"
                        title="Mark as read"
                      >
                        {actionLoading[message._id] === "read" ? (
                          <LoadingSpinner size="small" />
                        ) : (
                          <CheckIcon className="h-4 w-4" />
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(message._id)}
                      disabled={actionLoading[message._id] === "delete"}
                      className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50"
                      title="Delete message"
                    >
                      {actionLoading[message._id] === "delete" ? (
                        <LoadingSpinner size="small" />
                      ) : (
                        <TrashIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Messages
