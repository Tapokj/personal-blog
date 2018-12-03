import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './LatestPost.css';

class LatestPost extends Component {
  render(){
    const { title, body, image } = this.props;
    return (
      <div className='latest-post'>
        <img src={image} alt="OpenImage"/>
        <h2>{title}</h2>
        <div>{ReactHtmlParser(body.slice(0, 60) + '...')}</div>
      </div>
    )
  }
}


export default LatestPost;
