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
docker run  8080:8080 --env "FIRESTORE_PROJECT_ID=demo-test" --env "PORT=8080" mtlynch/firestore-emulator-docker

}





