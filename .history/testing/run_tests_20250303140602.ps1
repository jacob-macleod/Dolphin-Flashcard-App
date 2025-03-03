# Windows PowerShell script equivalent to the bash script
# This script starts the Firestore emulator, runs tests, and cleans up

$existingContainer = docker ps -q --filter "ancestor=mtlynch/firestore-emulator-docker"
if ($existingContainer) {
    Write-Host "Firestore emulator is already running in container $existingContainer" -ForegroundColor Yellow
}
else{
# Pull the Firestore emulator image if needed
Write-Host "Pulling Firestore emulator Docker image..."
docker pull mtlynch/firestore-emulator-docker
# Start the Firestore emulator in a Docker container
Write-Host "Starting Firestore emulator..."
docker run --env "FIRESTORE_PROJECT_ID=dummy-project-id" --env "PORT=8080" mtlynch/firestore-emulator-docker --publish 8080:8080 mtlynch/firestore-emulator-docker
}

$SECONDS_TO_WAIT = 10
Write-Host "Waiting $SECONDS_TO_WAIT seconds for emulator to start..."
Start-Sleep -Seconds $SECONDS_TO_WAIT

Write-Host "Installing requirements..."
python -m venv env
& .\env\Scripts\Activate.ps1
pip install -r requirements.txt | Out-Null
pip install pytest | Out-Null
Write-Host "Running tests..." -ForegroundColor Green

try {
    pytest testing/
    $ERROR_RETURN_STATUS = $LASTEXITCODE
    if ($ERROR_RETURN_STATUS -eq 0) {
        Write-Host "All tests passed!" -ForegroundColor Green
    } else {
        Write-Host "Tests failed with exit code $ERROR_RETURN_STATUS" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Error running tests: $_" -ForegroundColor Red
    $ERROR_RETURN_STATUS = 1
}

Write-Host "`nStopping Docker image..."
$containerId = (docker ps -q --filter "ancestor=mtlynch/firestore-emulator-docker")
if ($containerId) {
    docker stop $containerId | Out-Null
}

# Deactivate the virtual environment
deactivate

# Exit with the pytest return status
exit $ERROR_RETURN_STATUS




