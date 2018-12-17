import React from 'react'

const FormField = ({ formData, change, id }) => {
  const showError = () => {
    let errorMsg = null;

    if(formData.validation && !formData.valid) {
      errorMsg = (
        <div className="error_label">
          {formData.validationMsg}
        </div>
      );
    }

    return errorMsg;
  }
  const renderTemplate = () => {
    let formTemplate = null;

    switch(formData.element) {

    case('input'):
      formTemplate = (
        <div className="formBlock">
          { formData.showlabel ? 

            <div className="label_inputs">{formData.config.label}</div>
          
           : null
          }
          <input
            {...formData.config}
            value={formData.value}
            onBlur={(event) => change({event, id, blur: true})}
            onChange={(event) => change({event, id})}
          />
          {showError()}
        </div>
      )
    break;
    case('textarea'):
      formTemplate = (
        <div className="formBlock">
          { formData.showlabel ? 

            <div className="label_inputs">{formData.config.label}</div>
          
          : null
          }
          <textarea
            {...formData.config}
            value={formData.value}
            onBlur={(event) => change({event, id, blur: true})}
            onChange={(event) => change({event, id})}
          />
          {showError()}
        </div>
      )
    break;
    case('select'):
      formTemplate = (
        <div className="formBlock">
          { formData.showlabel ? 

            <div className="label_inputs">{formData.config.label}</div>
          
          : null
          }
          <select
            value={formData.value}
            onBlur={(event) => change({event, id, blur: true})}
            onChange={(event) => change({event, id})}
          >
            <option value="">Select one</option>
            {formData.config.options.map(item => (
              <option key={item.key} value={item.key}>{item.value}</option>
            ))}
          </select>
          {showError()}
        </div>
      )
    break;
    default:
      formTemplate = null;
    }


    return formTemplate;
  }
  return (
    <div>
      {renderTemplate()}
    </div>
  )
}

export default FormField
