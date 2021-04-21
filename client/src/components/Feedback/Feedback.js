import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

  return (
    <div style={{padding:'20%'}}>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField style={{padding:'3%'}} id="standard-basic" placeholder="Name" />
            <TextField 
                id="outlined-multiline-static"
                label="Feedback"
                style={{marginTop:'40px',padding:'3%'}}
                multiline
                rows={4}
                placeholder="Feedback"
                defaultValue=""
                variant="outlined" 
            />
            <div className={classes.button}>
                <Button style={{marginTop:'40px',height:'40px'}} variant="contained" color="primary" href="#koi-aur-route">
                    Send
                </Button>
            </div>
        </form>
    </div>
  );
}