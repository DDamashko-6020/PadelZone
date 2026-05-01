import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Reservations.css'

const courts = [
  { id: 1, name: 'Cancha Central',     price: 120000 },
  { id: 2, name: 'Cancha Premium',     price: 160000 },
  { id: 3, name: 'Cancha Recreativa',  price: 100000 },
  { id: 4, name: 'Cancha Profesional', price: 180000 },
  { id: 5, name: 'Cancha Express',     price: 90000  }
]

const timeSlots = [
  '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
  '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM',
  '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
  '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'
]

function Reservations() {
  const [searchParams] = useSearchParams()
  const courtParam = searchParams.get('court')
  const { user } = useAuth()
  
  const [form, setForm] = useState({
    court: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  })
  const [confirmed, setConfirmed] = useState(false)

  // Set court from URL query on mount
  useEffect(() => {
    if (courtParam) {
      const court = courts.find(c => c.name === courtParam)
      if (court) {
        setForm(prev => ({ ...prev, court: court.id.toString() }))
      }
    }
  }, [courtParam])

  // Pre-fill contact info when user is authenticated
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }))
    }
  }, [user])

  const selectedCourt = courts.find(c => c.id === parseInt(form.court))

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.court || !form.date || !form.time || !form.name || !form.email || !form.phone) {
      alert('Por favor completa todos los campos.')
      return
    }
    setConfirmed(true)
  }

  const formatPrice = (p) => `$${p.toLocaleString('es-CO')}`

  // Fecha mínima = hoy
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="reservations-page">

      {/* Header */}
      <div className="reservations-header">
        <div className="container">
          <h1>Reservar Cancha</h1>
          <p>Completa el formulario y asegura tu horario preferido</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="container reservations-body">
        <div className="reservations-grid">

          {/* Columna izquierda — Formulario */}
          <div className="res-form-card">

            {/* Sección 1 */}
            <div className="res-section">
              <h5>Información de Reserva</h5>
              <p className="res-subtitle">Selecciona la cancha, fecha y horario para tu reserva</p>

              <div className="res-row">
                {/* Cancha */}
                <div className="res-field">
                  <label>Cancha</label>
                  <div className="res-select-wrapper">
                    <select name="court" value={form.court} onChange={handleChange}>
                      <option value="">Selecciona una cancha</option>
                      {courts.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} — {formatPrice(c.price)}/hora
                        </option>
                      ))}
                    </select>
                    <i className="material-icons">expand_more</i>
                  </div>
                </div>

                {/* Fecha */}
                <div className="res-field">
                  <label>Fecha</label>
                  <div className="res-input-icon">
                    <i className="material-icons">calendar_today</i>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      min={today}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Horario */}
              <div className="res-field full">
                <label>Horario</label>
                <div className="res-select-wrapper">
                  <select name="time" value={form.time} onChange={handleChange}>
                    <option value="">Selecciona un horario</option>
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <i className="material-icons">expand_more</i>
                </div>
              </div>
            </div>

            <hr className="res-divider" />

            {/* Sección 2 */}
            <div className="res-section">
              <h5>Información de Contacto</h5>

              {/* Nombre */}
              <div className="res-field full">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Juan Pérez"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="res-row">
                {/* Email */}
                <div className="res-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="juan@ejemplo.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Teléfono */}
                <div className="res-field">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+57 300 000 0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Botón */}
            <button className="res-btn-confirm" onClick={handleSubmit}>
              <i className="material-icons">check</i>
              Confirmar Reserva
            </button>

          </div>

          {/* Columna derecha — Resumen */}
          <div className="res-summary-card">
            <h5>Resumen de Reserva</h5>

            <div className="res-summary-rows">
              <div className="res-summary-row">
                <span>Cancha</span>
                <span>{selectedCourt ? selectedCourt.name : '—'}</span>
              </div>
              <div className="res-summary-row">
                <span>Fecha</span>
                <span>{form.date || '—'}</span>
              </div>
              <div className="res-summary-row">
                <span>Horario</span>
                <span>{form.time || '—'}</span>
              </div>
              <div className="res-summary-row">
                <span>Duración</span>
                <span>1 hora</span>
              </div>
            </div>

            <div className="res-summary-total">
              <span>Total</span>
              <span className="res-total-price">
                {selectedCourt ? formatPrice(selectedCourt.price) : '$0'}
              </span>
            </div>

            <div className="res-policies">
              <p><strong>Políticas de Reserva</strong></p>
              <ul>
                <li>Cancelación gratuita hasta 24h antes</li>
                <li>Llega 10 minutos antes de tu reserva</li>
                <li>Equipamiento básico incluido</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Modal de confirmación */}
      {confirmed && (
        <div className="res-modal-overlay" onClick={() => setConfirmed(false)}>
          <div className="res-modal" onClick={e => e.stopPropagation()}>
            <div className="res-modal-icon">
              <i className="material-icons">check_circle</i>
            </div>
            <h4>¡Reserva Confirmada!</h4>
            <p>Tu reserva ha sido registrada exitosamente.</p>
            <div className="res-modal-details">
              <p><strong>Cancha:</strong> {selectedCourt?.name}</p>
              <p><strong>Fecha:</strong> {form.date}</p>
              <p><strong>Horario:</strong> {form.time}</p>
              <p><strong>Total:</strong> {selectedCourt ? formatPrice(selectedCourt.price) : ''}</p>
            </div>
            <button className="res-modal-btn" onClick={() => setConfirmed(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Reservations