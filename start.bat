@echo off
echo Instalando dependencias...
npm install

echo.
echo Iniciando frontend...
npm run dev

echo.
echo Presiona cualquier tecla para cerrar...
pause > nul