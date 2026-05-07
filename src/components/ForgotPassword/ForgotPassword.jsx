import { useState } from 'react'
import './ForgotPassword.css'

function ForgotPassword({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setError('')
    setSuccess('')
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email) {
      setError('Por favor ingresa tu email.')
      return
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido.')
      return
    }

    setLoading(true)

    try {
      // Simulate API call for password reset
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate email not found (10% chance)
          if (Math.random() < 0.1) {
            reject(new Error('No encontramos una cuenta con ese email.'))
            return
          }

          // Simulate network error (5% chance)
          if (Math.random() < 0.05) {
            reject(new Error('Error de conexión. Inténtalo de nuevo.'))
            return
          }

          resolve()
        }, 1500)
      })

      setSuccess('Te hemos enviado un email con instrucciones para restablecer tu contraseña. Revisa tu bandeja de entrada.')

    } catch (err) {
      setError(err.message || 'Error al enviar el email. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setEmail('')
    setError('')
    setSuccess('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="forgot-modal-overlay" onClick={handleClose}>
      <div className="forgot-modal" onClick={e => e.stopPropagation()}>
        <button className="forgot-modal-close" onClick={handleClose}>
          <i className="material-icons">close</i>
        </button>

        <div className="forgot-modal-content">
          <div className="forgot-modal-header">
            <h2>Recuperar Contraseña</h2>
            <p>Ingresa tu email y te enviaremos instrucciones para restablecer tu contraseña.</p>
          </div>

          <form onSubmit={handleSubmit} className="forgot-form">
            {error && (
              <div className="forgot-error" role="alert" aria-live="polite">
                <i className="material-icons" aria-hidden="true">error_outline</i>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="forgot-success" role="alert" aria-live="polite">
                <i className="material-icons" aria-hidden="true">check_circle</i>
                <span>{success}</span>
              </div>
            )}

            <div className="forgot-field">
              <label htmlFor="forgot-email">Email</label>
              <input
                type="email"
                id="forgot-email"
                value={email}
                onChange={handleEmailChange}
                placeholder="tu@email.com"
                autoComplete="email"
                required
                className="forgot-input"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className={`forgot-btn ${loading ? 'forgot-btn-loading' : ''}`}
              disabled={loading || !email}
            >
              {loading ? (
                <>
                  <i className="material-icons spinning" aria-hidden="true">refresh</i>
                  Enviando...
                </>
              ) : (
                <>
                  <i className="material-icons" aria-hidden="true">send</i>
                  Enviar Instrucciones
                </>
              )}
            </button>
          </form>

          <div className="forgot-footer">
            <button
              type="button"
              className="back-to-login"
              onClick={handleClose}
            >
              ← Volver al inicio de sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword