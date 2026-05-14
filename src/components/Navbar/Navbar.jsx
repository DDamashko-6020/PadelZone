import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Navbar.css'

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <nav className="navbar-main">
      <div className="nav-wrapper container">

        <Link to="/" className="brand-logo">
          <img src="/IconPadel.png" alt="PadelZone Logo" className="nav-logo" />
          PadelZone
        </Link>

        <ul className="right hide-on-med-and-down">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/canchas">Canchas</Link></li>
          <li><Link to="/reservar">Reservar</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li>
            {isAuthenticated ? (
              <div className="nav-user">
                <span className="nav-user-name" onClick={() => navigate('/perfil')} style={{cursor:'pointer'}}>
                  <i className="material-icons left">person</i>
                  {user?.name || 'Usuario'}
                </span>
                <button className="btn-logout waves-effect" onClick={handleLogout}>
                  <i className="material-icons left">logout</i>
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-login">
                <i className="material-icons left">account_circle</i>
                Iniciar Sesión
              </Link>
            )}
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar