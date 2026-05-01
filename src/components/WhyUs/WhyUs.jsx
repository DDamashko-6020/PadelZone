import './WhyUs.css'

const reasons = [
  {
    icon: 'event_available',
    title: 'Reserva Fácil',
    desc: 'Sistema de reservas online simple y rápido'
  },
  {
    icon: 'schedule',
    title: 'Horarios Flexibles',
    desc: 'Disponibilidad de 7:00 AM a 11:00 PM'
  },
  {
    icon: 'star',
    title: 'Ubicación Premium',
    desc: 'Instalaciones de primera calidad'
  },
  {
    icon: 'groups',
    title: 'Comunidad Activa',
    desc: 'Únete a nuestra comunidad de jugadores'
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
            <div className="whyus-card" key={i}>
              <div className="whyus-icon-circle">
                <i className="material-icons">{item.icon}</i>
              </div>
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhyUs