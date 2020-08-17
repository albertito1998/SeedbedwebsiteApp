#!/bin/bash

DATE=$(date +"%Y-%m-%d_%H%M")

fswebcam /home/pi/webcam/photos/$DATE.jpg

#CODE TO ADD IN CRONTAB
#* * 15 * * /home/pi/webcam/timelapse.sh 2>&1