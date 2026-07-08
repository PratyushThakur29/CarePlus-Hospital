#!/usr/bin/env bash
# Render build script for the CarePlus Hospital backend.
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Seed reference data (safe to run repeatedly - uses update_or_create).
python manage.py seed_departments
python manage.py seed_doctors
