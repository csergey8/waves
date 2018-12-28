import React, { Component } from 'react';
import PageTop from '../../utils/page_top';
import ProdInfo from './prodInfo';
import ProdImg from './prodImg';

import { connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../actions/product_actions';

class ProductPage extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id))
      .then(res => {
        if(!this.props.products.prodDetail) {
          this.props.history.push('/')
        }
      })
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  addToCartHandler = (id) => {

  }
  render() {
    console.log(this.props.products.prodDetail);
    return (
      <div>
        <PageTop title="Product detail" />
        <div className="container">
          {
            this.props.products.prodDetail ?

                <div className="product_detail_wrapper">
                  <div className="left">
                    <div style={{width: '500px'}}>
                      <ProdImg 
                        detail={this.props.products.prodDetail}
                      />
                    </div>
                  </div>
                  <div className="right">
                    <ProdInfo 
                    detail={this.props.products.prodDetail}
                    addToCart={(id) => this.addToCartHandler(id)}
                    />
                  </div>
                </div>

            : null
          }
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

export default connect(mapStateToProps)(ProductPage);
