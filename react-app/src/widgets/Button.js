import React from 'react';
import 'widgets/themes/default/button.css';

export default props => {
 
  const handleClick = event => {
    event.preventDefault();
    props.onClick(event);
  }

  return <button
    className='button'
    onClick={handleClick}>{props.value}</button>
};
