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
  const [passwordError, setPasswordError] = useState("")

  const handleChange = (event) => {
    setValue(event.target.value);
  };

 

  return (
    <div style={{padding:'3%', alignContent: 'center'}}>
        <form style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}} className={classes.root} noValidate autoComplete="off">
            <input style={{padding:'1%',height: '50px',textAlign: 'center',borderRadius: '5px'}} value = {name} onChange = {(e)=>setName(e.target.value)} id="name" placeholder="Name" variant="outlined" />
            <input style={{padding:'1%',height: '50px',textAlign: 'center',borderRadius: '5px'}} value = {email} onChange = {(e)=>setEmail(e.target.value)} id="email" placeholder="email" variant="outlined" />
            <input style={{padding:'1%',height: '50px',textAlign: 'center',borderRadius: '5px'}} value = {password} onChange = {(e)=>setPassword(e.target.value)} id="password" type="password" placeholder="Password" variant="outlined" />
            <input style={{padding:'1%',height: '50px',textAlign: 'center',borderRadius: '5px'}} value = {confirm} onChange = {(e)=>setConfirm(e.target.value)} id="confirm" type="password" placeholder="Confirm Password" variant="outlined" />
            <input style={{padding:'1%',height: '50px',textAlign: 'center',borderRadius: '5px'}} value = {location} onChange = {(e)=>setLocation(e.target.value)} id="location" placeholder="Location" />
            <div>{passwordError}</div>
            <div style={{marginTop: '10px'}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Signup As</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="Retailer" control={<Radio onClick = {()=>setType("Retailer")}/>} label="Retailer" />
                        <FormControlLabel value="Customer" control={<Radio onClick = {()=>setType("Customer")}/>} label="Customer" />
                        <FormControlLabel value="Wholesaler" control={<Radio onClick = {()=>setType("Wholesaler")}/>} label="Wholesaler" />
                        <FormControlLabel value="Delivery" control={<Radio onClick = {()=>setType("Delivery")}/>} label="Delivery" />
                    </RadioGroup>
                </FormControl>
            </div>

            {!otpSent?
            <div className={classes.button}>
                <Button style={{marginTop:'10px',height:'40px'}} onClick = {()=>{
                  sendOTP('abhishekkumar102k@gmail.com')
                  console.log("mailed",name,email,password,confirm,location,otp)
                  setOtpSent(true)
                  setErrorMessage("")
                  }} variant="contained" color="primary">
                    Send OTP
                </Button>
                <div>{errorMessage}</div>
            </div>:<div className={classes.button}>
                <TextField style={{padding:'3%'}} id="otp" value = {otp} onChange = {(e)=>setOtp(e.target.value)} placeholder="Enter OTP" />
                <Button style={{marginTop:'10px',height:'40px'}} 
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
                            setPasswordError("Passwords dont match")
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