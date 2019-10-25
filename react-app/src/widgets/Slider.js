import React, { useState } from 'react';
import 'widgets/themes/default/slider.css';

export default props => {

  const [ is_tracking, setTracking ] = useState(false);
  const [ x_pos, setXPos ] = useState(0);
  const [ percent, setPercent ] = useState(0);
  const [ knob_width, setKnobWidth ] = useState(48);

  const startTracking = () => {
    setTracking(true);
  }

  const update = event => {
    if(is_tracking){

      const { left, right, width } = event.target.getBoundingClientRect();

      //setXPos(right-48);

      const x = (event.clientX-left);

      console.log(x / width)
    }
  }

  const endTracking = () => {
    setTracking(false);
  }

  return <div
    className='slider-track' 
    onMouseDown={startTracking}
    onMouseMove={update}
    onMouseUp={endTracking}>
      <div
        style={{
          width:'32px'
          , transform:`translateX(${x_pos}px)`
        }}
        className='slider-knob'>
      </div>
  </div>;
}
