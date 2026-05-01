import { useEffect } from 'react'
import './Carousel.css'

import img1 from '../../img/CanchaPadel.jpg'
import img2 from '../../img/CanchaPadel2.jpg'
import img3 from '../../img/EquipoPadel.jpg'

const slides = [
  {
    img: img1,
    title: 'Canchas Premium',
    subtitle: 'Superficies profesionales diseñadas para elevar tu juego al siguiente nivel'
  },
  {
    img: img2,
    title: 'Instalaciones de Primera',
    subtitle: 'Espacios modernos con iluminación LED y todas las comodidades para ti'
  },
  {
    img: img3,
    title: 'Únete a la Comunidad',
    subtitle: 'Más de 500 jugadores activos te esperan. Reserva tu cancha hoy mismo'
  }
]

function Carousel() {
  useEffect(() => {
    const el = document.querySelector('.carousel.carousel-slider')
    if (el && window.M) {
      window.M.Carousel.init(el, {
        fullWidth: true,
        indicators: true,
      })
    }
  }, [])

  const move = (n) => {
    const el = document.querySelector('.carousel.carousel-slider')
    if (el && window.M) {
      const instance = window.M.Carousel.getInstance(el)
      instance.next(n)
    }
  }

  return (
    <div className="carousel-wrapper">

      {/* Flecha izquierda */}
      <button className="carousel-arrow left" onClick={() => move(-1)}>
        <i className="material-icons">chevron_left</i>
      </button>

      <div className="carousel carousel-slider">
        {slides.map((slide, i) => (
          <div className="carousel-item" key={i}>
            <img src={slide.img} alt={slide.title} />
            <div className="carousel-overlay">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Flecha derecha */}
      <button className="carousel-arrow right" onClick={() => move(1)}>
        <i className="material-icons">chevron_right</i>
      </button>

    </div>
  )
}

export default Carousel