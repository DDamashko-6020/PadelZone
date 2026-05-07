@echo off
echo Instalando dependencias...
npm install

echo.
echo Iniciando servidor backend...
start cmd /k "npm run server"

echo.
echo Iniciando frontend...
start cmd /k "npm run dev"

echo.
echo Servidores iniciados. Presiona cualquier tecla para cerrar...
pause > nul