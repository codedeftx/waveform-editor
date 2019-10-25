import NumberInput from 'widgets/NumberInput';
import TextInput from 'widgets/TextInput';
import SelectMenu from 'widgets/SelectMenu';
import FilePicker from 'widgets/FilePicker';
import React from 'react';
import { resolutions, fonts } from 'data';

const controlSectionStyle = {
  marginBottom : '12px' 
};

export default props => {

  const {
    canvas_state
    , progress_bar_state
    , waveform_state
    , background_state
    , overlay_text_state
    , progressBarReducer
    , waveformReducer
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

  const onChangeOverlayTextFont = (value, index)=> {
    overlayTextReducer({ ...overlay_text_state, font : value });
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

  const onChangeWaveformColor = event => waveformReducer({
    ...waveform_state, color : event.target.value
  });

  const onChangeWaveformTranslateY = event => waveformReducer({
    ...waveform_state, translate_y: event.target.value
  });

  const onChangeProgressBarColor = event => progressBarReducer({
    ...progress_bar_state, color : event.target.value
  });

  const onChangeProgressBarScaleY = event => progressBarReducer({
    ...progress_bar_state, scale_y: event.target.value
  });

  const onChangeProgressBarTranslateY = event => progressBarReducer({
    ...progress_bar_state, translate_y : event.target.value
  });

  const onChangeProgressBarWidth = event => progressBarReducer({
    ...progress_bar_state, width : event.target.value
  });

  return <div>
    <div style={{marginBottom:'.5rem'}}>
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
    <div>
      <h2>{'Background'}</h2>
      <FilePicker
        onSelect={onChangeBackgroundImage}
        onClear={onClearBackgroundImage} />
    </div>
    {
      background_state.image_base_64 && <>
        <div className='display:flex flex:wrap'>
          <div style={{width:'100%',padding:'.5rem 0 .125rem 0'}}>
            <label>{'Translate (X,Y)'}</label>
          </div>
          <div style={{width:'50%',paddingRight:'.5rem'}}>
            <NumberInput
              value={background_state.translate[0]}
              onChange={onChangeBackgroundTranslateX} />
          </div>
          <div style={{width:'50%'}}>
            <NumberInput
              value={background_state.translate[1]}
              onChange={onChangeBackgroundTranslateY} />
          </div>
        </div>
        <div className='display:flex flex:wrap' style={{marginTop:'1rem'}}>
          <div style={{width:'50%',padding:'.5rem 0 .125rem 0'}}>
            <label>{'Scale'}</label>
          </div>
          <div style={{width:'50%'}}>
            <NumberInput
              step='0.01'
              value={background_state.scale}
	      onChange={onChangeBackgroundScale} />
          </div>
        </div>
      </>
    }
    <div
      className='display:flex flex:wrap alignItems:center'
      style={{marginTop:'1rem'}}>
      <div style={{width:'50%',padding:'.5rem 0 .125rem 0'}}>
        <label>{'Color'}</label>
      </div>
      <div style={{width:'50%'}}>
        <TextInput
          value={background_state.color}
          onChange={event => onChangeBackgroundColor(event.target.value)} />
      </div>
    </div>
    <div>
      <h2>{'Overlay Text'}</h2>
      <TextInput
        value={overlay_text_state.value}
        onChange={onChangeOverlayTextValue} />
    </div>
    {
      overlay_text_state.value && <>
        <div className='display:flex flex:wrap'>
          <div style={{width:'100%',padding:'.5rem 0 .125rem 0'}}>
            <label>{'Translate (X,Y)'}</label>
          </div>
          <div style={{width:'50%',paddingRight:'.5rem'}}>
            <NumberInput
              value={overlay_text_state.translate[0]}
            onChange={onChangeOverlayTextTranslateX} />
          </div>
          <div style={{width:'50%'}}>
            <NumberInput
              value={overlay_text_state.translate[1]}
              onChange={onChangeOverlayTextTranslateY} />
          </div>
        </div>
        <div
          className='display:flex flex:wrap alignItems:center'
          style={{marginTop:'1rem'}}>
          <div style={{width:'50%'}}>
            <label>{'Font Size'}</label>
          </div>
          <div style={{width:'50%'}}>
            <NumberInput
              value={overlay_text_state.font_size}
              onChange={onChangeOverlayTextFontSize} />
          </div>
        </div>
        <div
          className='display:flex flex:wrap alignItems:center'
          style={{marginTop:'1rem'}}>
          <div style={{width:'50%',padding:'.5rem 0 .125rem 0'}}>
            <label>{'Color'}</label>
          </div>
          <div style={{width:'50%'}}>
            <TextInput
              value={overlay_text_state.color}
              onChange={onChangeOverlayTextColor} />
          </div>
        </div>
        <div style={controlSectionStyle}>
          <div style={{padding:'.5rem 0 .125rem 0'}}>
            <label>{'Family'}</label>
          </div>
          <div>
            <SelectMenu
              current={overlay_text_state.font}
              onChange={onChangeOverlayTextFont}
              options={fonts} />
          </div>
        </div>
        <div style={{
          display:'flex'
          , alignItems:'center'
        }}>
          <div>
            <input
              id='bold-checkbox'
              style={{marginRight:'.375rem'}}
              type='checkbox'
              value={overlay_text_state.bold}
              onChange={onChangeOverlayTextBold} />
            <label htmlFor='bold-checkbox'>{'Bold'}</label>
          </div>
          <div>
            <input
              id='italic-checkbox'
              style={{marginLeft:'1rem',marginRight:'.375rem'}}
              type='checkbox'
              value={overlay_text_state.italic}
              onChange={onChangeOverlayTextItalic} />
            <label htmlFor='italic-checkbox'>{'Italic'}</label>
          </div>
        </div>
      </>
    }
    <div>
      <h2>{'Waveform Settings'}</h2>
      <div className='display:flex flex:wrap alignItems:center'>
        <div style={{width:'50%'}}>
          <label>{'Color'}</label>
        </div>
        <div style={{width:'50%'}}>
          <TextInput
            value={waveform_state.color}
            onChange={onChangeWaveformColor} />
        </div>
      </div>
      <div
        style={{marginTop:'1rem'}}
        className='display:flex flex:wrap alignItems:center'>
        <div style={{width:'50%'}}>
          <label>{'Y Offset'}</label>
        </div>
        <div style={{width:'50%'}}>
          <NumberInput
            value={waveform_state.translate_y}
            onChange={onChangeWaveformTranslateY} />
        </div>
      </div>
    </div>
    <div>
      <h2>{'Progress Bar Settings'}</h2>
      <div className='display:flex flex:wrap alignItems:center'>
        <div style={{width:'50%'}}>
          <label>{'Color'}</label>
        </div>
        <div style={{width:'50%'}}>
          <TextInput
            value={progress_bar_state.color}
            onChange={onChangeProgressBarColor} />
        </div>
      </div>
      <div
        style={{margin:'1rem 0'}}
        className='display:flex flex:wrap alignItems:center'>
        <div style={{width:'50%'}}>
          <label>{'Translate Y'}</label>
        </div>
        <div style={{width:'50%'}}>
          <NumberInput
            value={progress_bar_state.translate_y}
            onChange={onChangeProgressBarTranslateY} />
        </div>
      </div>
      <div
        style={{margin:'1rem 0'}}
        className='display:flex flex:wrap alignItems:center'>
        <div style={{width:'50%'}}>
          <label>{'Scale Y'}</label>
        </div>
        <div style={{width:'50%'}}>
          <NumberInput
            min={0} max={1} step={.1}
            value={progress_bar_state.scale_y}
            onChange={onChangeProgressBarScaleY} />
        </div>
      </div>
      <div
        style={{margin:'1rem 0'}}
        className='display:flex flex:wrap alignItems:center'>
        <div style={{width:'50%'}}>
          <label>{'Width'}</label>
        </div>
        <div style={{width:'50%'}}>
          <NumberInput
            value={progress_bar_state.width}
            onChange={onChangeProgressBarWidth} />
        </div>
      </div>
    </div>
  </div>;
}
