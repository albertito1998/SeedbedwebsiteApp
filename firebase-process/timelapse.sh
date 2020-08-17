#!/bin/bash
cd /home/pi/webcam/photos
ls *.jpg > stills.txt 
mencoder /home/pi/webcam/timelapse -nosound -ovc lavc -lavcopts vcodec=mpeg4:aspect=16/9:vbitrate=8000000 -vf scale=640:480 -o timelapse.avi -mf type=jpeg:fps=1 mf://@stills.


#CODE TO ADD IN CRONTAB
#* * 15 * * /home/pi/webcam/timelapse.sh 2>&1