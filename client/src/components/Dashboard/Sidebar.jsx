"use client"
import { NavLink, useLocation } from "react-router-dom"
import { HomeIcon, FolderIcon, ChatBubbleLeftIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
  { name: "Projects", href: "/admin/projects", icon: FolderIcon },
  { name: "Messages", href: "/admin/messages", icon: ChatBubbleLeftIcon },
  { name: "Profile", href: "/admin/profile", icon: UserIcon },
]

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Portfolio Admin</h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href !== "/dashboard" && location.pathname.startsWith(item.href))

              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                    onClick={() => onClose()}
                  >
                    <item.icon
                      className={`
                      mr-3 h-5 w-5 flex-shrink-0
                      ${isActive ? "text-blue-700" : "text-gray-400"}
                    `}
                    />
                    {item.name}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
