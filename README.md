# PadelZone - Club de Pádel

Aplicación web para el club de pádel PadelZone ubicada en Neiva, Huila, Colombia.

## Cómo ejecutar el proyecto

#### 1. Instalar dependencias del frontend:
```bash
npm install
```

#### 2. Ejecutar el servidor backend (en una terminal):
```bash
npm run server
```
Esto iniciará el servidor en `http://localhost:3001` (sin dependencias externas)

#### 3. Ejecutar el frontend:
```bash
npm run dev
```
Esto iniciará la aplicación en `http://localhost:5173`


## Arquitectura

- **Frontend**: React + Vite
- **Backend**: Node.js puro (sin dependencias externas)
- **Chatbot**: Respuestas predefinidas inteligentes
- **API**: HTTP nativo con CORS habilitado

## Características

- Información del club de pádel
- Chatbot interactivo con respuestas inteligentes
- Diseño responsivo con Materialize CSS
- Sistema de reservas (sección en desarrollo)
- **Servidor backend sin dependencias** - funciona con solo Node.js

## Tecnologías utilizadas

- React 19
- Vite
- Node.js (servidor backend puro, sin dependencias externas)
- Materialize CSS
- React Router
- ESLint (archivos de servidor ignorados intencionalmente)

## Notas

- Los archivos `server-simple.js`, `server-commonjs.js`, `server.js` y `test-api.js` usan CommonJS y están excluidos de ESLint para evitar conflictos con la configuración ES modules del proyecto.
- El servidor backend funciona sin dependencias externas, solo requiere Node.js.
