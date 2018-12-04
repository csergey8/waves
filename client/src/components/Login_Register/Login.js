import React, { Component } from 'react'
import { connect } from 'react-redux';
import FormField from '../../utils/FormField';
import { withRouter } from 'react-router-dom';

import { update, generateData, isFormValid } from '../../utils/FormActions';
import { loginUser } from '../../actions/user_actions';

class Login extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true 
        },
        valid: false,
        touched: false,
        validationMsg: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: ''
      }
    }
  }
  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'login');
    this.setState({
      formError: false,
      formData: newFormData
    })
  }
  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'login');
    let formIsValid = isFormValid(this.state.formData, 'login');

    if(formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit))
        .then(res => {
          if(res.payload.loginSuccess){
            console.log(res.payload);
            this.props.history.push('/user/dashboard');
          } else {
            this.setState({
              formError: true
            })
          }
        })


    } else {
      this.setState({
        formError: true
      })
    }

    console.log(dataToSubmit);


  }
  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={(e) => this.submitForm(e)}>
          <FormField id={'email'} formData={this.state.formData.email} change={(element) => this.updateForm(element)} />
          <FormField id={'password'} formData={this.state.formData.password} change={(element) => this.updateForm(element)} />

          {this.state.formError ? <div className="error_label">Please check your data</div> : null}

          <button onClick={(e) => this.submitForm(e)}>Log in</button>


        </form>
      </div>
    )
  }
}

export default connect()(withRouter(Login));
