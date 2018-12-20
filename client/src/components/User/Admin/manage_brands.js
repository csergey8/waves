import React, { Component } from 'react';

import FormField from '../../../utils/FormField';
import { update, generateData, isFormValid, resetFields } from '../../../utils/FormActions';
import { connect } from 'react-redux';
import { getBrands, addBrand } from '../../../actions/product_actions';

class ManageBrands extends Component {
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
          placeholder: 'Enter brand name'
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

  showCategoriesItems = () => {
    return (
      this.props.products.brands ?

        this.props.products.brands.map((item, i) => (
          <div className="category_item" key={i}>{item.name}</div>
        ))

      : null
    )
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'brands');
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formData, 'brands');

    this.setState({
      formData: newFormData,
      formSuccess: true
    })
  }

  submitForm = (e) => {
    e.preventDefault();
  
    let dataToSubmit = generateData(this.state.formData, 'brands');
    let formIsValid = isFormValid(this.state.formData, 'brands');
    if(formIsValid) {
      this.props.dispatch(addBrand(dataToSubmit, this.props.products.brands))
        .then(res => {
          if(res.payload.success){
            this.resetFieldsHandler();
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
  }

  componentDidMount() {
    this.props.dispatch(getBrands());
  }
  render() {
    return (
      <div className="admin_categorie_wrapper">
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {this.showCategoriesItems()}
            </div>
          </div>
          <div className="right">
            <form onSubmit={(e) => this.submitForm(e)}>

            <FormField id={'name'} formData={this.state.formData.name} change={(element) => this.updateForm(element)} />
            
            {this.state.formError ? <div className="error_label">Please check your data</div> : null}

                <button onClick={(e) => this.submitForm(e)}>Add brand</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(ManageBrands);
