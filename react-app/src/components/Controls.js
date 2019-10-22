import SelectMenu from 'widgets/SelectMenu.js';
import FilePicker from 'widgets/FilePicker.js';
import React from 'react';
import { colors, resolutions, fonts } from 'data';

const controlSectionStyle = {
  marginBottom : '12px' 
};

export default props => {

  const {
    canvas_state
    , background_state
    , overlay_text_state
    , canvasReducer
    , backgroundReducer
    , overlayTextReducer 
  } = props;

  const onChangeResolution = value => {
    canvasReducer({ ...canvas_state, resolution : value });
  };

  const onChangeBackgroundImage = event => {
    const file = event.target.files[0]
    const reader = new window.FileReader();
    reader.addEventListener('load', () => {
      const image_base_64 = reader.result;
      background_state.image_element.src = reader.result;
      backgroundReducer({ ...background_state , image_base_64 });
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onClearBackgroundImage = event => {
    background_state.image_element.src = '';
    backgroundReducer({ ...background_state , image_base_64 : null });
  };

  const onChangeBackgroundTranslateX = event => {
    const x = event.target.value;
    backgroundReducer({
      ...background_state
      , translate : [ x, background_state.translate[1] ]
    });
  };

  const onChangeBackgroundTranslateY = event => {
    const y = event.target.value;
    backgroundReducer({
      ...background_state
      , translate : [ background_state.translate[0], y ]
    });
  };

  const onChangeBackgroundScale = event => {
    const scale  = event.target.value;
    backgroundReducer({ ...background_state , scale });
  };

  const onChangeBackgroundColor = (value, index) => {
    backgroundReducer({ ...background_state, color : value });
  };

  const onChangeOverlayTextValue = event => {
    const { value } = event.target;
    overlayTextReducer({ ...overlay_text_state, value });
  };

  const onChangeOverlayTextTranslateX = event => {
    const x = event.target.value;
    overlayTextReducer({
      ...overlay_text_state
      , translate : [ x, overlay_text_state.translate[1] ]
    });
  };

  const onChangeOverlayTextTranslateY = event => {
    const y = event.target.value;
    overlayTextReducer({
      ...overlay_text_state
      , translate : [ overlay_text_state.translate[0], y ]
    });
  };

  const onChangeOverlayTextFontSize = event => {
    const font_size = event.target.value;
    overlayTextReducer({ ...overlay_text_state, font_size });
  };

  const onChangeOverlayTextColor = event => {
    const color = event.target.value;
    overlayTextReducer({ ...overlay_text_state, color });
  };

  const onChangeOverlayTextFont = event => {
    const font = event.target.value;
    overlayTextReducer({ ...overlay_text_state, font });
  };

  const onChangeOverlayTextBold = event => {
    overlayTextReducer({
      ...overlay_text_state
      , bold : !overlay_text_state.bold
    });
  };

  const onChangeOverlayTextItalic = event => {
    overlayTextReducer({
      ...overlay_text_state
      , italic : !overlay_text_state.italic
    });
  };

  return <div>
    <div className=''>
      <h2>{'Canvas Settings'}</h2>
      <div className='control-section'>
        <div className='label-wrapper'>
          <label>{'Resolution'}</label>
        </div>
        <div className='control-wrapper'>
          <SelectMenu
            current={canvas_state.resolution}
            onChange={onChangeResolution}
            options={resolutions} />
        </div>
      </div>
    </div>
    <div style={controlSectionStyle}>
      <h2>{'Background'}</h2>
      <FilePicker
        onSelect={onChangeBackgroundImage}
        onClear={onClearBackgroundImage} />
    </div>
    {
      background_state.image_base_64 && <>
        <div style={controlSectionStyle}>
          <label>{'Translate (X,Y)'}</label>
          <input
            style={{width:'48px'}}
            size={4}
            type='number'
            value={background_state.translate[0]}
            onChange={onChangeBackgroundTranslateX} />
          <input
            style={{width:'48px'}}
            size={4}
            type='number'
            value={background_state.translate[1]}
            onChange={onChangeBackgroundTranslateY} />
        </div>
        <div style={controlSectionStyle}>
          <label>{'Scale'}</label>
          <input
            style={{width:'48px'}}
            size={4}
            type='number'
            step='0.01'
            value={background_state.scale}
            onChange={onChangeBackgroundScale} />
        </div>
      </>
    }
    <div style={controlSectionStyle}>
      <label>{'Color'}</label>
      <SelectMenu
        current={background_state.color}
        onChange={onChangeBackgroundColor}
        options={colors} />
    </div>
    <div style={controlSectionStyle}>
      <h2>{'Overlay Text'}</h2>
      <input
        type='text'
        value={overlay_text_state.value}
        onChange={onChangeOverlayTextValue} />
    </div>
    {
      overlay_text_state.value && <>
        <div style={controlSectionStyle}>
          <label>{'Translate (X,Y)'}</label>
          <input
            style={{width:'48px'}}
            size={4}
            type='number'
            value={overlay_text_state.translate[0]}
            onChange={onChangeOverlayTextTranslateX} />
          <input
            style={{width:'48px'}}
            size={4}
            type='number'
            value={overlay_text_state.translate[1]}
            onChange={onChangeOverlayTextTranslateY} />
        </div>
        <div style={controlSectionStyle}>
          <label>{'Font Size (px)'}</label>
          <input
            style={{width:'48px'}}
            size={4}
            type='number'
            step='1'
            value={overlay_text_state.font_size}
            onChange={onChangeOverlayTextFontSize} />
        </div>
        <div style={controlSectionStyle}>
          <label>{'Color'}</label>
          <select
            value={overlay_text_state.color}
            onChange={onChangeOverlayTextColor}>
            {
              colors.map((x,i) =>
                <option value={x} key={i}>{x}</option>
              )
            }
          </select>
        </div>
        <div style={controlSectionStyle}>
          <label>{'Font'}</label>
          <select
            value={overlay_text_state.font}
            onChange={onChangeOverlayTextFont}>
            {
              fonts.map((x,i) =>
                <option value={x} key={i}>{x}</option>
              )
            }
          </select>
        </div>
        <div style={controlSectionStyle}>
          <label>{'Bold'}</label>
          <input
            type='checkbox'
            value={overlay_text_state.bold}
            onChange={onChangeOverlayTextBold} />
          <label>{'Italic'}</label>
          <input
            type='checkbox'
            value={overlay_text_state.italic}
            onChange={onChangeOverlayTextItalic} />
        </div>
      </>
    }
  </div>;
}
