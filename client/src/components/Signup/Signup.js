import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={{padding:'3%'}}>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField style={{padding:'3%'}} id="name" placeholder="Name" variant="outlined" />
            <TextField style={{padding:'3%'}} id="email" placeholder="email" variant="outlined" />
            <TextField style={{padding:'3%'}} id="password" type="password" placeholder="Password" variant="outlined" />
            <TextField style={{padding:'3%'}} id="confirm" type="password" placeholder="Confirm Password" variant="outlined" />
            <TextField style={{padding:'3%'}} id="location" placeholder="Location" />
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Signup As</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                        <FormControlLabel value="Retailer" control={<Radio />} label="Retailer" />
                        <FormControlLabel value="Wholesaler" control={<Radio />} label="Wholesaler" />
                        <FormControlLabel value="Delivery" control={<Radio />} label="Delivery" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className={classes.button}>
                <Button style={{marginTop:'10px',height:'40px'}} variant="contained" color="primary" href="#koi-aur-route">
                    Signup
                </Button>
            </div>
        </form>
    </div>
  );
}