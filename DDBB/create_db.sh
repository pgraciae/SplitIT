#!/bin/bash

if [ -z "$1" ]
  then
    echo "No BD name provided, TEST will be used"
    test="TEST"
else
    echo "Creant DB ${1}"
    test=$1
    echo "DB ${test} created"
fi

sudo -u postgres createdb $test

