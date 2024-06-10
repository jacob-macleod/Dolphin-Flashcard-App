#!/bin/bash

# Start Firestore emulator
bash firebase_emulator.sh &

# Wait for the emulator to startm which will involve pulling the image when running in a container
echo "Waiting 15 seconds for emulator to start..."
sleep 10

# Run unit tests
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
pytest testing/

# Stop Firestore emulator
#docker stop $(docker ps -aq --filter "ancestor=mtlynch/firestore-emulator-docker")
