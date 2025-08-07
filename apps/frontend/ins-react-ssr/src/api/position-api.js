import { axiosCreate } from '../utils/axios-create.js';
import { showSuccessNotification, showErrorNotification } from '@/composables/notification.js';

const apiClient = axiosCreate('position');

export const getPositions = async () => await apiClient.get('/');

export const getPositionsParent = async () => await apiClient.get('/parent');

export const getPosition = async (id) => await apiClient.get(`/${id}`);

export const createPosition = async (data) => {
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

export const patchPosition = async (id, data) => {
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

export const deletePosition = async (id) => {
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
