@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed.
  echo Install it from https://nodejs.org/ and try again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing dependencies for the first run...
  call npm install
  if errorlevel 1 (
    echo.
    echo Installation failed. Check the messages above.
    pause
    exit /b 1
  )
)

echo.
echo Starting the GOSOGOOD website...
echo The browser will open automatically. Keep this window open while you browse.
echo Press Ctrl+C to stop the site.
echo.
call npm start
pause
