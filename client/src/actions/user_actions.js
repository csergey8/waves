import axios from 'axios';
import { USER_SERVER, PRODUCT_SERVER } from '../utils/misc';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
  UPDATE_DATA_USER,
  CLEAR_UPDATE_DATA_USER
} from './types';


export function loginUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then(res => {
      return res.data
    })
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
    .then(res => {
      return res.data
    })
    return {
      type: REGISTER_USER,
      payload: request
    }
}

export function auth() {
  const request = axios.get(`${USER_SERVER}/auth`)
    .then(res => {
      return res.data
    })

    return {
      type: AUTH_USER,
      payload: request
    }
}

export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`)
    .then(res => {
      return res.data
    })

    return {
      type: LOGOUT_USER,
      payload: request
    }
}

export const addToCart = (_id) => {

  const request = axios.post(`${USER_SERVER}/add_to_cart?productId=${_id}`)
    .then(res => res.data);

  return {
    type: ADD_TO_CART,
    payload: request
  }
}

export const getCartItems = (cartItems, userCart) => {

  const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
      .then(res => {
        userCart.forEach(item => {
          res.data.forEach((key, i) => {
            if(item.id == key._id) {
              res.data[i].quantity = item.quantity;
            }
          })
        })
        return res.data
      })

  return {
    type: GET_CART_ITEMS,
    payload: request
  }
}

export const removeCartItem = (id) => {

  const request = axios.get(`${USER_SERVER}/remove_from_cart?_id=${id}`)
    .then(res => {
      res.data.cart.forEach(item => {
        res.data.cartDetail.forEach((k, i) => {
          if(item.id === k._id) {
            res.data.cartDetail[i].quantity = item.quantity
          }
        })
      })
        return res.data      
    })



  return {
    type: REMOVE_CART_ITEM,
    payload: request
  }
}

export const onSuccessBuy = (data) => {

  const request = axios.post(`${USER_SERVER}/success_buy`, data)
    .then(res => res.data);




  return {
    type: ON_SUCCESS_BUY,
    payload: request
  }
}

export const updateDataUser = (dataToSubmit) => {
  const request = axios.post(`${USER_SERVER}/update_profile`, dataToSubmit)
    .then(res => res.data);

    return {
      type: UPDATE_DATA_USER,
      payload: request
    }
}

export const clearUpdateUser = () => {
  return {
    type: CLEAR_UPDATE_DATA_USER,
    payload: ''
  }
}


