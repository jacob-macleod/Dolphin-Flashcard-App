sudo docker run \
--env "FIRESTORE_PROJECT_ID=dummy-project-id" \
--env "PORT=8080" \
--publish 8080:8080 \
mtlynch/firestore-emulator-docker

# Clear the stored data
curl -v -X DELETE "http://localhost:8080/emulator/v1/projects/dummy-project-id/databases/(default)/documents"
