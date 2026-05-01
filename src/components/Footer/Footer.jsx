import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* Columna 1 — Marca */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/IconPadel.png" alt="PadelZone" />
              <span>PadelZone</span>
            </div>
            <p>Las mejores canchas de pádel para tu diversión y competición</p>
            <div className="footer-socials">
              <a href="#"><i className="material-icons">public</i></a>
              <a href="#"><i className="material-icons">photo_camera</i></a>
              <a href="#"><i className="material-icons">play_circle</i></a>
            </div>
          </div>

          {/* Columna 2 — Enlaces */}
          <div className="footer-col">
            <h6>Enlaces</h6>
            <ul>
              <li><a href="#inicio"><i className="material-icons">chevron_right</i>Inicio</a></li>
              <li><a href="#canchas"><i className="material-icons">chevron_right</i>Canchas</a></li>
              <li><a href="#reservar"><i className="material-icons">chevron_right</i>Reservar</a></li>
              <li><a href="#contacto"><i className="material-icons">chevron_right</i>Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3 — Contacto */}
          <div className="footer-col">
            <h6>Contacto</h6>
            <ul>
              <li>
                <i className="material-icons">location_on</i>
                Calle Pádel 123, Colombia / Huila / Neiva
              </li>
              <li>
                <i className="material-icons">phone</i>
                +57 300 000 0000
              </li>
              <li>
                <i className="material-icons">email</i>
                info@padelzone.com
              </li>
              <li>
                <i className="material-icons">schedule</i>
                Lun – Dom: 7:00 AM – 11:00 PM
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Barra inferior */}
      <div className="footer-bottom">
        <p>© 2026 PadelZone. Todos los derechos reservados.</p>
      </div>

    </footer>
  )
}

export default Footer