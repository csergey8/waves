import React, { Component } from 'react'
import FormField from '../../utils/FormField'
import { connect } from 'react-redux'

import { update, generateData, isFormValid, populateFields } from '../../utils/FormActions';
import { clearUpdateUser, updateDataUser} from '../../actions/user_actions';

export class UpdatePersonalNfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: ''
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter your lastname'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: ''
      },
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
      }
    }
  }

  componentDidMount() {
    const newFormData = populateFields(this.state.formData, this.props.user.userData);
    this.setState({
      formData: newFormData
    })
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'update_user')
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  submitForm = e => {
    e.preventDefault()

    let dataToSubmit = generateData(this.state.formData, 'update_user')
    let formIsValid = isFormValid(this.state.formData, 'update_user')

    if (formIsValid) {
      this.props.dispatch(updateDataUser(dataToSubmit))
        .then(() => {
          if(this.props.user.updateUser.success) {
            this.setState({
              formSuccess: true
            }, () => {
              setTimeout(() => {
                this.props.dispatch(clearUpdateUser);
                this.setState({
                  formSuccess: false
                })
              }, 3000)
              
            })
          }
        })
    } else {
      this.setState({
        formError: true
      })
    }

    console.log(dataToSubmit)
  }

  render () {
    return (
      <div>
        <form onSubmit={event => this.submitForm(event)}>
          <h2>Personal information</h2>
          <div className='form_block_two'>
            <div className='block'>
              <FormField
                id={'name'}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className='block'>
              <FormField
                id={'lastname'}
                formData={this.state.formData.lastname}
                change={element => this.updateForm(element)}
              />
            </div>
          </div>
          <div className=''>
            <FormField
              id={'email'}
              formData={this.state.formData.email}
              change={element => this.updateForm(element)}
            />
          </div>
          <div>
              {
                this.state.formSuccess ?
                  <div className="form_success">
                    Success
                  </div>

                : null
              }
              {this.state.formError ? <div className="error_label">Please check your data</div> : null}

              <button onClick={(e) => this.submitForm(e)}>Update an account</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UpdatePersonalNfo);
