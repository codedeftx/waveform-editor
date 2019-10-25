import React, { useRef, useEffect } from 'react';

export default props => {

  const {
    background_state
    , audio_element
    , progress_bar_state
    , waveform_state
    , overlay_text_state
    , canvas_state
    , setCanvasElement
    , analyser
  } = props;

  const [ width, height ] = canvas_state.resolution.split(':');

  const element = useRef(null);

  useEffect(() => {
    setCanvasElement(element.current);
  }, [element, setCanvasElement] );

  const dataArray = new Float32Array(1024);

  useEffect(() => {

    let rafHandle = null;
    const canvas = element.current;
    const ctx = canvas.getContext('2d');


    const draw = () =>  {

      ctx.fillStyle = background_state.color;
      ctx.fillRect(0, 0, width, height);
 
      const img = background_state.image_element;

      if(analyser){
        analyser.getFloatTimeDomainData(dataArray);
      }
 
      if( img ){
        ctx.drawImage(
          img
          , background_state.translate[0]
          , background_state.translate[1]
          , background_state.scale * img.width
          , background_state.scale * img.height
        );
      }
 
      const text = overlay_text_state;
  
      if(text.value){
        ctx.font = `
          ${text.bold?'bold ':''}
          ${text.italic?'italic ':''}
          ${text.font_size}px
          ${text.font}`;

        ctx.fillStyle = text.color;
        ctx.fillText(
          text.value
          , text.translate[0]
          , parseInt(text.translate[1])+parseInt(text.font_size)
        );
      }

      if(audio_element){
        const current_time = audio_element.currentTime;
        const duration = audio_element.duration;
        const bar = progress_bar_state;
        const x_pos = (current_time/duration) * width;
        ctx.beginPath();
        ctx.fillStyle = bar.color;
        ctx.rect(
          x_pos-(bar.width/2)
          , bar.translate_y
          , bar.width
          , height*bar.scale_y
        );
        ctx.fill();
      }
 
      const canvasCtx = ctx;
      const bufferLength = 1024;
 
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = waveform_state.color;
      canvasCtx.beginPath();
 
      var sliceWidth = width * 1.0 / bufferLength;
      var x = 0;

      canvasCtx.translate(0, waveform_state.translate_y);
 
      for(var i = 0; i < bufferLength; i++){
        var v = dataArray[i] * 200.0;
        var y = (height/2 + v) ;
  
        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
      canvasCtx.setTransform(1, 0, 0, 1, 0, 0);
      rafHandle = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(rafHandle);

  }, [
    element
    , audio_element
    , background_state
    , progress_bar_state
    , overlay_text_state
    , waveform_state
    , width
    , height
    , dataArray
    , analyser
  ]);


  return <canvas
    width={width}
    height={height}
    style={{ border:'1px solid #333' }}
    ref={element}></canvas>;
}
