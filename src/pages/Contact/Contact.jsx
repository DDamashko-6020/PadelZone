import { useState, useRef, useEffect } from 'react'
import './Contact.css'

const SYSTEM_PROMPT = `Eres el asistente virtual de PadelZone, un club de pádel ubicado en Neiva, Huila, Colombia.
Respondes de forma amable, concisa y profesional. Solo respondes preguntas relacionadas con PadelZone.

Información que conoces:
- Canchas: Central ($120.000/hora), Premium ($160.000/hora), Recreativa ($100.000/hora), Profesional ($180.000/hora), Express ($90.000/hora)
- Horarios: Lunes a Domingo de 7:00 AM a 11:00 PM
- Servicios: Reservas online, Clases de pádel, Torneos, Tienda deportiva, Gimnasio, Programa VIP, Grabación de partidos
- Contacto: Calle Pádel 123, Neiva, Huila | +57 300 000 0000 | info@padelzone.com
- Reservas: Se hacen online en la sección "Reservar" de la página
- Políticas: Cancelación gratuita hasta 24h antes, llegar 10 min antes, equipamiento básico incluido
- Capacidad: 4 jugadores por cancha

Si te preguntan algo fuera de PadelZone, responde amablemente que solo puedes ayudar con temas del club.`

const initialMessages = [
  {
    role: 'assistant',
    text: '¡Hola! Soy el asistente de PadelZone. ¿En qué puedo ayudarte? Puedo informarte sobre horarios, precios, reservas, servicios y contacto.'
  }
]

function Contact() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages, loading])

  const sendMessage = async () => {
    const text = input.trim()

    if (!text || loading) return

    const userMsg = {
      role: 'user',
      text
    }

    const updatedMessages = [...messages, userMsg]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {

      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: input.trim()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.error || 'Error en el servidor'
        )
      }

      const reply = data?.reply || 'Lo siento, no pude procesar tu mensaje.'

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: reply
        }
      ])

    } catch (err) {

      console.error('ERROR COMPLETO:')
      console.error(err)

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: 'Ocurrió un error al conectar con el asistente.'
        }
      ])

    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (
      e.key === 'Enter' &&
      !e.shiftKey
    ) {
      e.preventDefault()
      sendMessage()
    }
  }

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
                  <i className="material-icons">
                    location_on
                  </i>
                </div>

                <div>
                  <p className="contact-info-label">
                    Dirección
                  </p>

                  <p className="contact-info-value">
                    Calle Pádel 123, Neiva,
                    Huila, Colombia
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="material-icons">
                    phone
                  </i>
                </div>

                <div>
                  <p className="contact-info-label">
                    Teléfono
                  </p>

                  <p className="contact-info-value">
                    +57 300 000 0000
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="material-icons">
                    email
                  </i>
                </div>

                <div>
                  <p className="contact-info-label">
                    Email
                  </p>

                  <p className="contact-info-value">
                    info@padelzone.com
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="material-icons">
                    schedule
                  </i>
                </div>

                <div>
                  <p className="contact-info-label">
                    Horarios
                  </p>

                  <p className="contact-info-value">
                    Lunes – Domingo:
                    7:00 AM – 11:00 PM
                  </p>
                </div>
              </div>

            </div>

            <div className="contact-map-card">

              <iframe
                title="Ubicación PadelZone"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63735.40500877451!2d-75.33!3d2.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b6f5b5b5b5b5b%3A0x0!2sNeiva%2C+Huila!5e0!3m2!1ses!2sco!4v1234567890"
                width="100%"
                height="220"
                style={{
                  border: 0,
                  borderRadius: '12px'
                }}
                allowFullScreen=""
                loading="lazy"
              />

            </div>

          </div>

          {/* CHATBOX */}
          <div className="chatbox-card">

            <div className="chatbox-header">

              <div className="chatbox-avatar">
                <i className="material-icons">
                  smart_toy
                </i>
              </div>

              <div>
                <p className="chatbox-title">
                  Asistente PadelZone
                </p>

                <p className="chatbox-status">
                  <span className="chatbox-dot" />
                  En línea
                </p>
              </div>

            </div>

            <div className="chatbox-messages">

              {messages.map((msg, i) => (

                <div
                  key={i}
                  className={`chat-bubble-wrapper ${msg.role}`}
                >

                  {msg.role === 'assistant' && (
                    <div className="chat-bot-icon">
                      <i className="material-icons">
                        smart_toy
                      </i>
                    </div>
                  )}

                  <div className={`chat-bubble ${msg.role}`}>
                    {msg.text}
                  </div>

                </div>

              ))}

              {loading && (

                <div className="chat-bubble-wrapper assistant">

                  <div className="chat-bot-icon">
                    <i className="material-icons">
                      smart_toy
                    </i>
                  </div>

                  <div className="chat-bubble assistant typing">
                    <span />
                    <span />
                    <span />
                  </div>

                </div>

              )}

              <div ref={bottomRef} />

            </div>

            <div className="chatbox-input-bar">

              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
              />

              <button
                className="chatbox-send-btn"
                onClick={sendMessage}
                disabled={
                  loading ||
                  !input.trim()
                }
              >
                <i className="material-icons">
                  send
                </i>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Contact