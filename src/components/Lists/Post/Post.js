import React from 'react';

//style
import './Post.css';

const post = (props) => {
  return (
    <div className='posts-list' onClick={props.clicked}>
      <h3>{props.title}</h3>
      <p>{props.body.slice(0, 25)}...</p>
    </div>
  )
}

export default post;
