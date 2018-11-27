import React from 'react';

import { auth } from '../../firebase/index.js';
import './SignOut.css';

const signOut = () => {
  return (
    <button className='logout-btn' type='button' onClick={auth.doSignOut}>Sign Out</button>
  )
}

export default signOut;
