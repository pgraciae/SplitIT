#!/bin/bash

sudo -u postgres psql postgres -c "CREATE ROLE ferran WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD 'root';"


sudo -u postgres psql postgres -c "CREATE ROLE pol WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD 'toor';"



sudo -u postgres psql postgres -c "CREATE ROLE dani WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD 'otro';"
