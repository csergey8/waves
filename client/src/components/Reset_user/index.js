import React, { Component } from 'react';
import axios from 'axios';
import { update, generateData, isFormValid } from '../../utils/FormActions';
import FormField from '../../utils/FormField';

class ResetUser extends Component {

  state = {
    formError: false,
    formSuccess: false,
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
      },
    }
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'reset_email');
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'reset_email');
    let formIsValid = isFormValid(this.state.formData, 'reset_email');

    if(formIsValid) {
      axios.post('/api/users/reset_users', dataToSubmit)
        .then(res => {
          if(res.data.success) {
            this.setState({
              formSuccess: true
            })
          }
        })
        .catch(err => console.log(err));
    } else {
      this.setState({
        formError: true
      })
    }
  }



  render() {
    return (
      <div className="container">
        <h1>Reset Password</h1>
        <form onSubmit={(e) => this.submitForm(e)}>
          <FormField id={'email'} formData={this.state.formData.email} change={(element) => this.updateForm(element)} />
          {this.state.formSuccess ? <div className="form_success">Check you email</div> : null}
          {this.state.formError ? <div className="error_label">Please check your data</div> : null}
          <button onClick={(e) => this.submitForm(e)}>Send email to reset password</button>
        </form>
      </div>
    )
  }
}

export default ResetUser;