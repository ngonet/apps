import { axiosCreate } from '../utils/axios-create.js';

const apiClient = axiosCreate('commune');

export const getCommunes = async () => await apiClient.get('/');
