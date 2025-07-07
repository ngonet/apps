import { axiosCreate } from '@/utils/axios-create.js';

const apiClient = axiosCreate('single-tax');

export const getSingleTax = async () => await apiClient.get('/');
