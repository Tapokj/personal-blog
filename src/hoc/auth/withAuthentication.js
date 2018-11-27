import React, { Component } from 'react';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase/index.js';

const withAuthentication = (WrappedComponent) =>
  class WithAuthentication extends Component {

    state = {
      authUser: null,
      email: null
    };

    componentDidMount() {
      this.listener = firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });

      this.listener = firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ email: authUser.email })
          : this.setState({ email: null })
      })
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {

      return (
        <AuthUserContext.Provider value={{state: this.state}}>
          <WrappedComponent {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

export default withAuthentication;
