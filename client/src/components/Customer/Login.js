import React, {useState} from 'react'
import CustomerAuth from '../../containers/CustomerAuth'
// import '../styles/Login.css'

const Login = () => {
 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const customerAuth = CustomerAuth.useContainer()


  const loginHandler = () => {
    const data = {
      email,
      password
    }
    console.log(data)

  }


  return (
    <div className='login-container'>
      <input className='input' placeholder='Email' type='text' name='email' onChange = {(e)=>setEmail(e.target.value)}/>
      <input className='input' placeholder='Password' type='text' name='password' onChange = {(e)=>setPassword(e.target.value)}/>
      <button className='login-button' onClick={() => loginHandler()}>Customer Login</button>
    </div>
  )
}

export default Login