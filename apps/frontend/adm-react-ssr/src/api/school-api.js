import { showSuccessNotification } from '../composables/notification.js';
import { axiosCreate } from '../utils/axios-create.js';

const apiClient = axiosCreate('school');

export const getSchools = async () => await apiClient.get('/');
export const getSchoolsByCompanyId = async (companyId) => await apiClient.get(`/${companyId}`);
export const patchSchool = async (id, data) => {
  const response = await apiClient.patch(`/${id}`, data);
  if (response.status === 200 || response.status === 202) {
    showSuccessNotification('Colegio actualizado correctamente');
  }
};
