"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import api from "../../services/api"
import { useToast } from "../../contexts/ToastContext"
import LoadingSpinner from "../../components/Dashboard/LoadingSpinner"

const MessageDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { showSuccess, showError } = useToast()

  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    fetchMessage()
  }, [id])

  const fetchMessage = async () => {
    try {
      const response = await api.get(`/messages/${id}`)
      setMessage(response.data.data)
    } catch (error) {
      showError("Failed to fetch message")
      navigate("/messages")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return
    }

    setDeleteLoading(true)
    try {
      await api.delete(`/messages/${id}`)
      showSuccess("Message deleted successfully")
      navigate("/messages")
    } catch (error) {
      showError("Failed to delete message")
    } finally {
      setDeleteLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!message) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Message not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate("/messages")} className="p-2 text-gray-400 hover:text-gray-600">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Message Details</h1>
            <p className="mt-1 text-sm text-gray-600">From {message.name}</p>
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={deleteLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleteLoading ? <LoadingSpinner size="small" className="mr-2" /> : <TrashIcon className="h-4 w-4 mr-2" />}
          Delete
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">{message.subject}</h2>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                message.read ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
              }`}
            >
              {message.read ? "Read" : "Unread"}
            </span>
          </div>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{message.name}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a href={`mailto:${message.email}`} className="text-blue-600 hover:text-blue-500">
                  {message.email}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{new Date(message.createdAt).toLocaleString()}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">{message.read ? "Read" : "Unread"}</dd>
            </div>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-2">Message</dt>
            <dd className="text-sm text-gray-900 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">{message.message}</dd>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Received on {new Date(message.createdAt).toLocaleDateString()}</p>
            <a
              href={`mailto:${message.email}?subject=Re: ${message.subject}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reply via Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageDetail
