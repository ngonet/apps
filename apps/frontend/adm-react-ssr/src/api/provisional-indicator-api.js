import { axiosCreate } from '@/utils/axios-create.js';

const apiClient = axiosCreate('provisional-indicator');

export const getProvisionalIndicators = async () => await apiClient.get('/');
