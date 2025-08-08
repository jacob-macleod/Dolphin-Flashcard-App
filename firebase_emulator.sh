sudo docker run \
--env "FIRESTORE_PROJECT_ID=dummy-project-id" \
--env "PORT=5000" \
--publish 5000:5000 \
mtlynch/firestore-emulator-docker

# Clear the stored data
curl -v -X DELETE "http://localhost:5000/emulator/v1/projects/dummy-project-id/databases/(default)/documents"
