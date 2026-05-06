import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Reservations from './pages/Reservations/Reservations'
import Login from './pages/Login/Login'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Courts from './pages/Courts/Courts'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="loading-screen" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <i className="material-icons spinning" style={{ fontSize: '48px', color: '#1e3c72' }}>
          refresh
        </i>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="loading-screen" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <i className="material-icons spinning" style={{ fontSize: '48px', color: '#1e3c72' }}>
          refresh
        </i>
      </div>
    )
  }

  // Redirect if already logged in and trying to access login page
  if (isAuthenticated && location.pathname === '/login') {
    const from = location.state?.from?.pathname || '/reservar'
    return <Navigate to={from} replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/reservar"
            element={
              <ProtectedRoute>
                <Reservations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route 
          path="/canchas" 
          element={<Courts />} 
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App