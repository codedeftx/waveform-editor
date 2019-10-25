import React from 'react';
import 'widgets/themes/default/number-input.css';

export default props =>
  <input
    className='number-input'
    onChange={props.onChange}
    value={props.value}
    type='number' 
    min={props.min}
    max={props.max}
    step={props.step} />;

