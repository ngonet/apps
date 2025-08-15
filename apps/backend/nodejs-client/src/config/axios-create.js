import axios from 'axios';
import { URL_BACKEND } from './process-env.js';

const URL = URL_BACKEND;
const HEAD_VALUE = '';

export function axiosCreate(route) {
  return axios.create({
    baseURL: `${URL}/${route}`,
    // headers: { "X-API-KEY": HEAD_VALUE }
  });
}
