import React, { Component } from 'react';
import PageTop from '../../utils/page_top.js';
import { connect } from 'react-redux';
import CollapseCheckbox from '../../utils/collapseCheckbox';
import CollapseRadio from '../../utils/collapseRadio';
import LoadmoreCards from './loadmoreCards';
import { getProductsToShop, getBrands, getWoods } from '../../actions/product_actions';
import { frets, price } from '../../utils/fixed_categories';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars, faTh } from '@fortawesome/fontawesome-free-solid'; 

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
    this.props.dispatch(getProductsToShop(this.state.skip, this.state.limit, this.state.filters))
  }
  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters};
    newFilters[category] = filters;

    if(category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }
    this.showFilteredResults(newFilters);

    this.setState({
      filters: newFilters
    })
  }

  handlePrice = (value) => {
    const data = price;
    let array = [];

    for(let key in data) {
      if(data[key]._id === parseInt(value, 10)) {
        array = data[key].array
      }
    }
    return array;
  }

  showFilteredResults = (filters) => {
    this.props.dispatch(getProductsToShop(0, this.state.limit, filters))
      .then(() => {
        this.setState({
          skip: 0
        })
      })
  }

  loadmoreCards = () => {
    let skip = this.state.skip + this.state.limit;

    this.props.dispatch(getProductsToShop(
      skip, this.state.limit, this.state.filters, this.props.products.toShop
    )).then(() => {
      this.setState({
        skip
      })
    })
  }

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? 'grid_bars' : ''
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
              <CollapseRadio 
                initState={true}
                title="Price"
                list={price}
                handleFilters={(filters) => this.handleFilters(filters, 'price')}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh}/>
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars}/>
                  </div>
                </div>
              </div>
              <div>
                <LoadmoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadmore={() => this.loadmoreCards()}
                  />
              </div>
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