import { useState } from 'react'
import './Reservations.css'

import c1 from '../../img/Cancha1.jpg'
import c2 from '../../img/Cancha2.jpg'
import c3 from '../../img/Cancha3.jpg'
import c4 from '../../img/Cancha4.jpg'
import c5 from '../../img/Cancha5.jpg'

const courts = [
  { id: 1, name: 'Cancha Central',     price: 120000, img: c1, type: 'Exterior', desc: 'Césped sintético de última generación' },
  { id: 2, name: 'Cancha Premium',     price: 160000, img: c2, type: 'Interior', desc: 'Climatización y iluminación LED' },
  { id: 3, name: 'Cancha Recreativa',  price: 100000, img: c3, type: 'Exterior', desc: 'Perfecta para principiantes' },
  { id: 4, name: 'Cancha Profesional', price: 180000, img: c4, type: 'Interior', desc: 'Para torneos y alto rendimiento' },
  { id: 5, name: 'Cancha Express',     price: 90000,  img: c5, type: 'Exterior', desc: 'Ideal para partidos rápidos' }
]

const hours = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

const formatHour = (h) => {
  const suffix = h >= 12 ? 'PM' : 'AM'
  const display = h > 12 ? h - 12 : h === 12 ? 12 : h
  return `${display}:00 ${suffix}`
}

const formatPrice = (p) => `$${p.toLocaleString('es-CO')}`
const today = new Date().toISOString().split('T')[0]

