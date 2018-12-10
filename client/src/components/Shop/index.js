import React, { Component } from 'react';
import PageTop from '../../utils/page_top.js';
import { connect } from 'react-redux';
import CollapseCheckbox from '../../utils/collapseCheckbox';
import { getBrands, getWoods } from '../../actions/product_actions';
import { frets } from '../../utils/fixed_categories';

class Shop extends Component {

  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      woods: [],
      price: []
    }
  }

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());
  }
  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters};
    newFilters[category] = filters;

    this.setState({
      filters: newFilters
    })
  }
  render() {
    const products = this.props.products;
    return (
      <div>
        <PageTop
          title="Browse products"
        />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={(filters) => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={(filters) => this.handleFilters(filters, 'frets')}
              />
              <CollapseCheckbox
                initState={true}
                title="Woods"
                list={products.woods}
                handleFilters={(filters) => this.handleFilters(filters, 'woods')}
              />
            </div>
            <div className="right">
              Rigth
            </div>
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

export default connect(mapStateToProps)(Shop);