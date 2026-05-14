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
    desc: 'Disponibilidad  \n 7:00AM a 11:00PM \n todos los días del año.'
  },
  {
    icon: 'star',
    title: 'Ubicación Premium',
    desc: 'Instalaciones de élite con canchas de nivel profesional en la zona más exclusiva.'
  },
  {
    icon: 'groups',
    title: 'Comunidad Activa',
    desc: 'Únete a más de 500 jugadores activos.\n'
  }
]

function WhyUs() {
  return (
    <section className="whyus-section">
      <div className="container">
        <div className="whyus-header">
          <h2>¿Por qué elegirnos?</h2>
          <p>Ofrecemos las mejores canchas de pádel con instalaciones de primera clase</p>
        </div>

        <div className="whyus-grid">
          {reasons.map((item, i) => (
            <div className="whyus-card-wrapper" key={i}>

              <div className="whyus-card">

                {/* Frente */}
                <div className="whyus-front">
                  <div className="whyus-icon-circle">
                    <i className="material-icons">{item.icon}</i>
                  </div>
                  <h5>{item.title}</h5>
                </div>

                {/* Reverso */}
                <div className="whyus-back">
                  <div className="whyus-icon-circle">
                    <i className="material-icons">{item.icon}</i>
                  </div>
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