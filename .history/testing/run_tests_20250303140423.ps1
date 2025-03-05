# Windows PowerShell script to setup and run Firebase emulator
# This script starts the Firebase emulator for local development

$existingContainer = docker ps -q --filter "ancestor=firebase"
if ($existingContainer) {
    Write-Host "Firebase emulator is already running in container $existingContainer" -ForegroundColor Yellow
}
else {
    # Check if Firebase tools are installed
    if (!(Get-Command firebase -ErrorAction SilentlyContinue)) {
        Write-Host "Installing Firebase tools..." -ForegroundColor Yellow
        npm install -g firebase-tools
    }

    # Start the Firebase emulator
    Write-Host "Starting Firebase emulator..." -ForegroundColor Green
    firebase emulators:start --only firestore
}

Write-Host "Firebase emulator is ready!" -ForegroundColor Green




