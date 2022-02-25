#!/bin/bash

if [ -z "$1" ] || [ -z "$2" ]
  then
    echo "No username or BD name provided"
    exit 1 
else
    user=$1
    database=$2
    sudo -u $user createdb $database;
    echo "User: ${user} logged"
    echo "DB ${database} created"
fi

