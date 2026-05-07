// Archivo de prueba para verificar la API del chat
// Ejecutar con: node test-api.js

const http = require('http');

function testAPI(message) {
  const postData = JSON.stringify({ message });

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/chat',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);

    res.setEncoding('utf8');
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('Respuesta:', data);
      } catch (e) {
        console.log('Respuesta (no JSON):', body);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

// Probar diferentes mensajes
console.log('🧪 Probando API del chat...\n');

setTimeout(() => testAPI('horarios'), 100);
setTimeout(() => testAPI('precios'), 200);
setTimeout(() => testAPI('contacto'), 300);
setTimeout(() => testAPI('¿Qué servicios ofrecen?'), 400);