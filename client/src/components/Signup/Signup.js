import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import nodemailer from "nodemailer"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login'
import 'react-toastify/dist/ReactToastify.css';

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
  }
}));

export default function Signup() {

  const history = useHistory()
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rotinga9@gmail.com',
      pass: 'rotirotiroti'
    }
  });
  
  const clientId = '141701910733-9p68kgmjc4ig4ai54tpmnn05l6s6blpp.apps.googleusercontent.com'
  
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

 

  return (
    <div style={{padding:'3%', alignContent: 'center'}}>
      <h2 style={{textAlign: 'center', color: '#333333',fontWeight: '700',marginTop: '-5px',marginBottom: '8px'}}>Get Started</h2>
      <ToastContainer/>
        <form style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}} className={classes.root} noValidate autoComplete="off">
            <input style={{padding:'1%',height: '45px',textAlign: 'center',borderRadius: '5px'}} value = {name} onChange = {(e)=>setName(e.target.value)} id="name" placeholder="Name" variant="outlined" />
            <input style={{padding:'1%',height: '45px',textAlign: 'center',borderRadius: '5px'}} value = {email} onChange = {(e)=>setEmail(e.target.value)} id="email" placeholder="Email" variant="outlined" />
            <input style={{padding:'1%',height: '45px',textAlign: 'center',borderRadius: '5px'}} value = {password} onChange = {(e)=>setPassword(e.target.value)} id="password" type="password" placeholder="Password" variant="outlined" />
            <input style={{padding:'1%',height: '45px',textAlign: 'center',borderRadius: '5px'}} value = {confirm} onChange = {(e)=>setConfirm(e.target.value)} id="confirm" type="password" placeholder="Confirm Password" variant="outlined" />
            <input style={{padding:'1%',height: '45px',textAlign: 'center',borderRadius: '5px'}} value = {location} onChange = {(e)=>setLocation(e.target.value)} id="location" placeholder="Location" />
            <div style={{marginTop: '10px'}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Signup As</FormLabel>
                    <RadioGroup style={{fontWeight: '100'}} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="Retailer" control={<Radio onClick = {()=>setType("Retailer")}/>} label="Retailer" />
                        <FormControlLabel style={{marginTop: '-8px'}} value="Customer" control={<Radio onClick = {()=>setType("Customer")}/>} label="Customer" />
                        <FormControlLabel style={{marginTop: '-8px'}} value="Wholesaler" control={<Radio onClick = {()=>setType("Wholesaler")}/>} label="Wholesaler" />
                        <FormControlLabel style={{marginTop: '-8px'}} value="Delivery" control={<Radio onClick = {()=>setType("Delivery")}/>} label="Delivery" />
                    </RadioGroup>
                </FormControl>
            </div>

            {!otpSent?
            <div className={classes.button}>
                <Button style={{marginTop:'0',height:'40px',backgroundColor: '#333333',width: '250px'}} onClick = {()=>{
                  sendOTP(email)
                  console.log("mailed",name,email,password,confirm,location,otp)
                  setOtpSent(true)
                  setErrorMessage("")
                  }} variant="contained" color="primary">
                    Send OTP
                </Button>
                <div>{errorMessage}</div>
            </div>:<div className={classes.button}>
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
            <GoogleLogin
                  clientId = {clientId}
                  buttonText="Login"
                  // onSuccess={onSuccess}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                />
            

            
        </form>
    </div>
  );
}