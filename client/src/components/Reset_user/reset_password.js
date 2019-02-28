import React, { Component } from 'react';
import axios from 'axios';
import { update, generateData, isFormValid } from '../../utils/FormActions';
import FormField from '../../utils/FormField';
import Dialog from '@material-ui/core/Dialog';

class ResetPassword extends Component {
  state = {
    resetToken: '',
    formError: false,
    formErrorMsg: '',
    formSuccess: '',
    formData: {
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
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm your password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMsg: ''
      }
    }
  }

  componentDidMount() {
    const resetToken = this.props.match.params.id;
    this.setState({
      resetToken
    })
   
  }


  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'reset_password');
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'reset_password');
    let formIsValid = isFormValid(this.state.formData, 'reset_password');

    if(formIsValid) {
      axios.post('/api/users/reset_password', {...dataToSubmit, resetToken: this.state.resetToken })
        .then(res => {
          if(!res.data.success) {
            this.setState({
              formError: true,
              formErrorMsg: res.data.msg
            })
          } else {
            this.setState({
              formError: false,
              formSuccess: true
            }, () => {
              setTimeout(() => {
                this.props.history.push('/login_register');
              }, 2000)
            })
          }
        })
    } else {
      this.setState({
        formError: true
      })
    }
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={(e) => this.submitForm(e)}>
          <h2>Reset Password</h2>
          <div className="form_block_two">
          <div className="block">
            <FormField id={'password'} formData={this.state.formData.password} change={(element) => this.updateForm(element)} />
          </div>
          <div className="block">
            <FormField id={'confirmPassword'} formData={this.state.formData.confirmPassword} change={(element) => this.updateForm(element)} />
          </div>
        </div>
          <div>
            {this.state.formError ? <div className="error_label">{this.state.formErrorMsg}</div> : null}

            <button onClick={(e) => this.submitForm(e)}>Change password</button>
          </div>
        </form>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Congratulations!!!</div>
            <div>You will redirected to the LOGIN in a couple seconds....</div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default ResetPassword;
