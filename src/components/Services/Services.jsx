import './Services.css'

const services = [
  {
    icon: 'calendar_month',
    title: 'Reserva de Canchas',
    desc: 'Sistema de reservas online 24/7 para tu comodidad',
    features: ['Reserva instantánea', 'Disponibilidad en tiempo real', 'Confirmación automática']
  },
  {
    icon: 'school',
    title: 'Clases de Pádel',
    desc: 'Instructores certificados para todos los niveles',
    features: ['Clases grupales', 'Clases particulares', 'Programas para niños']
  },
  {
    icon: 'emoji_events',
    title: 'Torneos y Competiciones',
    desc: 'Participa en torneos mensuales y eventos especiales',
    features: ['Torneos amateur', 'Competiciones profesionales', 'Premios y reconocimientos']
  },
  {
    icon: 'group',
    title: 'Comunidad de Jugadores',
    desc: 'Conecta con otros jugadores y forma tu equipo',
    features: ['Grupos de práctica', 'Red social de jugadores', 'Eventos comunitarios']
  },
  {
    icon: 'shopping_bag',
    title: 'Tienda Deportiva',
    desc: 'Equipamiento y accesorios de las mejores marcas',
    features: ['Palas profesionales', 'Ropa deportiva', 'Accesorios']
  },
  {
    icon: 'fitness_center',
    title: 'Gimnasio y Fitness',
    desc: 'Instalaciones completas para tu entrenamiento físico',
    features: ['Área de pesas', 'Cardio', 'Entrenamiento funcional']
  },
  {
    icon: 'star',
    title: 'Programa VIP',
    desc: 'Membresías exclusivas con beneficios premium',
    features: ['Acceso prioritario', 'Descuentos especiales', 'Eventos exclusivos']
  },
  {
    icon: 'videocam',
    title: 'Grabación de Partidos',
    desc: 'Graba tus partidos para análisis y recuerdos',
    features: ['Cámaras HD', 'Descarga de videos', 'Análisis profesional']
  }
]

function Services() {
  return (
    <section className="services-section">
      <div className="container">

        <div className="services-header">
          <h2>Nuestros Servicios</h2>
          <p>Todo lo que necesitas para disfrutar del pádel al máximo nivel</p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div className="service-card" key={i}>
              <div className="service-icon-box">
                <i className="material-icons">{service.icon}</i>
              </div>
              <h5>{service.title}</h5>
              <p className="service-desc">{service.desc}</p>
              <ul className="service-features">
                {service.features.map((f, j) => (
                  <li key={j}>
                    <i className="material-icons">check</i>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services