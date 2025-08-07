import { showSuccessNotification } from '../composables/notification.js';
import { axiosCreate } from '../utils/axios-create.js';

const apiClient = axiosCreate('representative');

export const getRepresentatives = async () => await apiClient.get('/');
export const getRepresentative = async (id) => await apiClient.get(`/${id}`);
export const patchRepresentative = async (id, data) => {
  const response = await apiClient.patch(`/${id}`, data);
  if (response.status === 200 || response.status === 202) {
    showSuccessNotification('Representante actualizado correctamente');
  }
};
