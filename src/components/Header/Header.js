import React from 'react';
//components
import { NavLink }   from 'react-router-dom';
import { adminData } from '../../firebase/adminData';
import SignOut       from '../SignOut/SignOut'
//styles
import './Header.css';

const header = props => {
  return (
    <header className='header'>
      <nav>
        <ul className='header-list'>
          {/* protect links from non/auth users */}
            <div className='right-list'>
              <li><NavLink exact activeClassName="selected" to='/'>All Posts</NavLink></li>
              {/* new post only active when users has admin roots */}
              {props.emailData === adminData.email  ? <li><NavLink activeClassName="selected" to='/new-post'>New Post</NavLink></li> : null }
            </div>
            <div className='left-list'>
              {props.emailData  ? <li><NavLink activeClassName="selected" to='/auth/update-pass/'>Change Password</NavLink></li>
                : <li><NavLink activeClassName="selected" to='/auth/sign-in'>Sign in</NavLink></li>}
              {props.emailData  ? <li><SignOut/></li>
                : <li><NavLink activeClassName="selected" to='/auth/sign-up'>Sign up</NavLink></li>}
            </div>
        </ul>
      </nav>
    </header>
  );
};

export default header;
