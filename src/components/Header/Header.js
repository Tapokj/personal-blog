import React, { Component } from 'react';
//components
import { NavLink }   from 'react-router-dom';
import { adminData } from '../../firebase/adminData';
import SignOut       from '../SignOut/SignOut';
//styles
import './Header.css';

class Header extends Component {
  state = {
    activeBurger: false
  }

  activeHandler = () => {
    this.setState(prevState => ({
      activeBurger: !prevState.activeBurger
    }))
  }

  render() {
    return (
      <header className='header'>
         <nav>
          {/* mobile menu -- visible only screen lower than 701px width */}
          <ul className='mobile-menu'>
            <div className={this.state.activeBurger ? 'open' : null} onClick={this.activeHandler} id="burger-menu">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div onClick={this.activeHandler} className={`menu-mob ${this.state.activeBurger ? 'activeBurgerMenu' : 'disableMenu'}`}>
              <li><NavLink exact activeClassName="selected" to='/'>All Posts</NavLink></li>
              {this.props.emailData === adminData.email  ? <li><NavLink activeClassName="selected" to='/new-post'>New Post</NavLink></li> : null }
              {this.props.emailData  ? <li><NavLink activeClassName="selected" to='/auth/update-pass/'>Change Password</NavLink></li>
                : <li><NavLink activeClassName="selected" to='/auth/sign-in'>Sign in</NavLink></li>}
              {this.props.emailData  ? <li><SignOut/></li>
                : <li><NavLink activeClassName="selected" to='/auth/sign-up'>Sign up</NavLink></li>}
            </div>
          </ul>
          <ul className='header-list'>
            {/* protect links from non/auth users */}
              <div className='right-list'>
                <li><NavLink exact activeClassName="selected" to='/'>All Posts</NavLink></li>
                {/* new post only active when users has admin roots */}
                {this.props.emailData === adminData.email  ? <li><NavLink activeClassName="selected" to='/new-post'>New Post</NavLink></li> : null }
              </div>
              <div className='left-list'>
                {this.props.emailData  ? <li><NavLink activeClassName="selected" className='change-pass' to='/auth/update-pass/'>Change Password</NavLink></li>
                  : <li><NavLink activeClassName="selected" to='/auth/sign-in'>Sign in</NavLink></li>}
                {this.props.emailData  ? <li><SignOut/></li>
                  : <li><NavLink activeClassName="selected" to='/auth/sign-up'>Sign up</NavLink></li>}
              </div>
          </ul>
        </nav>
      </header>
    );
  }
};

export default Header;
