import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

//components
import FullPost from './components/FullPost/FullPost';
import NewPost  from './components/NewPost/NewPost';
import Lists    from './components/Lists/Lists';
import Header   from './components/Header/Header';
import SignIn   from './components/SignIn/SignIn';
import SignUp   from './components/SignUp/SignUp';
import ForgetPassword   from './components/ForgetPassword/ForgetPassword';
import UpdatePassword   from './components/UpdatePassword/UpdatePassword';
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//high order component && Context API
import withAuthentication from './hoc/auth/withAuthentication';
import AuthUserContext    from './hoc/auth/AuthUserContext.js';

class App extends Component {
  render() {
    //Routes Protection

    return (
      <BrowserRouter>
        <AuthUserContext.Consumer>
          {context => (
            <div className="App">
              <Header emailData={context.state.email} />
                <Route exact path='/posts/:id' component={FullPost} />
                <div className="container">
                  <Switch>
                    <Route exact path='/'          component={Lists}    />
                    {/* Here we protect our route by using authUser which we get from Provider */}
                    {context.state.authUser  ? <Route exact path='/new-post/'    component={NewPost}/> : null  }
                    {!context.state.authUser ? <Route exact path='/auth/sign-in' component={SignIn} /> : null  }
                    {!context.state.authUser ? <Route exact path='/auth/sign-up' component={SignUp} /> : null  }
                    {!context.state.authUser ? <Route exact path='/auth/forget-pass/' component={ForgetPassword} /> : null}
                    {context.state.authUser  ? <Route exact path='/auth/update-pass/' component={UpdatePassword} /> : null}
                  </Switch>
                </div>
            </div>
          )}
        </AuthUserContext.Consumer>
      </BrowserRouter>
    );
  }
}

export default withAuthentication(App);
