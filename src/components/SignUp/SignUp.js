import React, { PureComponent } from 'react';

import { auth, db } from '../../firebase/index.js';

import './SignUp.css';

class SignUp extends PureComponent {

  state = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: ''
  }

  onChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmitForm = e => {
    e.preventDefault();
    const { username, email, passwordOne } = this.state;

    auth.doCreateUserWithEmailPassword(email, passwordOne)
      .then(authUser => {

        //Create a user in my own accesible Firebase
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.props.history.push('/')
          })
          .catch(error => {
            this.setState({ error })
          })
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    let btn = <button type='submit' className='btn btn-success'>Sign in</button>

    if (passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '') {
      btn = <button disabled className='btn btn-success'>Sign in</button>
    }

    return (
      <div className='sign-up-form'>
        <form onSubmit={this.onSubmitForm}>
          <div className="container col-md-6 form-signup-inp">
            {error ? <div className='alert alert-danger'>{error.message}</div> : null}
            <h3>Sign Up</h3>
            <div className='form-control-group'>
              <input
                value={username}
                onChange={this.onChangeForm}
                name='username' className='form-control'
                placeholder='Username'
                type="text"/>
              <input
                value={email}
                onChange={this.onChangeForm}
                name='email'
                className='form-control'
                placeholder='Your E-Mail'
                type="text"/>
              <input
                value={passwordOne}
                onChange={this.onChangeForm}
                name='passwordOne'
                className='form-control'
                type="password"
                placeholder='Your Password'/>
              <input
                value={passwordTwo}
                onChange={this.onChangeForm}
                name='passwordTwo'
                className='form-control'
                type="password"
                placeholder='Password Confirmation'/>
            </div>
            {btn}
          </div>
        </form>
      </div>
    );
  }

}

export default SignUp;
