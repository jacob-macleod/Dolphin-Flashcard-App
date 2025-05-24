#!/bin/bash

# Start Firestore emulator
bash firebase_emulator.sh &

# Wait for the emulator to start, which may involve pulling the image when running in a container
SECONDS_TO_WAIT=10
echo "Waiting $SECONDS_TO_WAIT seconds for emulator to start..."
sleep $SECONDS_TO_WAIT

# Run unit tests
echo "Installing requirements..."
python3 -m venv env > /dev/null 2>&1
source env/bin/activate > /dev/null 2>&1
pip3 install -r requirements.txt > /dev/null 2>&1

# Reset terminal formatting without clearing the screen
echo \n
tput sgr0

# Run pytest and capture the return status
pytest testing/
ERROR_RETURN_STATUS=$?

# Stop Firestore emulator
echo "\nStopping Docker image..."
docker stop $(docker ps -aq --filter "ancestor=mtlynch/firestore-emulator-docker") > /dev/null 2>&1

# Exit with the pytest return status
exit $ERROR_RETURN_STATUS