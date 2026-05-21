@echo off
echo ========================================
echo Investment Portfolio Website Hosting
echo ========================================
echo.
echo STEP 1: Starting local server on port 8000...
start "Local Server" cmd /k "python -m http.server 8000"
timeout /t 3 /nobreak > nul
echo.
echo STEP 2: Starting ngrok tunnel...
echo.
echo After ngrok starts, you'll see a URL like:
echo https://abc-123.ngrok-free.app
echo.
echo Share that URL with your colleagues!
echo.
echo Press any key to start ngrok...
pause > nul
ngrok http 8000