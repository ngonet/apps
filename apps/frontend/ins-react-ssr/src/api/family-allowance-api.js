import { axiosCreate } from '@/utils/axios-create.js';

const apiClient = axiosCreate('family-allowance');

export const getFamilyAllowances = async () => await apiClient.get('/');
