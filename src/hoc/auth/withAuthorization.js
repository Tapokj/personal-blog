import React, { Component } from 'react';

import { withRouter }  from 'react-router-dom';
import { firebase }    from '../../firebase/index.js';
import AuthUserContext from './AuthUserContext';

const withAuthorization = (authCondition) => (WrappedComponent) => {
  class WithAuthorization extends Component {

    componentDidMount(){
        this.listener = firebase.auth.onAuthStateChanged(authUser => {
          if ( !authCondition(authUser) ) {
            this.props.history.push('/');
          }
        })
    }

    componentWillUnmount(){
      this.listener();
    }

    render(){
      // Render Component
      return  (
        <AuthUserContext.Consumer>
          {authUser => authUser ? <WrappedComponent {...this.props} /> : null}
        </AuthUserContext.Consumer>
      )
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;
