import './WhyUs.css'

const reasons = [
  {
    icon: 'event_available',
    title: 'Reserva Fácil',
    desc: 'Garantice su espacio para partidos o eventos especiales con nuestro sistema de reserva inmediata.'
  },
  {
    icon: 'schedule',
    title: 'Horarios Flexibles',
    desc: 'Disponibilidad de 7:00 AM a 11:00 PM todos los días del año.'
  },
  {
    icon: 'star',
    title: 'Ubicación Premium',
    desc: 'Instalaciones de élite con canchas de nivel profesional en la zona más exclusiva.'
  },
  {
    icon: 'groups',
    title: 'Comunidad Activa',
    desc: 'Únete a más de 500 jugadores activos en nuestra comunidad.'
  }
]

function WhyUs() {
  return (
    <section className="whyus-section">        {/* ← fondo aquí, ancho completo */}
      <div className="whyus-header">
        <h2>¿Por qué elegirnos?</h2>
        <p>Ofrecemos las mejores canchas de pádel con instalaciones de primera clase</p>
      </div>

      <div className="container">             {/* ← container solo en el grid */}
        <div className="whyus-grid">
          {reasons.map((item, i) => (
            <div className="whyus-card-wrapper" key={i}>
              <div className="whyus-card">

                <div className="whyus-front">
                  <div className="whyus-icon-circle">
                    <i className="material-icons">{item.icon}</i>
                  </div>
                  <h5>{item.title}</h5>
                </div>

                <div className="whyus-back">
                  <div className="whyus-icon-circle">
                    <i className="material-icons">{item.icon}</i>
                  </div>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs