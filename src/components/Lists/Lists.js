import React, { Component } from 'react';

import axios from 'axios';

import FullPost from '../FullPost/FullPost'
import Post from './Post/Post';
import Spinner from '../UI/Spinner/Spinner';
import ActionButton from '../UI/ActionButton/ActionButton';
import AuthUserContext from '../../hoc/auth/AuthUserContext';
import Error from '../Error/Error';

import { adminData } from '../../firebase/adminData';
//React Router...
import { Link, Route } from 'react-router-dom';

import './Lists.css';

//Component for render all list generally
class Lists extends Component {

  state = {
    posts: [],
    certainPost: null,
    loading: true,
    error: null
  }

  componentDidMount(){
      axios.get('https://blog-bc21c.firebaseio.com/posts.json')
        .then(response => {
          // Unboxing every props and push it to array
          let newArray = []
          for (let element in response.data) {
            //copy and changing data
            newArray.push({
              ...response.data[element],
              id: element
            })
          };
          //change my state
          this.setState({
            posts: newArray.reverse(),
            loading: false
          });
     })
     .catch(error => this.setState({error}))
  };

  handlerClick = id => {
    this.setState({
      certainPost: id
    })
  }

  handleActionBtn = () => {
    this.props.history.push('/new-post')
  }

  render() {
    // I render all my posts in state
    let postsList = <Spinner/>

    if (this.state.error) {
      postsList = <Error errorMess={this.state.error.message}/>
    }

    if (!this.state.loading) {
      postsList = this.state.posts.map(element => {
        return (
          <Link key={element.id} to={`/posts/${element.id}`}>
            <Post
              clicked={() => this.handlerClick(element.id)}
              title={element.title}
              body={element.body}
              loading={this.state.loading}
              author={element.author} />
          </Link>
        )
      });
    }

    return (
      // in github repo adminData file will'be not attached. Add personal email and make sure that code work correctly
      <AuthUserContext.Consumer>
          {/* we are rendering action button for adding new post only when user has admin roots */}
          {context => context.state.email === adminData.email ? (
            <div className='container col-md-6 list-block'>
                <Route exact path='/post/:id' component={FullPost} />
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
              {postsList}
            </div>
          )}
      </AuthUserContext.Consumer>
    );
  }
}


export default Lists;
