import React, { useState, useRef } from 'react';
import { Carousel as BSCarousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Carousel.css';

const slides = [
  { 
    img: '/img/canchapadel.jpg', 
    title: 'Canchas Premium', 
    subtitle: 'Superficies profesionales con los mejores estándares' 
  },
  { 
    img: '/img/canchapadel1.jpg', 
    title: 'Instalaciones de Primera', 
    subtitle: 'Espacios modernos equipados con iluminación LED' 
  },
  { 
    img: '/img/padel1.jpg',
    title: 'Nuestra Tienda', 
    subtitle: 'Todo lo que necesitas para jugar al más alto nivel' 
  },
];

function MyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef(null);

  const handleSelect = (selectedIndex) => {
    // Si salimos del video, lo pausamos
    if (selectedIndex !== 0) {
      videoRef.current?.pause();
    } else {
      // Si volvemos al video, lo reproducimos desde el inicio
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="carousel-root-container">
      <BSCarousel
        fade={true}
        activeIndex={activeIndex}
        onSelect={handleSelect}
        interval={activeIndex === 0 ? null : 4000}
        controls={true}
        indicators={true}
        pause={false}
        className="main-bootstrap-carousel"
      >
        {/* Primer slide: VIDEO */}
        <BSCarousel.Item className="custom-item-wrapper">
          <div className="img-container">
            <video
              ref={videoRef}
              className="d-block w-100 carousel-img"
              src="/img/videopadel1.mp4"
              autoPlay
              muted
              playsInline
              onEnded={() => handleSelect(1)}
            />
          </div>
        </BSCarousel.Item>

        {/* Slides de imágenes */}
        {slides.map((slide, index) => (
          <BSCarousel.Item key={index} className="custom-item-wrapper">
            <div className="img-container">
              <img
                className="d-block w-100 carousel-img"
                src={slide.img}
                alt={slide.title}
              />
            </div>
            <div className="carousel-overlay">
              <h2 className="overlay-title">{slide.title}</h2>
              <p className="overlay-subtitle">{slide.subtitle}</p>
            </div>
          </BSCarousel.Item>
        ))}
      </BSCarousel>
    </div>
  );
}

export default MyCarousel;