const express = require('express');
const app = express();
const path = require('path');
const body_parser = require('body-parser');
const { spawn } = require('child_process');
const redis = require('redis');
const redis_client = redis.createClient();
const fs = require('fs');

const stream = require('stream');
const Readable = require('stream').Readable;

app.use(body_parser.json());

const audio_clips = [
  {
    id : '0'
    , file_name : 'bensound-dubstep.mp3'
    , title : 'Some annoying electronic music'
  }
  , {
    id : '1'
    , file_name : 'bensound-epic.mp3'
    , title : 'Try hard soundtrack'
  }
  , {
    id : '2'
    , file_name : 'bensound-onceagain.mp3'
    , title : 'This one has feels'
  }
];

app.post(
  '/job'
  , (req, res) => {
    const { job_id, frame_count, audio_file_id } = req.body;
    const key = `job:${job_id}`;

    redis_client.set(key, JSON.stringify({
      job_id
      , frame_count
      , audio_file_id
    }));

    res.sendStatus(200);
  }
);

app.post(
  '/frame'
  , (req, res) => {

    const { job_id, frame_index } = req.body;

    redis_client.get(`job:${job_id}`, (error, result) => {

      const job = JSON.parse(result);
      const base64 = req.body.base64_img.split(';base64,').pop();
      const frame_key = `job:${job_id},frame:${frame_index}`;
      const frame_value = base64;
 
      fs.writeFile(
        `./jobs/${job_id}/${frame_index}.png`
        , base64
        , { encoding: 'base64' }
        , (error, file) => {}
      );
    }); 

    res.sendStatus(200);
  }
);

app.get(
  '/job/:id'
  , (req, res) => {

    redis_client.get(`job:${req.params.id}`, (error, result) => {

      const job = JSON.parse(result);
      console.log(job)
      const { file_name } = audio_clips.find(x => x.id === job.audio_file_id );
      const image_path = `./jobs/${req.params.id}/%d.png`;
      const audio_path = `./audio/${file_name}`;
      const destination = `./video/${req.params.id}.mp4`;
 
      const ffmpeg = spawn(
        'ffmpeg'
        , [ '-i', image_path, '-i', audio_path, '-c:a', 'copy', '-shortest', '-y', destination ]
      );
 
      ffmpeg.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
 
      ffmpeg.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      ffmpeg.on('close',() => {
        res.sendFile(path.resolve(destination));
      });

    });
  }
)

app.get(
  '/audio_clips'
  , (req, res) => {
    res.json({ audio_clips });
  }
);

app.get(
  '/audio_clip/:id'
  , (req, res) => {
    const audio_clip = audio_clips.find(x => x.id === req.params.id);
    if(audio_clip){
      res.sendFile(path.resolve(`./audio/${audio_clip.file_name}`));
    } else {
      res.sendStatus(404);
    }
  }
);

const port = process.env.NODE_PORT || 4000;

app.listen(port, () => console.log(`App running on port ${port}`));