function Reservations() {
  const [form, setForm] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const courtName = params.get('court')
    const court = courtName ? courts.find(c => c.name === courtName) : null
    return {
      court: court ? court.id.toString() : '',
      date: '',
      startHour: '',
      endHour: '',
      name: '',
      email: '',
      phone: ''
    }
  })

  const [showCourtModal, setShowCourtModal] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [savedReservation, setSavedReservation] = useState(null)

  const selectedCourt = courts.find(c => c.id === parseInt(form.court))

  const endHours = form.startHour
    ? hours.filter(h => h > parseInt(form.startHour) && h <= 23)
    : []

  const duration = form.startHour && form.endHour
    ? parseInt(form.endHour) - parseInt(form.startHour)
    : 0

  const total = selectedCourt ? selectedCourt.price * duration : 0

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'startHour') {
      setForm(prev => ({ ...prev, startHour: value, endHour: '' }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectCourt = (court) => {
    setForm(prev => ({ ...prev, court: court.id.toString() }))
    setShowCourtModal(false)
  }

  const handleSubmit = () => {
    if (!form.court || !form.date || !form.startHour || !form.endHour ||
        !form.name || !form.email || !form.phone) {
      alert('Por favor completa todos los campos.')
      return
    }

    const reservationId = Date.now()
    const createdAt = new Date().toISOString()

    const reservation = {
      id: reservationId,
      court: selectedCourt.name,
      courtType: selectedCourt.type,
      courtImg: selectedCourt.id,
      date: form.date,
      startHour: formatHour(parseInt(form.startHour)),
      endHour: formatHour(parseInt(form.endHour)),
      duration,
      total,
      name: form.name,
      email: form.email,
      phone: form.phone,
      createdAt
    }

    const existing = JSON.parse(localStorage.getItem('padelzone_reservations') || '[]')
    existing.push(reservation)
    localStorage.setItem('padelzone_reservations', JSON.stringify(existing))

    setSavedReservation(reservation)
    setConfirmed(true)
  }

  const handleClose = () => {
    setConfirmed(false)
    setForm({
      court: '', date: '', startHour: '', endHour: '',
      name: '', email: '', phone: ''
    })
    setSavedReservation(null)
  }

  return (
    <div className="reservations-page">

      <div className="reservations-header">
        <div className="container">
          <h1>Reservar Cancha</h1>
          <p>Completa el formulario y asegura tu horario preferido</p>
        </div>
      </div>

      <div className="container reservations-body">
        <div className="reservations-grid">

          {/* Formulario */}
          <div className="res-form-card">
            <div className="res-section">
              <h5>Información de Reserva</h5>
              <p className="res-subtitle">Selecciona la cancha, fecha y horario para tu reserva</p>

              {/* Botón selector de cancha */}
              <div className="res-field full">
                <label>Cancha</label>
                <button
                  className={`res-court-selector-btn ${selectedCourt ? 'selected' : ''}`}
                  onClick={() => setShowCourtModal(true)}
                >
                  {selectedCourt ? (
                    <>
                      <img src={selectedCourt.img} alt={selectedCourt.name} />
                      <div className="res-court-selector-info">
                        <span className="res-court-selector-name">{selectedCourt.name}</span>
                        <span className="res-court-selector-sub">
                          {selectedCourt.type} · {formatPrice(selectedCourt.price)}/hora
                        </span>
                      </div>
                      <i className="material-icons res-court-selector-change">edit</i>
                    </>
                  ) : (
                    <>
                      <div className="res-court-selector-placeholder">
                        <i className="material-icons">sports_tennis</i>
                      </div>
                      <span className="res-court-selector-text">Ver y elegir cancha</span>
                      <i className="material-icons">chevron_right</i>
                    </>
                  )}
                </button>
              </div>

              {/* Preview grande */}
              {selectedCourt && (
                <div className="res-court-preview-large">
                  <img src={selectedCourt.img} alt={selectedCourt.name} />
                  <div className="res-court-preview-overlay">
                    <div className="res-court-preview-badge">
                      <i className="material-icons">
                        {selectedCourt.type === 'Interior' ? 'home' : 'wb_sunny'}
                      </i>
                      {selectedCourt.type}
                    </div>
                    <div className="res-court-preview-text">
                      <h6>{selectedCourt.name}</h6>
                      <p>{selectedCourt.desc}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Fecha */}
              <div className="res-field full" style={{ marginTop: '20px' }}>
                <label>Fecha</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  min={today}
                  onChange={handleChange}
                />
              </div>

              {/* Rango de horas */}
              <div className="res-row">
                <div className="res-field">
                  <label>Hora de inicio</label>
                  <div className="res-select-wrapper">
                    <select name="startHour" value={form.startHour} onChange={handleChange}>
                      <option value="">Desde</option>
                      {hours.slice(0, -1).map(h => (
                        <option key={h} value={h}>{formatHour(h)}</option>
                      ))}
                    </select>
                    <i className="material-icons">expand_more</i>
                  </div>
                </div>

                <div className="res-field">
                  <label>Hora de fin</label>
                  <div className="res-select-wrapper">
                    <select
                      name="endHour"
                      value={form.endHour}
                      onChange={handleChange}
                      disabled={!form.startHour}
                    >
                      <option value="">Hasta</option>
                      {endHours.map(h => (
                        <option key={h} value={h}>
                          {formatHour(h)} ({h - parseInt(form.startHour)}h)
                        </option>
                      ))}
                    </select>
                    <i className="material-icons">expand_more</i>
                  </div>
                </div>
              </div>

              {duration > 0 && (
                <div className="res-duration-badge">
                  <i className="material-icons">timer</i>
                  {duration} hora{duration > 1 ? 's' : ''} de reserva
                  — Total: {formatPrice(total)}
                </div>
              )}
            </div>

            <hr className="res-divider" />

            <div className="res-section">
              <h5>Información de Contacto</h5>

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

            <button className="res-btn-confirm" onClick={handleSubmit}>
              <i className="material-icons">check</i>
              Confirmar Reserva
            </button>
          </div>

          {/* Resumen */}
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
                <span>Desde</span>
                <span>{form.startHour ? formatHour(parseInt(form.startHour)) : '—'}</span>
              </div>
              <div className="res-summary-row">
                <span>Hasta</span>
                <span>{form.endHour ? formatHour(parseInt(form.endHour)) : '—'}</span>
              </div>
              <div className="res-summary-row">
                <span>Duración</span>
                <span>{duration > 0 ? `${duration}h` : '—'}</span>
              </div>
            </div>

            <div className="res-summary-total">
              <span>Total</span>
              <span className="res-total-price">{formatPrice(total)}</span>
            </div>

            <div className="res-policies">
              <p><strong>Políticas de Reserva</strong></p>
              <ul>
                <li>Cancelación gratuita hasta 24h antes</li>
                <li>Llega 10 minutos antes de tu reserva</li>
                <li>Equipamiento básico incluido</li>
                <li>Mínimo 1 hora de reserva</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Modal selector de canchas */}
      {showCourtModal && (
        <div className="court-modal-overlay" onClick={() => setShowCourtModal(false)}>
          <div className="court-modal" onClick={e => e.stopPropagation()}>

            <div className="court-modal-header">
              <h5>Selecciona tu Cancha</h5>
              <button className="court-modal-close" onClick={() => setShowCourtModal(false)}>
                <i className="material-icons">close</i>
              </button>
            </div>

            <div className="court-modal-grid">
              {courts.map(court => (
                <div
                  key={court.id}
                  className={`court-modal-card ${parseInt(form.court) === court.id ? 'active' : ''}`}
                  onClick={() => handleSelectCourt(court)}
                >
                  <div className="court-modal-img">
                    <img src={court.img} alt={court.name} />
                    <span className="court-modal-badge">
                      <i className="material-icons">
                        {court.type === 'Interior' ? 'home' : 'wb_sunny'}
                      </i>
                      {court.type}
                    </span>
                    {parseInt(form.court) === court.id && (
                      <div className="court-modal-selected-check">
                        <i className="material-icons">check_circle</i>
                      </div>
                    )}
                  </div>
                  <div className="court-modal-info">
                    <div className="court-modal-title-row">
                      <span className="court-modal-name">{court.name}</span>
                      <span className="court-modal-price">{formatPrice(court.price)}/h</span>
                    </div>
                    <p className="court-modal-desc">{court.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Modal confirmación */}
      {confirmed && savedReservation && (
        <div className="res-modal-overlay" onClick={handleClose}>
          <div className="res-modal" onClick={e => e.stopPropagation()}>
            <div className="res-modal-icon">
              <i className="material-icons">check_circle</i>
            </div>
            <h4>¡Reserva Confirmada!</h4>
            <p>Tu reserva ha sido registrada exitosamente.</p>
            <div className="res-modal-details">
              <p><strong>Cancha:</strong> {savedReservation.court}</p>
              <p><strong>Fecha:</strong> {savedReservation.date}</p>
              <p><strong>Horario:</strong> {savedReservation.startHour} – {savedReservation.endHour}</p>
              <p><strong>Duración:</strong> {savedReservation.duration}h</p>
              <p><strong>Total:</strong> {formatPrice(savedReservation.total)}</p>
            </div>
            <button className="res-modal-btn" onClick={handleClose}>Cerrar</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Reservations