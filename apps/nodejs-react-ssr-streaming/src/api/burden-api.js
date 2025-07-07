import { showSuccessNotification, showErrorNotification } from '../composables/notification.js';
import { axiosCreate } from '../utils/axios-create.js';

const apiClient = axiosCreate('burden');

export const getBurdens = async () => await apiClient.get('/');
export const getBurden = async (id) => await apiClient.get(`/${id}`);

export const createBurden = async (data) => {
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

export const patchBurden = async (id, data) => {
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

export const deleteBurden = async (id) => {
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
