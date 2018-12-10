import axios from 'axios';

import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL } from './types';

import { PRODUCT_SERVER } from '../utils/misc';

export function getProductsBySell() {
  const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(res => res.data);

    return {
      type: GET_PRODUCTS_BY_SELL,
      payload: request
    }
}


export function getProductsByArrival() {
  const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(res => res.data);

    return {
      type: GET_PRODUCTS_BY_ARRIVAL,
      payload: request
    }
}