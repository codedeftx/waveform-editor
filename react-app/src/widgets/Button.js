import React from 'react';
import 'widgets/themes/default/button.css';

export default props => {
 
  const handleClick = event => {
    event.preventDefault();
    props.onClick(event);
  }

  const { remove } = props;

  return <button
    className={`button ${remove ? 'remove' : ''}`}
    onClick={handleClick}>{props.value}</button>
};
