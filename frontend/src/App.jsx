import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ImportContacts from './pages/ImportContacts'
import Contacts from './pages/Contacts'
import CreateCampaign from './pages/CreateCampaign'
import Campaigns from './pages/Campaigns'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes (User must be logged in) */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/import" element={<ProtectedRoute><ImportContacts /></ProtectedRoute>}/>
      <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
      <Route path="/campaigns/new" element={<ProtectedRoute><CreateCampaign /></ProtectedRoute>} />
      <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
      
      {/* 404 Fallback (Agar koi galat URL dale toh) */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App