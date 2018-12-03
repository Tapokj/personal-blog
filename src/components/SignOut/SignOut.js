import React, { Component } from 'react';

import { auth } from '../../firebase/index.js';
import { withRouter } from 'react-router-dom'
import './SignOut.css';

class SignOut extends Component {
  signOut = () => {
    auth.doSignOut()
      .then(() => {
        this.props.history.push('/')
      })
  }

  render(){
    return (
      <button className='logout-btn' type='button' onClick={this.signOut}>Sign Out</button>
    )
  }
}

export default withRouter(SignOut);
