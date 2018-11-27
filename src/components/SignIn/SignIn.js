import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';
import { auth } from '../../firebase/index.js';

//styles
import './SignIn.css';

class SignIn extends PureComponent {

  state = {
    email: '',
    password: '',
    error: null
  }

  changeSignHandler = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  onSignSubmit = e => {
    const { email, password } = this.state;

    e.preventDefault();

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => this.props.history.push('/'))
      .catch(error => this.setState({ error }))
  }

  render() {
    const { email, password, error } = this.state;

    let btnSign = <button type='submit' className='btn btn-success'>Sign in</button>

    if ( email === '' || password === '' ) {
      btnSign = <button disabled type='submit' className='btn btn-success'>Sign in</button>
    }

    return (
      <div className='sign-in-form'>
        <form onSubmit={this.onSignSubmit}>
          <div className="container col-md-6 form-sign-inp">
            {error ? <div className="alert alert-danger">{error.message}</div> : null}
            <h3>Sign in</h3>
            <div className='form-control-group'>
              <input
                value={email}
                onChange={this.changeSignHandler}
                name='email'
                className='form-control'
                placeholder='Your E-Mail'
                type="email"/>
              <input
                value={password}
                onChange={this.changeSignHandler}
                name='password'
                className='form-control'
                type='password'
                placeholder='Your Password'/>
            </div>
            <div>
              {btnSign}
              <p className='ml-3 link-signup'>Don't have an account? <Link to='/auth/sign-up'>Sign Up</Link></p>
              <p className='ml-3 link-forget-pass'><Link to='/auth/forget-pass/'>Forget Password?</Link></p>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

export default SignIn;
