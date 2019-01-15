import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../hoc/UserLayout';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFrown, faSmile } from '@fortawesome/fontawesome-free-solid';
import { getCartItems, removeCartItem } from '../../actions/user_actions';
import UserProductBlock from '../../utils/user/productBlock';
import Paypal from '../../utils/paypal';

// Adgg6lNK1eofX4RW3tS-YjAbDzaWVZo9vL_UWiJsJbESXidNqQBYXwbjvq1HY_9ZUbTygAOeiPhwWetj //

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showSuccess: false,
    showTotal: false
  }

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;

    if(user.userData.cart) {
      if(user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        this.props.dispatch(getCartItems(cartItems, user.userData.cart))
          .then(res => {
            if(this.props.user.cartDetail.length > 0) {
              let total = this.calculateTotal(this.props.user.cartDetail);
              this.setState({
                total,
                showTotal: true
              })
            }
          })
      }
    }
  }

  calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.forEach(i => {
      total += parseInt(i.price, 10) * i.quantity;
    })
    return total;
  }

  removeFromCart = (id) => {
    this.props.dispatch(removeCartItem(id))
      .then(() => {
        if(this.props.user.cartDetail.length <= 0) {
          this.setState({
            showTotal: false
          })
        } else {
          const total = this.calculateTotal(this.props.user.cartDetail);
          this.setState({
            total,
            showTotal: true
          })
        }
      })
  }

  showNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>
        You have no items
      </div>
    </div>
  )

  transactionError = (data) => {
    console.log(data);
  }

  transactionCanceled = (data) => {
    console.log('Transaction canceled');
  }

  transactionSuccess = (data) => {
    this.setState({
      showTotal: false,
      showSuccess: true
    })
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My Cart</h1>
          <div className="user_cart">
            <UserProductBlock
              products={this.props.user}
              type="cart"
              removeItem={(id) => this.removeFromCart(id)}
            />
            {this.state.showTotal ?
              
              <div>
                <div className="user_cart_sum">
                  <div>
                    Total amount: ${this.state.total} 
                  </div>
                </div>
              </div>
            
            : this.state.showSuccess ? 

             <div className="cart_success">
              <FontAwesomeIcon icon={faSmile} />
                <div>
                Thank you
                </div>
                <div>
                  You order is now complete
                </div>
             </div>                        
             
             
             : this.showNoItemMessage()}
          </div>
          {
            this.state.showTotal ?
              <div className="paypal_button_container">
                <Paypal
                  toPay={this.state.total}
                  transactionError={(data) => this.transactionError(data)}
                  transactionCanceled={(data) => this.transactionCanceled(data)}
                  onSuccess={(data) => this.transactionSuccess(data)}
                />
              </div>

            :null
          }
        </div>
      </UserLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserCart);
