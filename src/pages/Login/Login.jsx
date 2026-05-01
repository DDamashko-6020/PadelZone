import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Login.css'

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const from = location.state?.from?.pathname || '/reservar'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      setError('Por favor completa todos los campos.')
      return
    }

    setLoading(true)

    // Simulate authentication (replace with real API call)
    setTimeout(() => {
      // For demo purposes, accept any valid email format
      if (form.email.includes('@')) {
        login({
          email: form.email,
          name: form.email.split('@')[0],
        })
        navigate(from, { replace: true })
      } else {
        setError('Email inválido. Intenta con un formato válido.')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="login-page">
      {/* Header */}
      <div className="login-header">
        <div className="container">
          <h1>Iniciar Sesión</h1>
          <p>Accede a tu cuenta para hacer reservas</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="container login-body">
        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="login-error">
                <i className="material-icons">error_outline</i>
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <div className="login-input-icon">
                <i className="material-icons">email</i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="password">Contraseña</label>
              <div className="login-input-icon">
                <i className="material-icons">lock</i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`login-btn ${loading ? 'login-btn-loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="material-icons spinning">refresh</i>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <i className="material-icons">login</i>
                  Iniciar Sesión
                </>
              )}
            </button>

            <p className="login-note">
              <i className="material-icons tiny">info</i>
              Esta es una demostración. Cualquier email válido funciona.
            </p>
          </form>

          <div className="login-divider">
            <span>o</span>
          </div>

          <div className="login-guest">
            <p>¿No tienes cuenta?</p>
            <button 
              className="login-btn-guest"
              onClick={() => {
                login({ email: 'invitado@padelzone.com', name: 'Invitado' })
                navigate(from, { replace: true })
              }}
            >
              Continuar como Invitado
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
