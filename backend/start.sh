#!/bin/bash

# Wait for database to be ready
echo "Waiting for database..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "Database is up!"

# Seed data
echo "Seeding data..."
python -m app.seed.seed_data

# Start application
echo "Starting application..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
