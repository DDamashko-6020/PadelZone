import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import './Login.css'

function Login() {
  const [form, setForm] = useState({
    email: localStorage.getItem('rememberedEmail') || '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberEmail, setRememberEmail] = useState(!!localStorage.getItem('rememberedEmail'))
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const from = location.state?.from?.pathname || '/reservar'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleRememberEmailChange = (e) => {
    setRememberEmail(e.target.checked)
    if (!e.target.checked) {
      localStorage.removeItem('rememberedEmail')
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validaciones
    if (!form.email || !form.password) {
      setError('Por favor completa todos los campos.')
      return
    }

    if (!validateEmail(form.email)) {
      setError('Por favor ingresa un email válido.')
      return
    }

    if (!validatePassword(form.password)) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setLoading(true)

    try {
      // Simulate API call with potential network error
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random network error (10% chance)
          if (Math.random() < 0.1) {
            reject(new Error('Error de conexión. Verifica tu internet.'))
            return
          }

          // For demo purposes, accept any valid email format
          if (validateEmail(form.email)) {
            resolve()
          } else {
            reject(new Error('Credenciales inválidas.'))
          }
        }, 800)
      })

      // Guardar email si se marca recordar
      if (rememberEmail) {
        localStorage.setItem('rememberedEmail', form.email)
      }

      login({
        email: form.email,
        name: form.email.split('@')[0],
      })
      navigate(from, { replace: true })

    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
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
          <form onSubmit={handleSubmit} className="login-form" role="form" aria-labelledby="login-title">
            {error && (
              <div className="login-error" role="alert" aria-live="polite">
                <i className="material-icons" aria-hidden="true">error_outline</i>
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                aria-describedby="email-help"
                aria-invalid={error.includes('email') ? 'true' : 'false'}
                required
                className="login-input"
              />
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="password">Contraseña</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  aria-describedby="password-help"
                  aria-invalid={error.includes('contraseña') ? 'true' : 'false'}
                  required
                  className="login-input login-input-password"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="password-toggle"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <i className="material-icons">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </i>
                </button>
              </div>
            </div>

            {/* Remember Email */}
            <div className="login-field">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberEmail}
                  onChange={handleRememberEmailChange}
                  aria-describedby="remember-help"
                  className="checkbox-input"
                />
                <span className="checkbox-text">Recordar mi email</span>
              </label>
            </div>

            <button
              type="submit"
              className={`login-btn ${loading ? 'login-btn-loading' : ''}`}
              disabled={loading}
              aria-describedby="login-help"
            >
              {loading ? (
                <>
                  <i className="material-icons spinning" aria-hidden="true">refresh</i>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <i className="material-icons" aria-hidden="true">login</i>
                  Iniciar Sesión
                </>
              )}
            </button>

            {/* Forgot Password Link */}
            <div className="login-links">
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => setShowForgotPassword(true)}
                aria-label="Recuperar contraseña olvidada"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <p className="login-note" id="login-help">
              <i className="material-icons tiny" aria-hidden="true">info</i>
              Esta es una demostración. Cualquier email válido funciona.
            </p>
          </form>

           <div className="login-divider">
             <span>o</span>
           </div>

           {/* Register Link */}
           <div className="login-guest">
             <p>¿No tienes cuenta?</p>
             <Link to="/registro" className="login-btn-guest">
               <i className="material-icons" aria-hidden="true">person_add</i>
               Crear Cuenta
             </Link>
           </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPassword
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  )
}

export default Login
