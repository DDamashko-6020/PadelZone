import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Courts.css'

import c1 from '../../img/Cancha1.jpg'
import c2 from '../../img/Cancha2.jpg'
import c3 from '../../img/Cancha3.jpg'
import c4 from '../../img/Cancha4.jpg'
import c5 from '../../img/Cancha5.jpg'

const courts = [
  {
    id: 1,
    img: c1,
    name: 'Cancha Central',
    price: 120000,
    type: 'Exterior',
    typeIcon: 'wb_sunny',
    desc: 'Cancha principal con césped sintético de última generación',
    features: ['Iluminación LED', 'Césped sintético premium', 'Vestuarios incluidos']
  },
  {
    id: 2,
    img: c2,
    name: 'Cancha Premium',
    price: 160000,
    type: 'Interior',
    typeIcon: 'home',
    desc: 'Cancha techada con climatización y iluminación LED',
    features: ['Climatización', 'Cristal panorámico', 'Suelo profesional']
  },
  {
    id: 3,
    img: c3,
    name: 'Cancha Recreativa',
    price: 100000,
    type: 'Exterior',
    typeIcon: 'wb_sunny',
    desc: 'Perfecta para principiantes y partidos casuales',
    features: ['Ideal principiantes', 'Ambiente relajado', 'Precio accesible']
  },
  {
    id: 4,
    img: c4,
    name: 'Cancha Profesional',
    price: 180000,
    type: 'Interior',
    typeIcon: 'home',
    desc: 'Diseñada para torneos y jugadores de alto rendimiento',
    features: ['Normas oficiales', 'Gradas para público', 'Iluminación HD']
  },
  {
    id: 5,
    img: c5,
    name: 'Cancha Express',
    price: 90000,
    type: 'Exterior',
    typeIcon: 'wb_sunny',
    desc: 'Ideal para partidos rápidos en horarios de menor demanda',
    features: ['Acceso rápido', 'Sin reserva mínima', 'Estacionamiento cercano']
  }
]

const filters = ['Todas', 'Interior', 'Exterior']

function CourtsPage() {
  const [activeFilter, setActiveFilter] = useState('Todas')
  const [sortBy, setSortBy] = useState('default')
  const navigate = useNavigate()

  const filtered = courts
    .filter(c => activeFilter === 'Todas' || c.type === activeFilter)
    .sort((a, b) => {
      if (sortBy === 'asc')  return a.price - b.price
      if (sortBy === 'desc') return b.price - a.price
      return a.id - b.id
    })

  const formatPrice = (p) => `$${p.toLocaleString('es-CO')}`

  return (
    <div className="courts-page">

      {/* Header */}
      <div className="courts-page-header">
        <div className="container">
          <h1>Nuestras Canchas</h1>
          <p>Encuentra la cancha perfecta para tu nivel y estilo de juego</p>
        </div>
      </div>

      <div className="container courts-page-body">

        {/* Barra de filtros */}
        <div className="courts-filter-bar">
          <div className="courts-filter-types">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="courts-sort">
            <label>Ordenar por precio:</label>
            <div className="res-select-wrapper">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="default">Por defecto</option>
                <option value="asc">Menor a mayor</option>
                <option value="desc">Mayor a menor</option>
              </select>
              <i className="material-icons">expand_more</i>
            </div>
          </div>
        </div>

        {/* Contador */}
        <p className="courts-count">
          {filtered.length} {filtered.length === 1 ? 'cancha encontrada' : 'canchas encontradas'}
        </p>

        {/* Grid */}
        <div className="courts-page-grid">
          {filtered.map(court => (
            <div className="court-page-card" key={court.id}>

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
                  <span className="court-price">{formatPrice(court.price)}/hora</span>
                </div>
                <p className="court-desc">{court.desc}</p>
                <p className="court-capacity">
                  <i className="material-icons">group</i>
                  Capacidad: 4 jugadores
                </p>
                <p className="court-features-title">Características:</p>
                <ul className="court-features">
                  {court.features.map((f, i) => (
                    <li key={i}>
                      <i className="material-icons">check</i>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="btn court-btn waves-effect waves-light"
                  onClick={() => navigate('/reservar')}
                >
                  Reservar Ahora
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default CourtsPage