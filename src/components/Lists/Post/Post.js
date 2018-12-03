import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

//style
import './Post.css';

class Post extends Component {
  render(){
    return (
      <div className='posts-list'>
        <h3>{this.props.title}</h3>
        <div>{ReactHtmlParser(this.props.body.slice(0, 60) + '...')}</div>
      </div>
    )
  }

}

export default Post;
