import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typewriter from "typewriter-effect"
import axios from "axios"
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
      display: 'flex',
      flexDirection: 'column'
    },
  },
  button: {
    '& > *': {
        margin: theme.spacing(1),
      }
  }
}));

export default function Feedback() {
  const classes = useStyles();
  const history = useHistory()

  const [formValues, setFormValues] = useState({
    name: "",
    message: ""
  })
  
  const onChangeHandler = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log(formValues)
    const owner = new URLSearchParams(window.location.search).get("owner")
    let res = await axios({ method: 'post', url: `/api/feedback?owner=${owner}`, baseURL: 'http://localhost:5000', data: formValues })
    console.log(res.data)
    history.push("./login")
  }

  return (
    <div style={{width:'100%',height:'100vh',display:'flex'}}>

    <div style={{width: '50%', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'fffaf'}}>
        <form className={classes.root} noValidate autoComplete="off" onSubmit = {onSubmitHandler} >
          <TextField 
            style={{padding: '3% 0'}} 
            name = "name" 
            value = {formValues['name']} 
            id="standard-basic" 
            onChange={(e) => onChangeHandler(e)}
            placeholder="Name" />
          <TextField 
            id="outlined-multiline-static"
            label="Feedback"
            style={{marginTop:'40px',padding:'3% 0'}}
            multiline
            rows={4}
            placeholder="Feedback"
            defaultValue=""
            variant="outlined"
            name='message'
            value={formValues['message']}
            onChange={(e) => onChangeHandler(e)} 
          />
          <div className={classes.button}>
            <Button 
              type = "submit" 
              style={{
                marginTop:'40px',
                height:'40px',
                backgroundColor: 'rgb(1, 1, 20)'
              }} 
              variant="contained" 
              color="primary"
              >
              Send
            </Button>
          </div>
        </form>
    </div>
    <div style={{width: '50%', display: 'flex', justifyContent: 'center', height: '100%',backgroundColor:'rgb(1, 1, 20)'}}>
      <div style={{height: '200px', marginTop: '300px', color:'white',fontSize:'3.5em',width:'62%',textAlign:'center',fontWeight:'bold'}}>
        {/* <span></span> */}
        <Typewriter
          
           
          options={{
            strings: ['Thank you for shopping with us', 'See you soon!'],
            autoStart: true,
            loop: true,
            delay: 75
          }}
        />
      </div>
    </div>

    </div>

  );
}