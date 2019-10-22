import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Canvas from 'components/Canvas';
import Controls from 'components/Controls';
import Player from 'components/Player';
import { colors, resolutions, fonts } from 'data';
import 'styles/layout.css';

const audio_ctx = new(window.AudioContext || window.webkitAudioContext)();
const analyser = audio_ctx.createAnalyser();
analyser.fftSize = 1024;

const loadSource = audio_element => {
  const source = audio_ctx.createMediaElementSource(audio_element);
  source.connect(analyser);
  audio_ctx.resume();
  //analyser.connect(audio_ctx.destination);
};


const App = props => {

  const [ canvas_state, canvasReducer ] = useState({
    resolution : resolutions[0]
  });

  const [ audio_element, setAudioElement ] = useState(null);
  const [ canvas_element, setCanvasElement ] = useState(null);

  const renderFrames = () => {

    audio_element.currentTime = 0;
    audio_element.play();
    let frames = [];
    let i=0;
    const fps = 25;
    const sample_size = 10;

    const interval = setInterval(() => {
      frames.push(canvas_element.toDataURL());
      ++i;
      if(i >= fps*sample_size){
        clearInterval(interval);
        audio_element.pause();
        // upload frames
        frames.forEach(async (x,i) => {
          await fetch('/frame', {
            method: 'POST'
            , body: JSON.stringify({
              frame_number : i
              , job_number : 0
              , base64_img : x
            })
            , headers: { 'Content-Type': 'application/json' }
          });
        });
      }
    }, 1000/fps);
  }

  const [ background_state, backgroundReducer ] = useState({
    color : '#aaa'
    , image_element : new window.Image()
    , image_base_64 : ''
    , translate : [0, 0]
    , scale : 1
  });

  const [ progress_bar_state, progressBarReducer ] = useState({
    color : colors[0]
    , translate : [0, 0]
    , scale : [1, 1]
  });

  const [ waveform_state, waveformReducer ] = useState({
    color : colors[0]
    , translate : [0, 0]
    , scale : [1, 1]
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
        audio_element={audio_element}
        renderFrames={renderFrames}
        setAudioElement={setAudioElement}
        loadSource={loadSource}
        />
    </div>
  </div>;
}

ReactDOM.render(<App />, document.getElementById('root'));
