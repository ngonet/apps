import { axiosCreate } from '@/utils/axios-create.js';

const apiClient = axiosCreate('daily-indicator');

export const getDailyIndicators = async () => await apiClient.get('/');
