import { showSuccessNotification, showErrorNotification } from '../composables/notification.js';
import { axiosCreate } from '../utils/axios-create.js';

const apiClient = axiosCreate('rbmn');

export const getRbmns = async () => await apiClient.get('/');
export const getRbmn = async (id) => await apiClient.get(`/${id}`);

export const createRbmn = async (data) => {
  try {
    const response = await apiClient.post('/', data);
    if (response.status === 200 || response.status === 201) {
      showSuccessNotification('Registro creado con éxito');
      return response.data;
    }
  } catch (error) {
    showErrorNotification(error.response?.data?.message || error.message);
    return error;
  }
};

export const patchRbmn = async (id, data) => {
  try {
    const response = await apiClient.patch(`/${id}`, data);
    if (response.status === 200 || response.status === 201) {
      showSuccessNotification('Registro actualizado con éxito');
      return response.data;
    }
  } catch (error) {
    showErrorNotification(error.response?.data?.message || error.message);
    return error;
  }
};

export const deleteRbmn = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    if (response.status === 200 || response.status === 204) {
      showSuccessNotification('Registro eliminado con éxito');
      return response;
    }
  } catch (error) {
    showErrorNotification(error.response?.data?.message || error.message);
    return error;
  }
};
