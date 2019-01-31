import React, { Component } from 'react';
import { update, generateData, isFormValid, populateField } from '../../../utils/FormActions';
import FormField from '../../../utils/FormField';
import { connect } from 'react-redux';

class UpdateSiteNfo extends Component {
  render() {
    return (
      <div>
        form
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    site: state.site
  }
}

export default connect()(UpdateSiteNfo);
