import React, { useEffect, useRef } from 'react';
import Button from 'widgets/Button';

export default props => {

  const {
    audio_ctx
    , audio_files
    , setAudioElement
    , audio_element
    , renderFrames
    , setAudioCtx
    , setAnalyser
    , audio_file
    , audioFileReducer
  } = props;

  const element = useRef(null);

  const onChangeSoundtrack = event => {
    const id = event.target.value;
    audio_element.src = `/audio_clip/${id}`;
    audioFileReducer( audio_files.find(x => x.id === id));
  }

  useEffect(() => {
    const cb = () => {
      setAudioElement(element.current);
      const ctx = new(window.AudioContext || window.webkitAudioContext)();
      setAudioCtx(ctx);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      setAnalyser(analyser);
      const source = ctx.createMediaElementSource(element.current);
      source.connect(analyser);

      analyser.connect(ctx.destination);

      ctx.resume();
      element.current.removeEventListener('play',cb);
    }
    if(!audio_ctx){
      element.current.addEventListener('play',cb);
    }
  }, [ element, audio_ctx, setAudioElement, setAudioCtx, setAnalyser ]);

  return <div>
    <audio
      controls
      preload='metadata'
      muted={false}
      ref={element}
      src='/audio_clip/0'></audio>
    {
      audio_element
      ? <div>
          <h2>{'Select a soundtrack'}</h2>
          <select style={{padding:'1rem'}} onChange={onChangeSoundtrack}>
            {
              audio_files &&
              audio_files.map((x,i) =>
                <option value={x.id} key={i}>
                  {x.title}
                </option>)
            }
          </select>
          <div style={{display:'flex',padding:'1rem 0',alignItems:'center'}}>
            <Button onClick={event => renderFrames()} value='Render' />
            <a style={{marginLeft:'1rem'}} href='localhost:4000/job/0'>{'Download'}</a>
          </div>
        </div>
      : <p>{'Press play to enable the audio context.'}</p>
    }
  </div>;
}
