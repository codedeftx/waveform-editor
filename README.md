# waveform-editor

The waveform editor enables the creation of videos to visualize an audio file.

## Back end setup instructions

1. Move your audio files to /express-app/audio
2. Open /express-app/index.js and update the audio_clips object defined on line 15.
3. Ensure Redis is running on port 6379
4. Run npm start to start the express app
5. Cd to /react-app and run npm start, the front end editor show now load with the audio files appearing in a drop down menu

## Front end use instructions 

Since modern browsers disable auto play you will first need to press play to enable the audio. You only need to do this once when the page loads.

If you do not want to hear the audio then comment out line 37 of /react-app/components/Player.js. It should read

37. analyser.connect(ctx.destination);

The volume control in the player dictates the height of the waveform, so if you do not see a waveform then you might have the audio muted.

	Once you are happy with the preview click render, the player will start from the beginning and send the frames to the backend one by one. You can pause the editor at anytime and click download to splice together the uploaded frames and get a video.

If your browser does not support the link then try opening in a new tab and downloading or do

curl localhost:4000/job/0 --output ~/Downloads/0.mp4

## Currently Supported Features

* Change video resolution
* Select a background image
* Set a background color
* Scale and translate background image
* Type out overlay text
* Change text position, size, color, and font family
* Set font bold or italic
* Change waveform color
* Change waveform y position
* Change progress bar color, y offset, scale and width
