import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/Login'
import './index.css';

ReactDOM.render(
  <div>
    <div className='main-container'>
      <div className='nav-bar'>
        <div style={{display: 'flex', width: '20%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly'}}>
          <div>Login</div>
          <div>Register</div>
        </div>
      </div>
      <Login />
    </div>
  </div>,
  document.getElementById('root')
);
