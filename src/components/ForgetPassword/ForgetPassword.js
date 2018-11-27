import React, { PureComponent } from 'react';

import { auth } from '../../firebase/index.js';

import './ForgetPassword.css';

class ForgetPassword extends PureComponent {

  state = {
    email: '',
    error: null
  }

  resetPassHandler = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  submitResetHandler = e => {
    e.preventDefault();

    auth.doPasswordReset(this.state.email)
      .then(() => this.props.history.push('/'))
      .catch(error => this.setState({ error }))
  }

  render() {
    const isValid = this.state.email === ''

    return (
      <div className='forget-password'>
        <form onSubmit={this.submitResetHandler}>
          <div className="container col-md-6 reset-form">
            {this.state.error ? <div className="alert alert-danger">{this.state.error.message}</div> : null}
            <h3>Reset Password</h3>
            <div className="form-control-group">
              <input
                onChange={this.resetPassHandler}
                name='email'
                value={this.state.email}
                className='form-control'
                type="email"
                placeholder='Your Email'/>
            </div>
            <button disabled={isValid} type='submit' className='btn btn-success'>Reset</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ForgetPassword;
