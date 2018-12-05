import React, { Component } from 'react';

import axios from 'axios';

import { Editor }      from '@tinymce/tinymce-react';
import AuthUserContext from '../../hoc/auth/AuthUserContext';
import firebase        from 'firebase/app';
import 'firebase/storage';
//styles
import './EditPost.css';

class EditPost extends Component {
  state = {
    title : '',
    body  : '',
    date  : '',
    author: '',
    image : ''
  }

  componentDidMount(){
    if ( this.props.match.params.id ) {
      axios.get(`https://blog-bc21c.firebaseio.com/posts/${this.props.match.params.id}.json`)
        .then(response => {
          this.setState({
            id    : response.data.id,
            title : response.data.title,
            body  : response.data.body,
            date  : response.data.title,
            author: response.data.author
          })
        })
        .catch(error => this.setState({ error }))
    }
  }

  changeHandlerEdit = e => {
    this.setState({
      [e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value,
      body: e.target.id === 'editor' ? e.target.getContent() : null,
      id: this.state.id,
      date: new Date()
    })
  };

  submitHandlerEdit = e => {
    e.preventDefault();
    const putData = {
      ...this.state,
      image: this.state.image.name
    }
    //Change Data in Firebase Storage
    axios.put(`https://blog-bc21c.firebaseio.com/posts/${this.props.match.params.id}.json`, putData)
      .then(response => {
        const storage    = firebase.storage()
        const storRef    = storage.ref(`images/${this.state.image.name}`)
        const firstFile  = this.state.image
        storRef.put(firstFile);
      })
      .then(() => this.props.history.push('/'))
  }


  render() {
    return (
      <div className='edit-post container col-md-8'>
        <AuthUserContext.Consumer>
          {authUser => (
            <form onSubmit={this.submitHandlerEdit} className='form-group-control form-editor'>
              <input className='form-control'
                type="file"
                name='image'
                onChange={this.changeHandlerEdit} />
              <input
                name='title'
                value={this.state.title}
                onChange={this.changeHandlerEdit}
                className='form-control'
                type="text"
                placeholder='Title'/>
              <input
                name='author'
                value={this.state.author}
                onChange={this.changeHandlerEdit}
                className='form-control'
                type="text"
                placeholder='Author'/>
              <Editor
                value={this.state.body}
                id='editor'
                apiKey='8sgud0cgj04npj8vm8l4oammowc0k0lwb17907odrnv2eo72'
                cloudChannel='stable'
                init={{
                  plugins: 'link image code lists',
                  toolbar: ' | fontselect | undo redo | bold italic | alignleft aligncenter alignright | numlist | image ',
                  image_caption: true,
                  font_formats: 'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',
                  selector: 'textarea'
                }}
                onChange={this.changeHandlerEdit}
              />
              <button id="formsubm" className='btn btn-danger'>Submit</button>
            </form>
          )}
        </AuthUserContext.Consumer>
      </div>
    );
  }

}

export default EditPost;
