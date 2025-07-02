import { axiosCreate } from '../../config/axios-create.js';

const remuneration = axiosCreate('remuneration');

export async function getRemunerationDaysWorked(id) {
  try {
    const response = await remuneration.get(id);
    return response.data.days;
  } catch (error) {
    console.error(error);
  }
}

export async function getRemunerationExtraHours(id) {
  try {
    const response = await remuneration.get(id);
    return response.data.extraHours;
  } catch (error) {
    console.error(error);
  }
}

export async function postRemuneration(data) {
  try {
    const response = await remuneration.post('/', data);
    return response.data.id;
  } catch (error) {
    console.error(error);
  }
}

export async function updateRemuneration(id, data) {
  try {
    const response = await remuneration.patch(id, data);
    return response.data.id;
  } catch (error) {
    console.error(error);
  }
}
