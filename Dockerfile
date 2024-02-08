# NOTE name need to be Dockerfile
FROM python:3.9

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt
RUN echo 'type="production"' > backend/database/database_config.py

# Run hello.py when the container launches
CMD ["python", "backend/main.py"]
