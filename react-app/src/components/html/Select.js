import React from 'react';

export default = props => 
  <div
    onClick={props.openMenu}
    stlye={props.styles}>
    className={props.className}>
      {props.current}
  </div>;
