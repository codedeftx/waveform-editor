import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Canvas from 'components/Canvas';
import Controls from 'components/Controls';
import Player from 'components/Player';
import { colors, resolutions, fonts } from 'data';
import 'styles/layout.css';

const App = props => {

  const [ audio_ctx, setAudioCtx ] = useState(null);
  const [ analyser, setAnalyser ] = useState(null);
  const [ audio_element, setAudioElement ] = useState(null);
  const [ canvas_element, setCanvasElement ] = useState(null);

  const [ canvas_state, canvasReducer ] = useState({
    resolution : resolutions[0]
  });

  const [ background_state, backgroundReducer ] = useState({
    color : '#aaa'
    , image_element : new window.Image()
    , image_base_64 : ''
    , translate : [0, 0]
    , scale : 1
  });

  const [ progress_bar_state, progressBarReducer ] = useState({
    color : '#0F0'
    , translate_y : 0
    , scale_y : 1
    , width : 8
  });

  const [ waveform_state, waveformReducer ] = useState({
    color : '#aff', translate_y : 0
  });

  const [ overlay_text_state, overlayTextReducer ] = useState({
    value : 'Hello World!'
    , font : fonts[0]
    , font_size : 40
    , color : colors[0]
    , translate : [0, 0]
    , bold : false
    , italic : false
  });

  const [ audio_files, audioFilesReducer ] = useState([]);

  const [ audio_file, audioFileReducer ] = useState({

  });

  useEffect(() => {
    (async () => {
      const res = await fetch('/audio_clips');
      const json = await res.json();
      audioFilesReducer(json.audio_clips);
      audioFileReducer(json.audio_clips[0])
    })();
  }, [ audioFilesReducer ]);

  const renderFrames = () => {
    audio_element.currentTime = 0;
    audio_element.play();
    let frames = [];
    let i=0;
    const fps = 25;
    const frame_count = 50;
    const job_id = 0;
    const audio_file_id = audio_file.id;

    (async () => await fetch('/job', {
      method: 'POST'
      , body: JSON.stringify({ job_id, audio_file_id, frame_count })
      , headers: { 'Content-Type': 'application/json' }
    }))();

    const interval = setInterval(() => {
      frames.push(canvas_element.toDataURL());
      ++i;
      if(audio_element.paused){
        clearInterval(interval);
        audio_element.pause();
        // upload frames
        frames.forEach(async (x,i) => {
          await fetch('/frame', {
            method: 'POST'
            , body: JSON.stringify({
              frame_index : i
              , job_id : 0
              , base64_img : x
            })
            , headers: { 'Content-Type': 'application/json' }
          });
        });
      }
    }, 1000/fps);
  }

  return <div className='column-wrapper'>
    <div className='controls-column'>
      <Controls
        canvasReducer={canvasReducer}
        backgroundReducer={backgroundReducer}
        waveformReducer={waveformReducer}
        overlayTextReducer={overlayTextReducer}
        progressBarReducer={progressBarReducer}
        canvas_state={canvas_state}
        background_state={background_state}
        progress_bar_state={progress_bar_state}
        waveform_state={waveform_state}
        overlay_text_state={overlay_text_state}
        />
    </div>
    <div className='canvas-player-column'>
      <Canvas
        setCanvasElement={setCanvasElement}
        audio_element={audio_element}
        canvas_state={canvas_state}
        background_state={background_state}
        overlay_text_state={overlay_text_state}
        progress_bar_state={progress_bar_state}
        waveform_state={waveform_state}
        analyser={analyser}
        />
      <Player
        audio_file={audio_file}
        audioFileReducer={audioFileReducer}
        setAudioCtx={setAudioCtx}
        setAnalyser={setAnalyser}
        audio_element={audio_element}
        audio_files={audio_files}
        audio_ctx={audio_ctx}
        analyser={analyser}
        renderFrames={renderFrames}
        setAudioElement={setAudioElement}
        />
    </div>
  </div>;
}

ReactDOM.render(<App />, document.getElementById('root'));
