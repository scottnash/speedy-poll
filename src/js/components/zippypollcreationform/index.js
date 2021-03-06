import React from "react";
import { withRouter } from 'react-router-dom'
import { InputText } from '../form-fields';
import formFieldValidators from '../form-field-validators';
import axios from 'axios';
import * as cookies from '../../helpers/cookies.js';

if (process.env.BROWSER) {
  require('./ZippyPollCreationForm.scss');
}

class ZippyPollCreationForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeFormSection: 'pollquestion',
      activeFormStep: 0
    }
  }

  getFormSteps = () => {
    return [
      <InputText
        activeFormStep = { this.state.activeFormStep }
        buttonLabel = "Go"
        index = { 0 }
        label = "First, enter the poll topic"
        name="pollquestion"
        placeholder = "Poll Topic"
        handleStepCompletion = { this.handleStepCompletion }
        type="text"
        validate = { formFieldValidators.requiredValidator }
        value = { '' }
      />,
      <InputText
        activeFormStep = { this.state.activeFormStep }
        buttonLabel = "Create Poll"
        index = { 1 }
        maxLength = { 10 }
        label = { "Then, enter your initials or a nickname (10 characters max)" }
        name="nickname"
        placeholder="Nickname"
        handleStepCompletion = { this.handleStepCompletion }
        type="text"
        validate = { formFieldValidators.nopunctuation }
        value = { '' }
      />
    ]
  }


  render() {
    this.formSteps = this.getFormSteps();
    return (
      <form className="zippypoll__creation-form">
        { this.renderFormSteps () }
      </form>
    );
  }

  renderFormSteps = () => {
    return this.formSteps.map( ( formStep, index ) => {
      return (
        <div key={ index } className={ `zippypoll__form-step ${ this.getActiveFormStepClass( index ) } `}>
          { formStep }
        </div>
      )
    }  );
  }

  getActiveFormStepClass = ( index ) => {
    return index === this.state.activeFormStep ? 'zippypoll__active-form-step' : '';
  }

  handleStepCompletion = ( formfield, formfieldValue, index ) => {
      this.setState( {
          zippyPollForm: {
            ...this.state.zippyPollForm,
            [formfield]: formfieldValue
          },
          activeFormStep: index
        }, ()=> {
        if( index == this.formSteps.length ) {
          this.createPoll();
        }
      } );
  }


  createPoll = () => {
    axios.post('/api/createpoll', this.state.zippyPollForm, {
      headers: {
          'Content-Type': 'application/json'
      }
    }).then( (response) => {
      if(response.data.status === "success") {
        cookies.setCookie( `zippypoll_${ response.data.urlhash }`, JSON.stringify( { nickname: this.state.zippyPollForm.nickname.substring(0,10), pollquestion: this.state.zippyPollForm.pollquestion } ) );
        this.props.history.push(`/poll/${ response.data.urlhash }`);
        this.props.updateFooterPolls();
      }
    });
  }
}


export default withRouter( ZippyPollCreationForm );
