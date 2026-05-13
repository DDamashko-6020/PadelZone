# PadelZone - Club de Pádel

Aplicación web para el club de pádel PadelZone ubicada en Neiva, Huila, Colombia.

## 🚀 Cómo ejecutar el proyecto

### Opción ultra-rápida (Windows):
```bash
start.bat  # Ejecuta todo automáticamente
```

### Opción simple:
```bash
npm install  # Instalar dependencias
npm run dev  # Ejecutar solo el frontend
```

### Abrir en el navegador
Ve a `http://localhost:5173` y navega a la sección "Contacto" para probar el chatbox interactivo con botones.


## 🏗️ Arquitectura

- **Frontend**: React + Vite (100% frontend)
- **Chatbot**: Sistema interactivo con botones de opciones
- **Respuestas**: Predefinidas e inteligentes sobre PadelZone
- **Sin backend**: Todo funciona en el navegador

## Características

- Información completa del club de pádel
- **Chatbot interactivo con botones de opciones** (sin escribir)
- Diseño responsivo con Materialize CSS
- Sistema de reservas (sección en desarrollo)
- **100% frontend** - sin servidor backend necesario

## 🎯 Chatbot Interactivo

El chatbox funciona **100% en el frontend** con un sistema de botones interactivos:

- **Horarios**: Consulta disponibilidad del club
- **Precios**: Lista completa de tarifas por cancha
- **Reservas**: Información sobre reservas online
- **Contacto**: Datos de contacto completos
- **Servicios**: Todos los servicios disponibles
- **Ubicación**: Dirección del club
- **Políticas**: Reglas y políticas del club

**Sin escribir texto** - solo haz clic en los botones para obtener información instantánea.
- **Servidor backend sin dependencias** - funciona con solo Node.js

## Tecnologías utilizadas

- React 19
- Vite
- Materialize CSS
- React Router
- **100% Frontend** - Sin backend ni APIs externas

## Notas

- Los archivos `server-simple.js`, `server-commonjs.js`, `server.js` y `test-api.js` usan CommonJS y están excluidos de ESLint para evitar conflictos con la configuración ES modules del proyecto.
- El servidor backend funciona sin dependencias externas, solo requiere Node.js.
