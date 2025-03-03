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
}