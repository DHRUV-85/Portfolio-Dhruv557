"use client"

import { useState, useEffect } from "react"
import { FolderIcon, ChatBubbleLeftIcon, EyeIcon, StarIcon } from "@heroicons/react/24/outline"
import api from "../../services/api"
import LoadingSpinner from "../../components/Dashboard/LoadingSpinner"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
  })
  const [recentProjects, setRecentProjects] = useState([])
  const [recentMessages, setRecentMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, messagesRes] = await Promise.all([api.get("/projects"), api.get("/messages")])

      const projects = projectsRes.data.data
      console.log(projects)
      const messages = messagesRes.data.data

      setStats({
        totalProjects: projects.length,
        featuredProjects: projects.filter((p) => p.featured).length,
        totalMessages: messages.length,
        unreadMessages: messages.filter((m) => !m.read).length,
      })

      setRecentProjects(projects.slice(0, 5))
      setRecentMessages(messages.slice(0, 5))
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  const statCards = [
    {
      name: "Total Projects",
      value: stats.totalProjects,
      icon: FolderIcon,
      color: "bg-blue-500",
    },
    {
      name: "Featured Projects",
      value: stats.featuredProjects,
      icon: StarIcon,
      color: "bg-yellow-500",
    },
    {
      name: "Total Messages",
      value: stats.totalMessages,
      icon: ChatBubbleLeftIcon,
      color: "bg-green-500",
    },
    {
      name: "Unread Messages",
      value: stats.unreadMessages,
      icon: EyeIcon,
      color: "bg-red-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Projects</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div key={project._id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {project.image?.url && (
                        <img
                          src={project.image.url || "/placeholder.svg"}
                          alt={project.title}
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{project.title}</p>
                        <p className="text-sm text-gray-500">{new Date(project.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {project.featured && <StarIcon className="h-5 w-5 text-yellow-400" />}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">No projects yet</div>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Messages</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentMessages.length > 0 ? (
              recentMessages.map((message) => (
                <div key={message._id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{message.name}</p>
                      <p className="text-sm text-gray-500">{message.subject}</p>
                      <p className="text-xs text-gray-400">{new Date(message.createdAt).toLocaleDateString()}</p>
                    </div>
                    {!message.read && <div className="h-2 w-2 bg-blue-600 rounded-full"></div>}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">No messages yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
