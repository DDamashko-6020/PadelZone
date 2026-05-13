import { useState, useRef, useEffect, useCallback } from 'react'
import './Contact.css'

const responses = {
  'horarios': 'Nuestros horarios son de Lunes a Domingo de 7:00 AM a 11:00 PM. ¡Te esperamos!',
  'precios': 'Nuestras tarifas son:\n• Central: $120.000/hora\n• Premium: $160.000/hora\n• Recreativa: $100.000/hora\n• Profesional: $180.000/hora\n• Express: $90.000/hora',
  'reservas': 'Las reservas se hacen online en la sección "Reservar" de nuestra página web. También puedes llamarnos al +57 300 000 0000.',
  'contacto': 'Puedes contactarnos en:\n• Dirección: Calle Pádel 123, Neiva, Huila\n• Teléfono: +57 300 000 0000\n• Email: info@padelzone.com',
  'servicios': 'Ofrecemos:\n• Reservas online\n• Clases de pádel\n• Torneos\n• Tienda deportiva\n• Gimnasio\n• Programa VIP\n• Grabación de partidos',
  'ubicacion': 'Estamos ubicados en Calle Pádel 123, Neiva, Huila, Colombia.',
  'politicas': 'Nuestras políticas:\n• Cancelación gratuita hasta 24h antes\n• Llegar 10 min antes de la reserva\n• Equipamiento básico incluido\n• Máximo 4 jugadores por cancha',
  'default': '¡Hola! Soy el asistente de PadelZone. ¿En qué puedo ayudarte?'
}

const quickOptions = [
  { key: 'horarios', label: 'Horarios', icon: 'schedule' },
  { key: 'precios', label: 'Precios', icon: 'attach_money' },
  { key: 'reservas', label: 'Reservas', icon: 'event_available' },
  { key: 'contacto', label: 'Contacto', icon: 'contact_phone' },
  { key: 'servicios', label: 'Servicios', icon: 'sports_tennis' },
  { key: 'ubicacion', label: 'Ubicación', icon: 'location_on' },
  { key: 'politicas', label: 'Políticas', icon: 'info' }
]

const initialMessages = [
  {
    role: 'assistant',
    text: '¡Hola! Soy el asistente de PadelZone 🎾 ¿En qué puedo ayudarte?',
    showOptions: true
  }
]

function Contact() {
  const [messages, setMessages] = useState(initialMessages)
  const [loading, setLoading] = useState(false)

  const messagesContainerRef = useRef(null)

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages, loading])

  const sendMessage = useCallback((optionKey) => {
    if (loading) return

    const option = quickOptions.find(opt => opt.key === optionKey)
    if (!option) return

    const userMsg = {
      role: 'user',
      text: option.label,
      option: optionKey
    }

    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    const getRandomDelay = () => 800 + Math.random() * 700
    setTimeout(() => {
      const reply = responses[optionKey] || responses.default

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: reply,
          showOptions: true
        }
      ])

      setLoading(false)
    }, getRandomDelay())
  }, [loading])

  return (
    <div className="contact-page">

      {/* HEADER */}
      <div className="contact-header">
        <div className="container">
          <h1>Contacto</h1>
          <p>
            Estamos aquí para ayudarte.
            Escríbenos o visítanos
          </p>
        </div>
      </div>

      <div className="container contact-body">

        <div className="contact-grid">

          {/* INFO */}
          <div className="contact-info">

            <div className="contact-info-card">

              <h5>Información de Contacto</h5>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="material-icons">location_on</i>
                </div>
                <div>
                  <p className="contact-info-label">Dirección</p>
                  <p className="contact-info-value">Calle Pádel 123, Neiva, Huila, Colombia</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="material-icons">phone</i>
                </div>
                <div>
                  <p className="contact-info-label">Teléfono</p>
                  <p className="contact-info-value">+57 300 000 0000</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="material-icons">email</i>
                </div>
                <div>
                  <p className="contact-info-label">Email</p>
                  <p className="contact-info-value">info@padelzone.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="material-icons">schedule</i>
                </div>
                <div>
                  <p className="contact-info-label">Horarios</p>
                  <p className="contact-info-value">Lunes – Domingo: 7:00 AM – 11:00 PM</p>
                </div>
              </div>

            </div>

            <div className="contact-map-card">
              <iframe
                title="Ubicación PadelZone"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63735.40500877451!2d-75.33!3d2.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b6f5b5b5b5b5b%3A0x0!2sNeiva%2C+Huila!5e0!3m2!1ses!2sco!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>

          </div>

          {/* CHATBOX */}
          <div className="chatbox-card">

            <div className="chatbox-header">
              <div className="chatbox-avatar">
                <i className="material-icons">smart_toy</i>
              </div>
              <div>
                <p className="chatbox-title">Asistente PadelZone</p>
                <p className="chatbox-status">
                  <span className="chatbox-dot" />
                  En línea
                </p>
              </div>
            </div>

            <div className="chatbox-messages" ref={messagesContainerRef}>

              {messages.map((msg, i) => (

                msg.role === 'assistant' ? (

                  <div key={i} className="bot-msg">
                    <div className="bubble-row">
                      <div className="chat-bot-icon">
                        <i className="material-icons">smart_toy</i>
                      </div>
                      <div className="chat-bubble assistant">
                        {msg.text.split('\n').map((line, index, arr) => (
                          <span key={index}>
                            {line}
                            {index < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                    </div>

                    {msg.showOptions && (
                      <div className="chat-options">
                        {quickOptions.map((option) => (
                          <button
                            key={option.key}
                            className="chat-option-btn"
                            onClick={() => sendMessage(option.key)}
                            disabled={loading}
                          >
                            <i className="material-icons option-icon">{option.icon}</i>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                ) : (

                  <div key={i} className="chat-bubble-wrapper user">
                    <div className="chat-bubble user">
                      {msg.text.split('\n').map((line, index, arr) => (
                        <span key={index}>
                          {line}
                          {index < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>

                )

              ))}

              {loading && (
                <div className="bot-msg">
                  <div className="bubble-row">
                    <div className="chat-bot-icon">
                      <i className="material-icons">smart_toy</i>
                    </div>
                    <div className="chat-bubble assistant typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Contact