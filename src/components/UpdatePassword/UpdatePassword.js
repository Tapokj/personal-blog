import React, { PureComponent } from 'react';

import { auth } from '../../firebase/index.js';
//styles
import './UpdatePassword.css';


class UpdatePassword extends PureComponent {

  state = {
    passwordOne: '',
    passwordTwo: '',
    error: null
  }

  updatePasswordHandler = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  updateSubmitHandler = e => {
    e.preventDefault();

    auth.doPasswordUpdate(this.state.passwordOne)
      .then(() => this.props.history.push('/'))
      .catch(error => this.state({ error }))
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    let btnUpdate = <button type='submit' className='btn btn-success'>Reset</button>

    if  (passwordOne !== passwordTwo || passwordOne === '' || passwordTwo === '' ) {
      btnUpdate = <button disabled type='submit' className='btn btn-success'>Reset</button>
    }

    return (
      <div className='update-password'>
        <form onSubmit={this.updateSubmitHandler}>
          <div className="container col-md-6 update-form">
            {error ? <div className="alert alert-danger">{error.message}</div> : null}
            <h3>Update Password</h3>
            <div className="form-control-group">
              <input
                onChange={this.updatePasswordHandler}
                name='passwordOne'
                value={passwordOne}
                className='form-control'
                type="password"
                placeholder='Your Password'/>
              <input
                onChange={this.updatePasswordHandler}
                name='passwordTwo'
                value={passwordTwo}
                className='form-control'
                type="password"
                placeholder='Your Password'/>
            </div>
            {btnUpdate}
          </div>
        </form>
      </div>
    );
  }

}

export default UpdatePassword;
