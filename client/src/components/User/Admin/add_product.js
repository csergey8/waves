import React, { Component } from 'react';
import UserLayout from '../../../hoc/UserLayout';
import FormField from '../../../utils/FormField';
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../../utils/FormActions';
import FileUpload from '../../../utils/FileUpload';

import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/product_actions';




class AddProduct extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: '',
        showlabel: true
    },
    description: {
      element: 'textarea',
      value: '',
      config: {
        label: 'Product description',
        name: 'description_input',
        type: 'text',
        placeholder: 'Enter your description'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMsg: '',
      showlabel: true
    },
    price: {
      element: 'input',
      value: '',
      config: {
        label: 'Product price',
        name: 'price_input',
        type: 'number',
        placeholder: 'Enter price'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMsg: '',
      showlabel: true
    },
    brand: {
      element: 'select',
      value: '',
      config: {
        label: 'Product Brand',
        name: 'brands_input',
        options: []
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMsg: '',
      showlabel: true
    },
    shipping: {
      element: 'select',
      value: '',
      config: {
        label: 'Product Shipping',
        name: 'shipping_input',
        options: [
          {key: true, value: 'Yes'},
          {key: false, value: 'No'}
        ]
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMsg: '',
      showlabel: true
    },
    available: {
      element: 'select',
      value: '',
      config: {
        label: 'Available, in stock',
        name: 'available_input',
        options: [
          {key: true, value: 'Yes'},
          {key: false, value: 'No'}
        ]
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMsg: '',
      showlabel: true
    },
    wood: {
      element: 'select',
      value: '',
      config: {
        label: 'Wood material',
        name: 'wood_input',
        options: []
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMsg: '',
      showlabel: true
    },
    frets: {
      element: 'select',
      value: '',
      config: {
        label: 'Frets',
        name: 'frets_input',
        options: [
          {key: 20, value: 20},
          {key: 21, value: 21},
          {key: 22, value: 22},
          {key: 24, value: 24}
        ]
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMsg: '',
      showlabel: true
    },
    publish: {
      element: 'select',
      value: '',
      config: {
        label: 'Publish',
        name: 'publish_input',
        options: [
          {key: true, value: 'Public'},
          {key: false, value: 'Hidden'}
        ]
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMsg: '',
      showlabel: true
    },
    images: {
      value: [],
      validaion: {
        required: false
      },
      valid: true,
      touched: false,
      validationMsg: '',
      showlabel: false
    }
    
  }
}

resetFieldHandler = () => {
  const newFormData = resetFields(this.state.formData, 'products');
  this.setState({
    formData: newFormData,
    formSuccess: true
  });
  setTimeout(() => {
    this.setState({
      formSuccess: false
    }, () => {
      this.props.dispatch(clearProduct());
    })
  }, 2000)
}

submitForm = (e) => {
  e.preventDefault();

  let dataToSubmit = generateData(this.state.formData, 'products');
  let formIsValid = isFormValid(this.state.formData, 'products');
  if(formIsValid) {
    this.props.dispatch(addProduct(dataToSubmit)).then(()=>{
      if( this.props.products.addProduct.success){
          this.resetFieldHandler();
      }else{
          this.setState({formError: true})
      }
    })
  } else {
    this.setState({
      formError: true
    })
  }



}

updateForm = (element) => {
  const newFormData = update(element, this.state.formData, 'products');
  this.setState({
    formError: false,
    formData: newFormData
  })
}

updateFields = (newFormData) => {
  this.setState({
    formData: newFormData
  })
}

imagesHandler = (images) => {
  const newFormData = {...this.state.formData}
  newFormData['images'].value = images;
  newFormData['images'].valid = true;
  this.setState({
    formData: newFormData
  })
}


componentDidMount() {
  const formData = this.state.formData;
  this.props.dispatch(getBrands()).then(res => {
    const newFormData = populateOptionFields(formData, this.props.products.brands, 'brand');
    this.updateFields(newFormData);
  })
  this.props.dispatch(getWoods()).then(res => {
    const newFormData = populateOptionFields(formData, this.props.products.woods, 'wood');
    this.updateFields(newFormData);
  })
}
  render() {
    console.log(this.props)
    return (
      <UserLayout>
        <div>
          <h1>Add product</h1>
          <form onSubmit={(e) => this.submitForm(e)}>
          <FileUpload 
            imagesHandler={(images) => this.imagesHandler(images)} 
            reset={this.state.formSuccess}
          />
          <FormField id={'name'} formData={this.state.formData.name} change={(element) => this.updateForm(element)} />
          <FormField id={'description'} formData={this.state.formData.description} change={(element) => this.updateForm(element)} />
          <FormField id={'price'} formData={this.state.formData.price} change={(element) => this.updateForm(element)} />
          <div className="form_divider"></div>
          <FormField id={'brand'} formData={this.state.formData.brand} change={(element) => this.updateForm(element)} />
          <FormField id={'shipping'} formData={this.state.formData.shipping } change={(element) => this.updateForm(element)} />
          <FormField id={'available'} formData={this.state.formData.available } change={(element) => this.updateForm(element)} />
          <div className="form_divider"></div>
          <FormField id={'wood'} formData={this.state.formData.wood } change={(element) => this.updateForm(element)} />
          <FormField id={'frets'} formData={this.state.formData.frets } change={(element) => this.updateForm(element)} />
          <div className="form_divider"></div>
          <FormField id={'publish'} formData={this.state.formData.publish } change={(element) => this.updateForm(element)} />
          {this.state.formSuccess ? 
              <div className="form_success">
                Success
              </div>
          
          : null
          }
          {this.state.formError ? <div className="error_label">Please check your data</div> : null}

                <button onClick={(e) => this.submitForm(e)}>Add product</button>
          </form>
        </div>
      </UserLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(AddProduct);
