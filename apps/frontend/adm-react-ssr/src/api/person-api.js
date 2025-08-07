import { showSuccessNotification, showErrorNotification } from '../composables/notification.js';
import { axiosCreate } from '../utils/axios-create.js';

const apiClient = axiosCreate('person');

export const getPersons = async () => await apiClient.get('/');
export const getPerson = async (id) => await apiClient.get(`/${id}`);
export const createPerson = async (data) => {
  try {
    const response = await apiClient.post('/', data);
    if (response.status === 200 || response.status === 201) {
      showSuccessNotification('Registro creado con éxito');
      return response.data;
    }
  } catch (error) {
    showErrorNotification(error.response?.data?.message || error.message);
    throw error;
  }
};
export const patchPerson = async (id, data) => {
  try {
    const response = await apiClient.patch(`/${id}`, data);
    if (response.status === 200 || response.status === 201) {
      showSuccessNotification('Registro actualizado con éxito');
      return response.data;
    }
  } catch (error) {
    showErrorNotification(error.response?.data?.message || error.message);
    throw error;
  }
};
