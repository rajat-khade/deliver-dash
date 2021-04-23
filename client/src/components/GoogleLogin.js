import React, {useState} from 'react'
import { useHistory } from 'react-router'
import axios from "axios"
import './Login.css'
import Loader from 'react-loader-spinner'

const GoogleLogin = (props) => {
 
  const [type,setType] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const loginHandler = async (e) => {
    setLoading(true)
    const data = {
      name: props.location.state.name,
      email: props.location.state.email,
      type,
      location,
      password: 'Google'
    }

    let res = await axios({ method: 'post', url: `/api/google`, baseURL: 'http://localhost:5000', data })

    localStorage.setItem(`${type.toLowerCase()}-auth`,JSON.stringify(res.data))
    
    setTimeout(()=>{
      history.push(`/${type}/login`)
    },2000)
    
    e.preventDefault()
  }


  return (
    <div className='login-container'>
      <input className='input' placeholder='Type' type='text' name='type' onChange = {(e)=>setType(e.target.value)}/>
      <input className='input' placeholder='Location' type='location' name='location' onChange = {(e)=>setLocation(e.target.value)}/>
      <button className='login-button' style={{textTransform:'capitalize'}} onClick={(e) => loginHandler(e)}>Continue</button>
      {loading && 
        <div style={{position: 'absolute', top: '0', right: '0'}}>
          <Loader 
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={5000}
          />
        </div>
      }
    </div>
  )
}

export default GoogleLogin