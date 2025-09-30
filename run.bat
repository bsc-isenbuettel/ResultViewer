@echo off
REM Start the React app
start cmd /k "npm run dev"
REM Wait a few seconds for the server to start (adjust as needed)
timeout /t 1
REM Open Microsoft Edge to localhost:5173
start msedge http://localhost:5173