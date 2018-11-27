import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
  return (
    props.toggler ? <div onClick={props.clicked} className='backdrop'></div> : null
  )
}

export default backdrop
