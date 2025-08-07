import { axiosCreate } from '../utils/axios-create.js';

const apiClient = axiosCreate('ccaf');

export const getCcafs = async () => await apiClient.get('/');
