@echo off
REM Start the React app
start cmd /k "C:\Users\Leitstelle 10M\Documents\ResultViewer-main\ResultViewer-main npm run dev"
REM Wait a few seconds for the server to start (adjust as needed)
timeout /t 5
REM Open Microsoft Edge to localhost:5173
start msedge http://localhost:5173