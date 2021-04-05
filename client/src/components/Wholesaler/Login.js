import React from 'react'
// import '../styles/Login.css'

const WholesalerLogin = () => {
  const loginHandler = () => {
    console.log()
  }

  return (
    <div className='login-container'>
      <input className='input' placeholder='Email' type='text' name='email'/>
      <input className='input' placeholder='Password' type='text' name='password'/>
      <button className='login-button' onClick={() => loginHandler}>Wholesaler Login</button>
    </div>
  )
}

export default WholesalerLogin