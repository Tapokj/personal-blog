import React, { PureComponent } from 'react';

//components
import Spinner      from '../UI/Spinner/Spinner';
import ActionButton from '../UI/ActionButton/ActionButton';
import Modal        from '../UI/Modal/Modal';
import {adminData}  from '../../firebase/adminData';
import Error        from '../Error/Error';

import firebase from 'firebase/app';
import 'firebase/storage';
//context
import AuthUserContext    from '../../hoc/auth/AuthUserContext';
//packages
import axios from 'axios';
//styles
import './FullPost.css';

class FullPost extends PureComponent {

  state = {
    fullPost: null,
    loading: true,
    show: false,
    error: null,
    image: '',
    loadImage: true
  }

  //loading post by id
  componentDidMount(){
    if (this.props.match.params.id) {
      axios.get(`https://blog-bc21c.firebaseio.com/posts/${this.props.match.params.id}.json`)
        .then(response => {
          this.setState({
            fullPost: response.data,
            loading: false
          })
        })
        .then(() => {
          //uploading image
          const storage    = firebase.storage();
          const storageRef = storage.ref();
          const spaceRef   = storageRef.child(`images/${this.state.fullPost.image}`)
          //our image we get from images name in state
          spaceRef.getDownloadURL().then(url => this.setState({image: url, loadImage: false}))
          //handle error in image
          .catch(error => this.setState({ error }))
        })
        //handle error in data
        .catch(error   => this.setState({ error }))
    }
  }
  //show modal
  deleteModalHandler = () => {
    this.setState(prevState => {
      return {
        show: !prevState.show
      }
    })
  }
  //delete post by id
  deletePost = () => {
    axios.delete(`https://blog-bc21c.firebaseio.com/posts/${this.props.match.params.id}.json`)
      .then(() => {
        this.props.history.push('/')
      })
  }

  render() {
    let post = <Spinner/>

    if ( this.state.error ) {
      post = <Error errorMess={this.state.error.message}/>
    }

    if (!this.state.loading) {
      post = (
        <div className='full-post'>
          {this.state.loadImage ? <Spinner/> : <img src={this.state.image} alt='Start Screen' width="100%" height="100%"/>}
          <div className="cointainer col-md-8 justify-content-center">
          <h2 className='text-center'>{this.state.fullPost.title}</h2>
          <p className='body-text'>{this.state.fullPost.body}</p>
          <div className='container row auth-date'>
            <p className='author'><span>By</span> {this.state.fullPost.author}</p>
            <p className='date'>{this.state.fullPost.date}</p>
          </div>
          </div>
        </div>
      )
    }

    return (
      <AuthUserContext.Consumer>
          {context => context.state.email === adminData.email ? (
            <React.Fragment>
              {post}
              <ActionButton
                clicked={this.deleteModalHandler}
                backColor='#dc3545'
                fontSize='20px'
                color='white'
                clazz='trash-alt'
               />
            <Modal clickBack={this.deleteModalHandler} show={this.state.show}>
              <h4>Are you sure?</h4>
              <p>If you delete this post. Return it will be impossible</p>
              <div className="container row">
                <button onClick={this.deletePost} className='btn btn-success'>DELETE</button>
                <button onClick={this.deleteModalHandler} className='btn btn-danger ml-1'>DECLINE</button>
              </div>
            </Modal>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {post}
          </React.Fragment>
        )}
      </AuthUserContext.Consumer>

    )
  }
}

export default FullPost;
