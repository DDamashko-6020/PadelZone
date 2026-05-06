import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Courts.css'

import c1 from '../../img/Cancha1.jpg'
import c2 from '../../img/Cancha2.jpg'
import c3 from '../../img/Cancha3.jpg'
import c4 from '../../img/Cancha4.jpg'
import c5 from '../../img/Cancha5.jpg'

const courts = [
  {
    img: c1,
    name: 'Cancha Central',
    price: '$120.000/hora',
    desc: 'Cancha principal con césped sintético de última generación',
    type: 'Exterior',
    typeIcon: 'wb_sunny',
    features: ['Iluminación LED', 'Césped sintético premium', 'Vestuarios incluidos']
  },
  {
    img: c2,
    name: 'Cancha Premium',
    price: '$160.000/hora',
    desc: 'Cancha techada con climatización y iluminación LED',
    type: 'Interior',
    typeIcon: 'home',
    features: ['Climatización', 'Cristal panorámico', 'Suelo profesional']
  },
  {
    img: c3,
    name: 'Cancha Recreativa',
    price: '$100.000/hora',
    desc: 'Perfecta para principiantes y partidos casuales',
    type: 'Exterior',
    typeIcon: 'wb_sunny',
    features: ['Ideal principiantes', 'Ambiente relajado', 'Precio accesible']
  },
  {
    img: c4,
    name: 'Cancha Profesional',
    price: '$180.000/hora',
    desc: 'Diseñada para torneos y jugadores de alto rendimiento',
    type: 'Interior',
    typeIcon: 'home',
    features: ['Normas oficiales', 'Gradas para público', 'Iluminación HD']
  },
  {
    img: c5,
    name: 'Cancha Express',
    price: '$90.000/hora',
    desc: 'Ideal para partidos rápidos en horarios de menor demanda',
    type: 'Exterior',
    typeIcon: 'wb_sunny',
    features: ['Acceso rápido', 'Sin reserva mínima', 'Estacionamiento cercano']
  }
]

const VISIBLE = 3
const CARD_GAP = 32
const cloned = [...courts.slice(-VISIBLE), ...courts, ...courts.slice(0, VISIBLE)]

