const express = require('express');
const app = express();
const path = require('path');
const body_parser = require('body-parser');

const { spawn } = require('child_process');

const redis = require('redis');
const redis_client = redis.createClient();

const fs = require('fs');

app.use(body_parser.json());

const audio_clips = [
  {
    id : 0
    , file_name : 'dde730414a694ead8bdd082ef0465d9a.mp3'
    , title : 'A 30 minute podcast'
  }
  , {
    id : 1 
    , file_name : 'dde730414a694ead8bdd082ef0465d9a.mp3'
    , title : 'An hour long podcast'
  }
  , {
    id : 2
    , file_name : 'dde730414a694ead8bdd082ef0465d9a.mp3'
    , title : '4 hours of goddamn audio'
  }
];

app.post(
  '/job'
  , (req, res) => {
    const { job_number, frame_count, audio_file } = req.body;
    const key = `job:${job_number}`;
    const value = JSON.stringify({ frame_count, audio_file });

    redis_client.set(key, value);
    res.sendStatus(200);
  }
);

app.post(
  '/frame'
  , (req, res) => {

    const { job_number, frame_number } = req.body;
    const key = `job:${job_number},frame:${frame_number}`;
    const value = req.body.base64_img.split(';base64,').pop();

    fs.writeFile(
      `./jobs/${job_number}/${job_number}.png`
      , value
      , { encoding: 'base64' }
    );

    redis_client.set(key, value);

    res.sendStatus(200);
  }
);

app.get(
  '/finalize'
  , (req, res) => {

    const job_number = 0;

    for( let i=0; i<10; ++i ){
      const frame_number = i;
      const key = `job:${job_number},frame:${frame_number}`;
      const image64 = redis_client.get(key);
      console.log(image64);
    }

    res.sendStatus(200);
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
    res.sendFile(path.resolve('./audio/dde730414a694ead8bdd082ef0465d9a.mp3'));
  }
);

const port = process.env.NODE_PORT || 4000;

app.listen(port, () => console.log(`App running on port ${port}`));
