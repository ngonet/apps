import { axiosCreate } from '../utils/axios-create.js';

const apiClient = axiosCreate('document');

export const getDocuments = async () => await apiClient.get('/');
export const getDocument = async (id) => await apiClient.get(`/${id}`);
export const getDocumentsByPersonId = async (personId) =>
  await apiClient.get(`/person/${personId}`);
