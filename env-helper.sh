#!/bin/bash
while read -u 10 variable || [ -n "${variable}" ]
do
    read -p "${variable}" value
    echo "${variable}${value}"| tee -a .env >> /dev/null
done 10<.env.template
echo "Environment variables have been set in .env file."