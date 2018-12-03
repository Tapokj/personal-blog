import React, { Component } from 'react';

import axios from 'axios';

import FullPost   from '../FullPost/FullPost'
import LatestPost from './LatestPost/LatestPost';
import Post       from './Post/Post';
import Spinner    from '../UI/Spinner/Spinner';

import ActionButton    from '../UI/ActionButton/ActionButton';
import AuthUserContext from '../../hoc/auth/AuthUserContext';
import Error           from '../Error/Error';

import { adminData }   from '../../firebase/adminData';
import firebase        from 'firebase/app';
import 'firebase/storage';
//React Router...
import { Link, Route } from 'react-router-dom';

import './Lists.css';

//Component for render all list generally
class Lists extends Component {

  state = {
    posts: [],
    loading: true,
    error: null,
    latestPost: null,
    images: []
  }

  componentDidMount(){
    // The code block is responsible for loading posts and images
      axios.get('https://blog-bc21c.firebaseio.com/posts.json')
        .then(response => {
          const storage    = firebase.storage()
          const storageRef = storage.ref()
          // I put next code in promise because we need to call setState only one times
          return new Promise (resolve => {
            // create consts with array and data
            const newArray = []
            const data     = response.data
            // Unboxing every props and push it to array
            for ( let element in data ) {
              //firebase function for downloading images
              storageRef.child(`images/${data[element].image}`).getDownloadURL()
                .then(url => {
                  // I make a copy of our response and give new properties for each element such as id and image URL
                  newArray.push({
                    ...response.data[element],
                    id: element,
                    imageURL: url
                  })
                  // Make resolve only when length of newArray will'be equal to data response
                  if ( Object.keys(data).length === newArray.length ) {
                    resolve(newArray)
                  }
                })
            }
          })
          // SetState works only one times! I solved this problem.
          .then((newArray) => {
            // Sort the order of posts by date
            newArray.sort((a, b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime()
            })
            this.setState({
              posts: newArray.reverse().slice(2),
              loading: false,
              latestPost: newArray.slice(0, 2)
            })
          })
          .catch(error => this.setState({ error }))
      })
  };

  handleActionBtn = () => {
    this.props.history.push('/new-post')
  }

  render() {
    // I render all my posts in state
    let postsList  = <Spinner/>
    let latestPost = <Spinner/>

    if (this.state.error) {
      postsList = <Error errorMess={this.state.error.message}/>
    }
    // Post List Output
    if (!this.state.loading) {
      postsList = this.state.posts.map(element => {
        return (
          <Link key={element.id} to={`/posts/${element.id}`}>
            <Post
              title={element.title}
              body={element.body}
              loading={this.state.loading}
              author={element.author} />
          </Link>
        )
      });
    }
    // Latest Post List Output
    if (!this.state.loading) {
      latestPost = this.state.latestPost.map(post => {
        return (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <LatestPost
              image={post.imageURL}
              title={post.title}
              body={post.body}/>
          </Link>
        )
      })
    }

    return (
      // in github repo adminData file will'be not attached. Add personal email and make sure that code work correctly
      <AuthUserContext.Consumer>
          {/* we are rendering action button for adding new post only when user has admin roots */}
          {context => context.state.email === adminData.email ? (
            <div className='container col-md-12 list-block'>
                <Route exact path='/post/:id' component={FullPost} />
              <div className="list-latest col-md-12">
                  {latestPost}
              </div>
              {postsList}
              {/* Action button for adding new post */}
              <ActionButton
                clicked={this.handleActionBtn}
                clazz='feather-alt'
                backColor='#4BB543'
                color='white'
                sizeFont='20px'
              />
            </div>
          // if email just exist - return page without action button
        ) : (
            <div className='container col-md-6 list-block'>
                <Route exact path='/post/:id' component={FullPost} />
              {latestPost}
              {postsList}
            </div>
          )}
      </AuthUserContext.Consumer>
    );
  }
}


export default Lists;
