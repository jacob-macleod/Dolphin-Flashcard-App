# NOTE name need to be Dockerfile
FROM python:3.9

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

# Run hello.py when the container launches
CMD ["python", "backend/main.py"]
