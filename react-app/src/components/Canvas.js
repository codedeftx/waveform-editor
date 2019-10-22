import React, { useRef, useEffect } from 'react';

export default props => {

  const {
    background_state
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

  const dataArray = new Float32Array(analyser.fftSize);

  useEffect(() => {

    const canvas = element.current;
    const ctx = canvas.getContext('2d');

    const draw = () => requestAnimationFrame((timestamp) => {

      ctx.fillStyle = background_state.color;
      ctx.fillRect(0, 0, width, height);
 
      const img = background_state.image_element;

      analyser.getFloatTimeDomainData(dataArray);
 
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
        ctx.font = `${text.font_size}px ${text.font}`;
        ctx.fillStyle = text.color;
        ctx.fillText(
          text.value
          , text.translate[0]
          , parseInt(text.translate[1])+parseInt(text.font_size)
        );
      }
 
      const canvasCtx = ctx;
      const bufferLength = 1024;
 
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      canvasCtx.beginPath();
 
      var sliceWidth = width * 1.0 / bufferLength;
      var x = 0;
 
      for(var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] * 200.0;
        var y = height/2 + v;
 
        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();

      draw();
    });

    draw();


  }, [
    element
    , background_state
    , overlay_text_state
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
