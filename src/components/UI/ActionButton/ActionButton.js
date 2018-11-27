import React from 'react';

import './ActionButton.css';

const actionButton = props => {
  return (
    <div
      onClick={props.clicked}
      style={{'backgroundColor': props.backColor}}
      className='action-button'>
      <i
        style={{
          'color': props.color,
          'fontSize': props.sizeFont
        }}
        className={`fas fa-${props.clazz}`}></i>
    </div>
  )
}

export default actionButton;
