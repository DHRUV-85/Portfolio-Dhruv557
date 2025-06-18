"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Sun, Moon, Menu, X } from "../icons"
import { useTheme } from "../contexts/ThemeContext"

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed w-full z-20 top-0 left-0 transition-colors duration-300
        ${darkMode ? "bg-gray-900/80 backdrop-blur text-white" : "bg-white/80 backdrop-blur text-gray-900"}
        shadow-lg border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-1">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Dhruv</span>
          <span className="text-blue-400">.dev</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-2 items-center">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-4 py-2 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {label}
            </a>
          ))}

          {/* Admin Access Button */}
          {/* <Link
            to="/admin/login"
            className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            Admin
          </Link> */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="ml-1 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 transition"
            aria-label="Open Mobile Menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg animate-fadeIn px-4 py-4">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg mb-1 font-semibold hover:bg-blue-500 hover:text-white transition"
            >
              {label}
            </a>
          ))}

          {/* Mobile Admin Access */}
          <Link
            to="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg mb-1 font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Admin Access
          </Link>
        </div>
      )}
    </nav>
  )
}
