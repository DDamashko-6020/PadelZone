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
- Node.js
- Express
- Materialize CSS
- React Router
