import React, {useState} from 'react'
import './Login.css'

const Login = ({type, auth}) => {
 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  console.log(localStorage.getItem("customer-auth"))
  const loginHandler = (e) => {
    const data = {
      email,
      password
    }
    
    console.log(data)
    auth.login(data)
    e.preventDefault()
  }

  return (
    <div className='login-container'>
      <input className='input' placeholder='Email' type='text' name='email' onChange = {(e)=>setEmail(e.target.value)}/>
      <input className='input' placeholder='Password' type='password' name='password' onChange = {(e)=>setPassword(e.target.value)}/>
      <button className='login-button' style={{textTransform:'capitalize'}} onClick={(e) => loginHandler(e)}>{type} Login</button>
    </div>
  )
}

export default Login