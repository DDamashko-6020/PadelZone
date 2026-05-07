import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

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

Si te preguntan algo fuera de PadelZone, responde amablemente que solo puedes ayudar con temas del club.`;

// Respuestas predefinidas para preguntas comunes
const responses = {
  'horarios': 'Nuestros horarios son de Lunes a Domingo de 7:00 AM a 11:00 PM. ¡Te esperamos!',
  'precios': 'Nuestras tarifas son: Central $120.000/hora, Premium $160.000/hora, Recreativa $100.000/hora, Profesional $180.000/hora, Express $90.000/hora.',
  'reservas': 'Las reservas se hacen online en la sección "Reservar" de nuestra página web. También puedes llamarnos al +57 300 000 0000.',
  'contacto': 'Puedes contactarnos en: Calle Pádel 123, Neiva, Huila | +57 300 000 0000 | info@padelzone.com',
  'servicios': 'Ofrecemos: Reservas online, Clases de pádel, Torneos, Tienda deportiva, Gimnasio, Programa VIP, Grabación de partidos.',
  'ubicacion': 'Estamos ubicados en Calle Pádel 123, Neiva, Huila, Colombia.',
  'default': '¡Hola! Soy el asistente de PadelZone. ¿En qué puedo ayudarte? Puedo informarte sobre horarios, precios, reservas, servicios y contacto.'
};

function getResponse(message) {
  const lowerMessage = message.toLowerCase();

  for (const [key, response] of Object.entries(responses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      return response;
    }
  }

  return responses.default;
}

app.post('/api/chat', (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    const reply = getResponse(message);

    // Simular delay de respuesta
    setTimeout(() => {
      res.json({
        reply: reply,
        timestamp: new Date().toISOString()
      });
    }, 500 + Math.random() * 1000); // Delay aleatorio entre 500ms-1.5s

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});