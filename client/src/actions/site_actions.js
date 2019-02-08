import axios from 'axios';

import { 
  GET_SITE_DATA,
  UPDATE_SITE_DATA
} from './types';

import { SITE_SERVER } from '../utils/misc';

export const getSiteData = () => {
  const request = axios.get(`${SITE_SERVER}/site_data`)
          .then(res => res.data);

  return {
    type: GET_SITE_DATA,
    payload: request
  }
}

export const updateSiteData = (data) => {
  const request = axios.post(`${SITE_SERVER}/site_data`, data)
          .then(res => res.data)


  return {
    type: UPDATE_SITE_DATA,
    payload: request 
  }
}

