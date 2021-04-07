import React, {useState} from 'react'

const Login = ({type, auth}) => {
 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const loginHandler = () => {
    const data = {
      email,
      password
    }
    
    console.log(data)
    auth.login(data)
  }


  return (
    <div className='login-container'>
      <input className='input' placeholder='Email' type='text' name='email' onChange = {(e)=>setEmail(e.target.value)}/>
      <input className='input' placeholder='Password' type='text' name='password' onChange = {(e)=>setPassword(e.target.value)}/>
      <button className='login-button' onClick={() => loginHandler()}>{type} Login</button>
    </div>
  )
}

export default Login