function Courts() {
  const viewportRef = useRef(null)
  const [current, setCurrent] = useState(VISIBLE)
  const [animated, setAnimated] = useState(true)
  const [cardWidth, setCardWidth] = useState(300)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [selectedCourt, setSelectedCourt] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Calcular ancho al montar y al redimensionar
  useEffect(() => {
    const calcWidth = () => {
      if (viewportRef.current) {
        const total = viewportRef.current.offsetWidth
        setCardWidth((total - CARD_GAP * (VISIBLE - 1)) / VISIBLE)
      }
    }
    calcWidth()
    window.addEventListener('resize', calcWidth)
    return () => window.removeEventListener('resize', calcWidth)
  }, [])

  // Restaurar animación tras salto
  useEffect(() => {
    if (!animated) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      )
    }
  }, [animated])

  const offset = -(current * (cardWidth + CARD_GAP))

  const move = useCallback((direction) => {
    setAnimated(true)
    setCurrent(prev => prev + direction)
  }, [])

  const handleTransitionEnd = useCallback(() => {
    if (current >= courts.length + VISIBLE) {
      setAnimated(false)
      setCurrent(VISIBLE)
    }
    if (current < VISIBLE) {
      setAnimated(false)
      setCurrent(courts.length + VISIBLE - 1)
    }
  }, [current])

  const realIndex = (current - VISIBLE + courts.length) % courts.length

  const openModal = (court) => {
    setSelectedCourt(court)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setTimeout(() => setSelectedCourt(null), 300)
  }

  const handleReserve = (courtName) => {
    closeModal()
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/reservar', search: `?court=${encodeURIComponent(courtName)}` } } })
    } else {
      navigate(`/reservar?court=${encodeURIComponent(courtName)}`)
    }
  }

  return (
    <section className="courts-section">
      <div className="container">
        <div className="courts-header">
          <h2>Nuestras Canchas</h2>
          <p>Descubre nuestras instalaciones de primera categoría, diseñadas para ofrecerte la mejor experiencia de juego</p>
        </div>
      </div>

      <div className="courts-carousel-wrapper">

        <button className="courts-arrow left" onClick={() => move(-1)}>
          <i className="material-icons">chevron_left</i>
        </button>

        <div className="courts-carousel-viewport" ref={viewportRef}>
          <div
            className="courts-track"
            style={{
              transform: `translateX(${offset}px)`,
              transition: animated ? 'transform 0.5s ease' : 'none'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {cloned.map((court, i) => (
              <div
                className="court-card"
                key={i}
                style={{ minWidth: `${cardWidth}px` }}
                onClick={() => openModal(court)}
              >
                <div className="court-img-wrapper">
                  <img src={court.img} alt={court.name} />
                  <span className="court-badge">
                    <i className="material-icons">{court.typeIcon}</i>
                    {court.type}
                  </span>
                </div>

                <div className="court-info">
                  <div className="court-title-row">
                    <h5>{court.name}</h5>
                    <span className="court-price">{court.price}</span>
                  </div>
                  <p className="court-desc">{court.desc}</p>
                  <p className="court-capacity">
                    <i className="material-icons">group</i>
                    Capacidad: 4 jugadores
                  </p>
                  <p className="court-features-title">Características:</p>
                  <ul className="court-features">
                    {court.features.map((f, j) => (
                      <li key={j}>
                        <i className="material-icons">check</i>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn court-btn waves-effect waves-light"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReserve(court.name)
                    }}
                  >
                    Reservar Ahora
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        <button className="courts-arrow right" onClick={() => move(1)}>
          <i className="material-icons">chevron_right</i>
        </button>

      </div>

      <div className="courts-dots">
        {courts.map((_, i) => (
          <span
            key={i}
            className={`courts-dot ${i === realIndex ? 'active' : ''}`}
            onClick={() => { setAnimated(true); setCurrent(i + VISIBLE) }}
          />
        ))}
      </div>

      <div className="button-container"> 
        <button className="btn-outline-courts" onClick={() => window.location.href = '/canchas'}>
          Ver Todas las Canchas <i className="material-icons right">arrow_forward</i>
        </button>
      </div>

      {/* Modal de detalles de cancha */}
      {modalOpen && selectedCourt && (
        <div className="court-modal-overlay" onClick={closeModal}>
          <div className="court-modal" onClick={e => e.stopPropagation()}>
            <button className="court-modal-close" onClick={closeModal}>
              <i className="material-icons">close</i>
            </button>

            <div className="court-modal-content">
              <div className="court-modal-img-wrapper">
                <img src={selectedCourt.img} alt={selectedCourt.name} />
                <span className="court-modal-badge">
                  <i className="material-icons">{selectedCourt.typeIcon}</i>
                  {selectedCourt.type}
                </span>
              </div>

              <div className="court-modal-info">
                <div className="court-modal-title-row">
                  <h3>{selectedCourt.name}</h3>
                  <span className="court-modal-price">{selectedCourt.price}</span>
                </div>

                <p className="court-modal-desc">{selectedCourt.desc}</p>

                <div className="court-modal-capacity">
                  <i className="material-icons">group</i>
                  Capacidad: 4 jugadores
                </div>

                <div className="court-modal-features">
                  <h6>Características:</h6>
                  <ul>
                    {selectedCourt.features.map((f, j) => (
                      <li key={j}>
                        <i className="material-icons">check_circle</i>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="court-modal-btn waves-effect waves-light"
                  onClick={() => handleReserve(selectedCourt.name)}
                >
                  <i className="material-icons">event</i>
                  Reservar Esta Cancha
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

export default Courts