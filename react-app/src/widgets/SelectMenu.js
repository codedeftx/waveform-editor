import React, { useState, useRef } from 'react';
import 'widgets/themes/default/select-menu.css';

export default props => {

  const [ is_open, setIsOpen ] = useState(false);
  const menu_list = useRef(null);
  const onChange = props.onChange || (() => {});

  const setTitle = props.setTitle || (x => x);
  const setValue = props.setValue || (x => x);

  return <div className='dropdown-menu'>
    {
        <div
          ref={menu_list}
          onClick={event => setIsOpen(!is_open)}
          className='selected dropdown-menu-item'>
            <div
              className='selected dropdown-menu-span'>{props.current}</div>
            <div
              className={`
                ${is_open ? 'animate-open' : 'animate-close'}
                selected dropdown-menu-symbol`}>{'\u25C0'}</div>
          </div>
    }
    <div className={`selected dropdown-menu-item-wrapper`}>
      <div
        className={`
          ${is_open ? 'animate-open' : 'animate-close'}
          dropdown-menu-list`}>
        {
          props.options.map((x,i) =>
          <div
            onClick={event => {
              setIsOpen(!is_open);
              onChange(setValue(x),i);
            }}
            className='dropdown-menu-list-item'
            key={i}>
              <span className='dropdown-menu-list-item-span'>
                {setTitle(x)}
              </span>
          </div>)
        }
      </div>
    </div>
  </div>;
}
