#!/bin/bash

# Start Firestore emulator
bash firebase_emulator.sh &

# Wait for the emulator to start
echo "Waiting 10 seconds for emulator to start..."
sleep 10

# Run unit tests
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
pytest testing/

# Stop Firestore emulator
docker stop $(docker ps -aq --filter "ancestor=mtlynch/firestore-emulator-docker")
