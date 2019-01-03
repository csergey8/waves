import axios from 'axios';
import { USER_SERVER } from '../utils/misc';
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER, ADD_TO_CART } from './types';


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


