import React, { useState } from 'react';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import nodemailer from "nodemailer"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login'
import MenuItem from '@material-ui/core/MenuItem';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
  },
  button: {
    '& > *': {
        margin: theme.spacing(1),
      }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

export default function Signup() {
  
  const history = useHistory()
  
  const clientId = '1068390453446-tkpkdi13aoquhf0th8bdsle2uhr2th2m.apps.googleusercontent.com'
  
  const sendOTP = async (receiverMail) => {
    let token = await axios({ url: `/api/otp/${receiverMail}`, baseURL: 'http://localhost:5000' })
    localStorage.setItem("otpToken",token.data.token)
  }

  // const validateOTP = (OTP) => 

  const classes = useStyles();
  const [value, setValue] = useState('female');
  const [otpSent, setOtpSent] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("")
  const [otp, setOtp] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSuccess = async (res) => {
    setLoading(true)
    let response = await axios({ url: `/api/checkemail/${res.profileObj.email}`, baseURL: 'http://localhost:5000'})

    if(response.data){

      console.log("user already exists")
      const body = {
        name: response.data.name,
        email: response.data.email,
        type: response.data.type,
        location: response.data.location,
        password: 'Google'
      }
  
      let res = await axios({ method: 'post', url: `/api/${(response.data.type).toLowerCase()}/login`, baseURL: 'http://localhost:5000', data: body })
  
      localStorage.setItem(`${(response.data.type).toLowerCase()}-auth`,JSON.stringify(res.data))
      
      setTimeout(()=>{
          history.push(`/${(response.data.type).toLowerCase()}/login`)
      },2000)
    }
    else
    history.push({
      pathname: '/google/login',
      state: { name: res.profileObj.name, email: res.profileObj.email }
    })
    // setLoading(false)
  }

  return (
    <div style={{padding:'3%', alignContent: 'center'}}>
      {loading && 
        <div style={{position: 'fixed', top: '20px', right: '20px', zIndex: '30', background: 'none'}}>
          <Loader 
          type="TailSpin"
          color="#00BFFF"
          height={50}
          width={50}
          timeout={5000}
          />
        </div>
      }
      <h2 style={{textAlign: 'center', color: '#333333',fontWeight: '700',marginTop: '-5px',marginBottom: '8px'}}>Get Started</h2>
      <h4 style={{textAlign: 'center', color: '#333333',fontWeight: '700',marginTop: '-5px',marginBottom: '8px'}}>Signup with <span style={{color: 'rgb(44, 173, 212)', fontSize: '1.5rem'}}>DeliverDash!</span></h4>
      <ToastContainer/>
        <form style={{display: 'flex',flexDirection: 'column',alignItems: 'center', marginTop: '30px'}} className={classes.root} noValidate autoComplete="off">
            <input style={{padding:'1%',height: '45px',textAlign: 'center',borderRadius: '5px'}} value = {name} onChange = {(e)=>setName(e.target.value)} id="name" placeholder="Name" variant="outlined" />
            <input style={{padding:'1%',height: '45px',textAlign: 'center',borderRadius: '5px'}} value = {email} onChange = {(e)=>setEmail(e.target.value)} id="email" placeholder="Email" variant="outlined" />
            <input style={{padding:'1%',height: '45px',textAlign: 'center',borderRadius: '5px'}} value = {password} onChange = {(e)=>setPassword(e.target.value)} id="password" type="password" placeholder="Password" variant="outlined" />
            <input style={{padding:'1%',height: '45px',textAlign: 'center',borderRadius: '5px'}} value = {confirm} onChange = {(e)=>setConfirm(e.target.value)} id="confirm" type="password" placeholder="Confirm Password" variant="outlined" />
            <input style={{padding:'1%',height: '45px',textAlign: 'center',borderRadius: '5px'}} value = {location} onChange = {(e)=>setLocation(e.target.value)} id="location" placeholder="Location" />
              <div style={{marginTop: '10px'}}>
                  {/* <FormControl component="fieldset" style={{fontFamily: 'Ubuntu, sans-serif',marginLeft:'50px'}}>
                      <FormLabel component="legend" style={{fontSize:"1.2em", fontWeight: '500'}}>Signup As</FormLabel>
                      <RadioGroup style={{fontWeight: '100'}} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                          <FormControlLabel value="Retailer" control={<Radio onClick = {()=>setType("Retailer")}/>} label="Retailer" />
                          <FormControlLabel style={{marginTop: '-8px'}} value="Customer" control={<Radio onClick = {()=>setType("Customer")}/>} label="Customer" />
                          <FormControlLabel style={{marginTop: '-8px'}} value="Wholesaler" control={<Radio onClick = {()=>setType("Wholesaler")}/>} label="Wholesaler" />
                          <FormControlLabel style={{marginTop: '-8px'}} value="Delivery" control={<Radio onClick = {()=>setType("Delivery")}/>} label="Delivery" />
                      </RadioGroup>
                  </FormControl> */}
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Select User Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <MenuItem value={"Customer"}>Customer</MenuItem>
                      <MenuItem value={"Retailer"}>Retailer</MenuItem>
                      <MenuItem value={"Wholesaler"}>Wholesaler</MenuItem>
                      <MenuItem value={"Delivery"}>Delivery</MenuItem>
                    </Select>
                  </FormControl>
              </div>

              {!otpSent?
            <div style={{display:'flex', width:'100%',justifyContent:'space-evenly', padding: '0 80px', marginTop: '50px'}}>
              <div style={{backgroundColor:'yellow', display: 'flex', justifyContent: 'center'}}>
                <Button style={{marginTop:'0',height:'40px',backgroundColor: '#333333',width: '185px'}} onClick = {()=>{
                  sendOTP(email)
                  console.log("mailed",name,email,password,confirm,location,otp)
                  setOtpSent(true)
                  setErrorMessage("")
                  }} variant="contained" color="primary">
                    Send OTP
                </Button>
                <div>{errorMessage}</div>

              </div>
              
              <div style={{marginTop: '30px'}}>
                <GoogleLogin
                  clientId = {clientId}
                  buttonText="Sign Up With Google"
                  onSuccess={onSuccess}
                  // onClick={() => setLoading(true)}
                  // cookiePolicy={'single_host_origin'}
                  isSignedIn={false}
                />
              </div>
                
              </div>
              :<div className={classes.button}>
                <TextField style={{padding:'1%',marginTop: '-18px'}} id="otp" value = {otp} onChange = {(e)=>setOtp(e.target.value)} placeholder="Enter OTP" />
                <Button style={{marginTop:'10px',height:'40px',backgroundColor: '#333333',width: '250px'}} 
                  variant="contained" 
                  color="primary"
                  onClick = {async ()=>{
                      let otpToken = localStorage.getItem("otpToken")
                      let OTP = jwt_decode(otpToken)

                      if(parseInt(Date.now()) >= parseInt(OTP.exp * 1000))
                      {
                        setErrorMessage("OTP Expired, try again")
                        setOtpSent(false)
                      }
                      else {

                        if(OTP.OTP == otp){

                          if(password !== confirm)
                            toast.error("Passwords dont match")
                          else{
                            let body = {
                              name,
                              email,
                              password,
                              location,
                              type
                            }
                            let user = await axios({ method: 'post', url: `/api/signup`, baseURL: 'http://localhost:5000', data: body })
                            console.log(user)

                            history.push(`/${type}/login`)
                          }

                        }
                        else{
                          setErrorMessage("Wrong OTP, try again")
                        }
                      }
                  }}
                  >
                    Signup
                </Button>
                  <div>{errorMessage}</div>

                
            </div>}

            
            

            
            

            
        </form>
    </div>
  );
}