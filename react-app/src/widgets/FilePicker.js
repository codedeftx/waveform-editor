import React, { useRef, useState } from 'react';
import Button from 'widgets/Button';

export default props => {

  const file_input = useRef(null);

  const [ file_name, setFileName ] = useState('');

  const clickChooseFile = event => {
    file_input.current.click();
  };

  const onFilePicked = event => {
    const { value } = event.target;
    setFileName(value.split('\\').pop());
    props.onSelect(event);
  }

  const clickClearSelection = event => {
    file_input.current.value='';
    setFileName('');
    props.onClear();
  };

  return <div>
    <input
      onChange={onFilePicked}
      style={{display:'none'}}
      ref={file_input}
      value=''
      type='file' />
    <Button onClick={clickChooseFile} value='Select File' />
    { file_name && <span>{file_name}</span> }
    { file_name && <div onClick={clickClearSelection}>{'Clear'}</div> }
  </div>;
};
