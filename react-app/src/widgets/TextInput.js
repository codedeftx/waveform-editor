import React from 'react';
import 'widgets/themes/default/text-input.css';

export default props => {
  return <input
    className='text-input'
    onChange={props.onChange}
    value={props.value || ''}
    type='text' />;
};
