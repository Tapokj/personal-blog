import React from 'react';

import './Modal.css';
import Backdrop from '../Backdrop/Backdrop.js';

const modal = (props) => {
  return (
    <div>
        <Backdrop clicked={props.clickBack} toggler={props.show}/>
        <div className='modalWindow' style={{
          'transform': props.show ? 'scale(0.8)' : null,
          'opacity'  : props.show ? '1' : '0'
        }}>
          <div className="content-modal">
            {props.children}
          </div>
        </div>
    </div>

  )
}

export default modal;
