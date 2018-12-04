import axios from 'axios';
import { USER_SERVER } from '../utils/misc';
import { LOGIN_USER } from './types';


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


