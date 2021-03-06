import React, { PureComponent } from 'react';

//components
import Spinner      from '../UI/Spinner/Spinner';
import ActionButton from '../UI/ActionButton/ActionButton';
import Modal        from '../UI/Modal/Modal';
import {adminData}  from '../../firebase/adminData';
import Error        from '../Error/Error';

import ReactHtmlParser from 'react-html-parser';
import { Link }        from 'react-router-dom';

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
        <AuthUserContext.Consumer>
          {context => context.state.email === adminData.email ?  (
            <React.Fragment>
              <div className='full-post'>
                <div className='img-wrapper'>
                  {this.state.loadImage ? <Spinner/> : <img src={this.state.image} alt='Start Screen' width="100%" height="100%"/>}
                </div>
                <div className="container col-md-8 justify-content-center">
                  <h2 className='text-center title-post'>{this.state.fullPost.title}</h2>
                  <div>{ReactHtmlParser(this.state.fullPost.body)}</div>
                  <div className='container row auth-date'>
                    <p className='author'><span>By</span> {this.state.fullPost.author}</p>
                    <p className='date'>{new Date(this.state.fullPost.date).toLocaleDateString()}</p>
                    <Link className='edit-link' to={`/edit-post/${this.props.match.params.id}`}>Edit</Link>
                  </div>
                </div>
              </div>
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
            <div className='full-post'>
              {this.state.loadImage ? <Spinner/> : <img src={this.state.image} alt='Start Screen' width="100%" height="100%"/>}
              <div className="cointainer col-md-8 justify-content-center">
                <h2 className='text-center title-post'>{this.state.fullPost.title}</h2>
                <div>{ReactHtmlParser(this.state.fullPost.body)}</div>
                <div className='container row auth-date'>
                  <p className='author'><span>By</span> {this.state.fullPost.author}</p>
                  <p className='date'>{new Date(this.state.fullPost.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
        </AuthUserContext.Consumer>

      )
    }

    return (
      <React.Fragment>
        {post}
      </React.Fragment>
    )
  }
}

export default FullPost;
