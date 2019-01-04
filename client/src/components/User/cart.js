import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../hoc/UserLayout';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFrown, faSmile } from '@fortawesome/fontawesome-free-solid';
import { getCartItems } from '../../actions/user_actions';

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showSuccess: false,
    showTotal: false
  }

  componentDidMount() {
    let cartItem = [];
    let user = this.props.user;

    if(user.userData.cart) {
      if(user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItem.push(item.id);
        });
        this.props.dispatch(getCartItems(cartItem, user.userData.cart))
          .then(res => {
            
          })
      }
    }
  }

  render() {
    return (
      <UserLayout>
        <div>
          cart
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
