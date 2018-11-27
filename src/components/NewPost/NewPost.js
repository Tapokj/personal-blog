import React, { PureComponent } from 'react';

import uuid from 'uuid';
import axios from 'axios';

import AuthUserContext from '../../hoc/auth/AuthUserContext';
import firebase from 'firebase/app';
import 'firebase/storage';
//styles
import './NewPost.css';

class NewPost extends PureComponent {

  state = {
      id: '',
      title: '',
      body: '',
      date: '',
      hash: '',
      author: '',
      image: ''
  }
  //change functionality
  changeHandler = e => {

    this.setState({
      [e.target.name] : e.target.name === 'image' ? e.target.files[0] : e.target.value,
      id: uuid(),
      date: new Date().toDateString()
    })
  };
  // submit functionality
  submitHandler = (e) => {
    e.preventDefault()
    const postData = {
      ...this.state,
      image: this.state.image.name
    }

    axios.post('https://blog-bc21c.firebaseio.com/posts.json', postData)
      .then(response => {
        const storage    = firebase.storage()
        const storRef    = storage.ref(`images/${this.state.image.name}`)
        const firstFile  = this.state.image
        const uploadTask = storRef.put(firstFile);
      })
      .then(() => {
        this.props.history.push('/')
      })
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <form onSubmit={this.submitHandler}>
            <div className='form-group form-area'>
              <input className='form-control'
                type="file"
                name='image'
                onChange={this.changeHandler} />
              <input name='title'
                value={this.state.title}
                onChange={this.changeHandler}
                className='form-control'
                type="text"
                placeholder='Title'/>
              <textarea
                name='body'
                value={this.state.body}
                onChange={this.changeHandler}
                rows='10'
                className='form-control'
                placeholder='Body'>
              </textarea>
              <input
                name='hash'
                value={this.state.hash}
                onChange={this.changeHandler}
                className='form-control'
                type="text"
                placeholder='# Hash'/>
              <input
                name='author'
                value={this.state.author}
                onChange={this.changeHandler}
                className='form-control'
                type="text"
                placeholder='Author'/>
            </div>
            <button className='btn btn-danger'>Submit</button>
          </form>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default NewPost;
