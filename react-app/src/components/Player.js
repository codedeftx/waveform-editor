import React, { useEffect, useRef } from 'react';

export default props => {

  const {
    loadSource
    , setAudioElement
    , renderFrames
  } = props;

  const element = useRef(null);

  useEffect(() => {
    setAudioElement(element.current);
    loadSource(element.current);
  }, [ element, loadSource, setAudioElement ]);

  return <div>
    <button onClick={event => renderFrames()}>{'Render'}</button>
    <audio
      controls
      preload='metadata'
      muted={true}
      ref={element}
      src='/audio_clip/0'></audio>
  </div>;
}
