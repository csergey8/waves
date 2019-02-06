import React, { Component } from 'react';
import { update, generateData, isFormValid, populateField } from '../../../utils/FormActions';
import FormField from '../../../utils/FormField';
import { connect } from 'react-redux';

class UpdateSiteNfo extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'Address:',
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter Site address'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
    },
      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'Working hours',
          name: 'hours_input',
          type: 'text',
          placeholder: 'Enter Working hours'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          label: 'Phone',
          name: 'phone_input',
          type: 'text',
          placeholder: 'Enter Phone number'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Email',
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter shop email'
        },
        validation: {
          required: true,
          email: true 
        },
        valid: false,
        touched: false,
        validationMsg: '',
        showlabel: true
      }
    }
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'site_info');
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'site_info');
    let formIsValid = isFormValid(this.state.formData, 'site_info');

    if(formIsValid) {
      console.log(dataToSubmit);  
    } else {
      this.setState({
        formError: true
      })
    }

    console.log(dataToSubmit);


  }


  render() {
    return (
      <div>
        <form onSubmit={(e) => this.submitForm(e)}>
          <h1>Site info</h1>
          <FormField id={'address'} formData={this.state.formData.address} change={(element) => this.updateForm(element)} />
          <FormField id={'hours'} formData={this.state.formData.hours} change={(element) => this.updateForm(element)} />
          <FormField id={'phone'} formData={this.state.formData.phone} change={(element) => this.updateForm(element)} />
          <FormField id={'email'} formData={this.state.formData.email} change={(element) => this.updateForm(element)} />
          <div>
                {this.state.formSuccess ? <div className="form_success">Success</div> : null}
                {this.state.formError ? <div className="error_label">Please check your data</div> : null}

                <button onClick={(e) => this.submitForm(e)}>Update info</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps)(UpdateSiteNfo);
