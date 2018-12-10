import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotions from './home_promotions';
import CardBlock from '../../utils/card_block';
import { getProductsBySell, getProductsByArrival } from '../../actions/product_actions';
import { connect } from 'react-redux';


class Home extends Component {

  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());

  }
  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock
         list={this.props.products.bySell}
         title="Best Selling guitars"
        />
        <HomePromotions />
        <CardBlock
         list={this.props.products.byArrival}
         title="New arrivals"
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Home);
