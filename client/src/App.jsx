import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastProvider } from "./contexts/ToastContext"

// Portfolio Components (your existing code)
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

// Dashboard Components
import ProtectedRoute from "./components/Dashboard/ProtectedRoute"
import Layout from "./components/Dashboard/Layout"
import Login from "./pages/Dashboard/Login"
import ForgotPassword from "./pages/Dashboard/ForgotPassword"
import ResetPassword from "./pages/Dashboard/ResetPassword"
import Dashboard from "./pages/Dashboard/Dashboard"
import Projects from "./pages/Dashboard/Projects"
import ProjectForm from "./pages/Dashboard/ProjectForm"
import Messages from "./pages/Dashboard/Messages"
import MessageDetail from "./pages/Dashboard/MessageDetail"
import Profile from "./pages/Dashboard/Profile"

import "./index.css"

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Portfolio Website Route (Single Page) */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                }
              />

              {/* Admin Authentication Routes (No Layout) */}
              <Route path="https://portfolio-dhruv557-live.onrender.com/admin/login" element={<Login />} />
              <Route path="/admin/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin/reset-password/:token" element={<ResetPassword />} />

              {/* Admin Dashboard Routes (Protected) */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/new" element={<ProjectForm />} />
                <Route path="projects/edit/:id" element={<ProjectForm />} />
                <Route path="messages" element={<Messages />} />
                <Route path="messages/:id" element={<MessageDetail />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}
