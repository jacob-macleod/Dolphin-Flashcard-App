#!/bin/bash

# Start Firestore emulator
bash firebase_emulator.sh &

# Wait for the emulator to start, which may involve pulling the image when running in a container
SECONDS_TO_WAIT=10
echo "Waiting $SECONDS_TO_WAIT seconds for emulator to start..."
sleep $SECONDS_TO_WAIT

# Run unit tests
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt

# Run pytest and capture the return status
pytest testing/
ERROR_RETURN_STATUS=$?

# Stop Firestore emulator
docker stop $(docker ps -aq --filter "ancestor=mtlynch/firestore-emulator-docker")

# Exit with the pytest return status
exit $ERROR_RETURN_STATUS