const http = require('http');

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

const server = http.createServer((req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { message } = JSON.parse(body);

        if (!message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Mensaje requerido' }));
          return;
        }

        const reply = getResponse(message);

        // Simular delay de respuesta
        setTimeout(() => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            reply: reply,
            timestamp: new Date().toISOString()
          }));
        }, 500 + Math.random() * 1000);

      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error interno del servidor' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log('📝 API disponible en /api/chat');
  console.log('💡 Prueba enviando: "horarios", "precios", "contacto", etc.');
});