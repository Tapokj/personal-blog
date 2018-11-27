import React from 'react';

const error = (props) => (
    <div className="container text-center">
      <p style={{fontSize: '120px', color: 'black'}}><i class="fab fa-optin-monster"></i></p>
      <p>Мне жаль, кажется данные шли, но не пришли. Но не беспокойся, я уже выслал поисковую операцию</p>
      <p>Причина ошибки: {props.errorMess}</p>
    </div>
)

export default error;
