import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Profile.css'

import c1 from '../../img/Cancha1.jpg'
import c2 from '../../img/Cancha2.jpg'
import c3 from '../../img/Cancha3.jpg'
import c4 from '../../img/Cancha4.jpg'
import c5 from '../../img/Cancha5.jpg'

const courtImages = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5 }

const formatPrice = (p) => `$${p.toLocaleString('es-CO')}`

function Profile() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const [reservations, setReservations] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', email: '' })
  const [activeTab, setActiveTab] = useState('reservations')
  const [cancelTarget, setCancelTarget] = useState(null)

    useEffect(() => {
    if (!isAuthenticated) {
        navigate('/login')
        return
    }
    setEditForm({ name: user?.name || '', email: user?.email || '' })
    loadReservations()
    }, [isAuthenticated, navigate, user?.name, user?.email])

  const loadReservations = () => {
    const stored = JSON.parse(localStorage.getItem('padelzone_reservations') || '[]')
    // Mostrar solo las del usuario actual por email
    const userRes = stored.filter(r => r.email === user?.email)
    setReservations(userRes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }

  const handleCancelReservation = (id) => {
    const all = JSON.parse(localStorage.getItem('padelzone_reservations') || '[]')
    const updated = all.filter(r => r.id !== id)
    localStorage.setItem('padelzone_reservations', JSON.stringify(updated))
    setReservations(prev => prev.filter(r => r.id !== id))
    setCancelTarget(null)
  }

  const handleEditSave = () => {
    const updatedUser = { ...user, name: editForm.name, email: editForm.email }
    localStorage.setItem('padelzone_user', JSON.stringify(updatedUser))
    setEditMode(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const isUpcoming = (date) => new Date(date) >= new Date(new Date().toDateString())

  const upcoming = reservations.filter(r => isUpcoming(r.date))
  const past = reservations.filter(r => !isUpcoming(r.date))

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <div className="container">
          <div className="profile-header-content">
            <div className="profile-avatar">
              {getInitials(user?.name)}
            </div>
            <div className="profile-header-info">
              <h1>{user?.name || 'Usuario'}</h1>
              <p>{user?.email}</p>
              <span className="profile-badge">
                <i className="material-icons">verified</i>
                Miembro PadelZone
              </span>
            </div>
            <button className="profile-logout-btn" onClick={handleLogout}>
              <i className="material-icons">logout</i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="container profile-body">

        {/* Stats */}
        <div className="profile-stats">
          <div className="profile-stat-card">
            <i className="material-icons">event_available</i>
            <div>
              <span className="stat-number">{reservations.length}</span>
              <span className="stat-label">Reservas totales</span>
            </div>
          </div>
          <div className="profile-stat-card">
            <i className="material-icons">upcoming</i>
            <div>
              <span className="stat-number">{upcoming.length}</span>
              <span className="stat-label">Próximas</span>
            </div>
          </div>
          <div className="profile-stat-card">
            <i className="material-icons">payments</i>
            <div>
              <span className="stat-number">
                {formatPrice(reservations.reduce((acc, r) => acc + r.total, 0))}
              </span>
              <span className="stat-label">Total gastado</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            <i className="material-icons">event</i>
            Mis Reservaciones
            {upcoming.length > 0 && (
              <span className="tab-badge">{upcoming.length}</span>
            )}
          </button>
          <button
            className={`profile-tab ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            <i className="material-icons">person</i>
            Mis Datos
          </button>
        </div>

        {/* Tab: Reservaciones */}
        {activeTab === 'reservations' && (
          <div className="profile-reservations">

            {reservations.length === 0 ? (
              <div className="profile-empty">
                <i className="material-icons">event_busy</i>
                <h5>No tienes reservaciones aún</h5>
                <p>Reserva una cancha y aparecerá aquí</p>
                <button className="profile-empty-btn" onClick={() => navigate('/reservar')}>
                  Reservar Ahora
                </button>
              </div>
            ) : (
              <>
                {/* Próximas */}
                {upcoming.length > 0 && (
                  <>
                    <h6 className="res-group-title">
                      <i className="material-icons">upcoming</i>
                      Próximas Reservaciones
                    </h6>
                    <div className="res-cards-grid">
                      {upcoming.map(res => (
                        <ReservationCard
                          key={res.id}
                          res={res}
                          upcoming={true}
                          courtImages={courtImages}
                          onCancel={() => setCancelTarget(res.id)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Pasadas */}
                {past.length > 0 && (
                  <>
                    <h6 className="res-group-title past">
                      <i className="material-icons">history</i>
                      Historial
                    </h6>
                    <div className="res-cards-grid">
                      {past.map(res => (
                        <ReservationCard
                          key={res.id}
                          res={res}
                          upcoming={false}
                          courtImages={courtImages}
                          onCancel={null}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* Tab: Datos */}
        {activeTab === 'data' && (
          <div className="profile-data-card">
            <div className="profile-data-header">
              <h5>Información Personal</h5>
              {!editMode && (
                <button className="profile-edit-btn" onClick={() => setEditMode(true)}>
                  <i className="material-icons">edit</i>
                  Editar
                </button>
              )}
            </div>

            {editMode ? (
              <div className="profile-edit-form">
                <div className="profile-edit-field">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="profile-edit-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="profile-edit-actions">
                  <button className="profile-save-btn" onClick={handleEditSave}>
                    <i className="material-icons">check</i>
                    Guardar
                  </button>
                  <button className="profile-cancel-edit-btn" onClick={() => setEditMode(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-data-rows">
                <div className="profile-data-row">
                  <div className="profile-data-icon">
                    <i className="material-icons">person</i>
                  </div>
                  <div>
                    <p className="profile-data-label">Nombre</p>
                    <p className="profile-data-value">{user?.name || '—'}</p>
                  </div>
                </div>
                <div className="profile-data-row">
                  <div className="profile-data-icon">
                    <i className="material-icons">email</i>
                  </div>
                  <div>
                    <p className="profile-data-label">Email</p>
                    <p className="profile-data-value">{user?.email || '—'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal cancelar */}
      {cancelTarget && (
        <div className="profile-modal-overlay" onClick={() => setCancelTarget(null)}>
          <div className="profile-modal" onClick={e => e.stopPropagation()}>
            <div className="profile-modal-icon">
              <i className="material-icons">warning</i>
            </div>
            <h5>¿Cancelar reservación?</h5>
            <p>Esta acción no se puede deshacer.</p>
            <div className="profile-modal-actions">
              <button
                className="profile-modal-confirm"
                onClick={() => handleCancelReservation(cancelTarget)}
              >
                Sí, cancelar
              </button>
              <button
                className="profile-modal-dismiss"
                onClick={() => setCancelTarget(null)}
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

function ReservationCard({ res, upcoming, courtImages, onCancel }) {
  return (
    <div className={`res-card ${upcoming ? 'upcoming' : 'past'}`}>
      <div className="res-card-img">
        <img src={courtImages[res.courtImg] || courtImages[1]} alt={res.court} />
        <span className={`res-card-status ${upcoming ? 'upcoming' : 'past'}`}>
          {upcoming ? 'Próxima' : 'Completada'}
        </span>
      </div>
      <div className="res-card-body">
        <div className="res-card-title-row">
          <h6>{res.court}</h6>
          <span className="res-card-price">{formatPrice(res.total)}</span>
        </div>
        <div className="res-card-details">
          <p>
            <i className="material-icons">calendar_today</i>
            {res.date}
          </p>
          <p>
            <i className="material-icons">schedule</i>
            {res.startHour} – {res.endHour}
          </p>
          <p>
            <i className="material-icons">timer</i>
            {res.duration}h · {res.courtType}
          </p>
        </div>
        {upcoming && onCancel && (
          <button className="res-card-cancel-btn" onClick={onCancel}>
            <i className="material-icons">cancel</i>
            Cancelar Reserva
          </button>
        )}
      </div>
    </div>
  )
}

export default Profile