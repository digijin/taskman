import React from 'react';

import {RaisedButton} from 'material-ui'
import {
  Step,
  Stepper,
  StepLabel,
  StepButton,
} from 'material-ui/Stepper';

import {Paper} from 'material-ui'

import What from './HomePage/What'
import Why from './HomePage/Why'
import How from './HomePage/How'

class HomePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {stepIndex:0}
    }
    nextStep = (e) => {
        let next = this.state.stepIndex+1
        if(next>=3)next = 0;
        this.setState({stepIndex: next})
    }
    render() {
        let {stepIndex} = this.state
        let content = [
            <What />,
            <Why />,
            <How />
        ]
        return <div>
                <div style={{"padding-left": 30,"padding-right": 30}} className="jumbotron">
                    <h1>HyperWire</h1>
                    <p>task management software for developers</p>
                    <Stepper linear={false} activeStep={stepIndex}>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 0})}>
                            What is it?
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 1})}>
                            Why do I want to use it?
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 2})}>
                            How do I get started?
                        </StepButton>
                    </Step>
                    </Stepper>
                    <br />
                    <Paper style={{padding: 40}}>
                        {content[stepIndex]}
                    </Paper>
                </div>
                
                
            </div>
    }
}

export default HomePage