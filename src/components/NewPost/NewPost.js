import React, { PureComponent } from 'react';
//packages
import uuid  from 'uuid';
import axios from 'axios';
//context & API
import { Editor } from '@tinymce/tinymce-react';
import AuthUserContext from '../../hoc/auth/AuthUserContext';
import firebase        from 'firebase/app';
import 'firebase/storage';
//styles
import './NewPost.css';

class NewPost extends PureComponent {

  state = {
      id: '',
      title: '',
      body: '',
      date: '',
      author: '',
      image: ''
  }
  //change functionality
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value,
      body: e.target.id === 'editor' ? e.target.getContent() : null,
      id: uuid(),
      date: new Date()
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
        storRef.put(firstFile);

      })
      .then(() => {
        this.props.history.push('/')
      })
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <form onSubmit={this.submitHandler} className='form-group-control form-editor'>
            <input className='form-control'
              type="file"
              name='image'
              onChange={this.changeHandler} />
            <input
              name='title'
              value={this.state.title}
              onChange={this.changeHandler}
              className='form-control'
              type="text"
              placeholder='Title'/>
            <input
              name='author'
              value={this.state.author}
              onChange={this.changeHandler}
              className='form-control'
              type="text"
              placeholder='Author'/>
            <Editor
              id='editor'
              apiKey='8sgud0cgj04npj8vm8l4oammowc0k0lwb17907odrnv2eo72'
              cloudChannel='dev'
              init={{
                plugins: 'link image code lists',
                toolbar: ' | fontselect | undo redo | bold italic | alignleft aligncenter alignright | numlist | image ',
                image_caption: true,
                font_formats: 'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',
                selector: 'textarea'
              }}
              onChange={this.changeHandler}
            />
            <button id="formsubm" className='btn btn-danger'>Submit</button>
          </form>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default NewPost;
