import { axiosCreate } from '../../config/axios-create.js';

const remunerationSalary = axiosCreate('remuneration-salary');

export async function postRemunerationSalary(data) {
  try {
    const response = await remunerationSalary.post('/', data);
    return response.data.id;
  } catch (error) {
    console.error(error);
  }
}
