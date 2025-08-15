import { axiosCreate } from '../../config/axios-create.js';

const document = axiosCreate('document');

export async function getDocument(id) {
  try {
    const response = await document.get(id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
