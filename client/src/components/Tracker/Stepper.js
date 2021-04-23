import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Placed', 'Dispatched', 'In Transit', 'Delivered'];
}


export default function HorizontalStepper({status}) {
  const classes = useStyles();

  console.log(status)
  const statusStep = {
      'placed': 0,
      'dispatch': 1,
      'transit': 2,
      'delivered': 3
  }

  const [activeStep, setActiveStep] = React.useState(statusStep[status]);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();
 
  const handleStep = (step) => () => {
    setActiveStep(step);
  }

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      
    </div>
  );
}