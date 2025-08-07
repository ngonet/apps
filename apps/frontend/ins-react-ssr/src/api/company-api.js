import { showSuccessNotification } from '../composables/notification.js';
import { axiosCreate } from '../utils/axios-create.js';

const apiClient = axiosCreate('company');

export const getCompanies = async () => await apiClient.get('/');
export const getCompany = async (id) => await apiClient.get(`/${id}`);
export const patchCompany = async (id, data) => {
  const response = await apiClient.patch(`/${id}`, data);
  if (response.status === 200 || response.status === 202) {
    showSuccessNotification('Información de la empresa actualizada correctamente');
  }
};