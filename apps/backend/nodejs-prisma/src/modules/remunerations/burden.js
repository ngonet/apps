import { axiosCreate } from '../../config/axios-create.js';

const burden = axiosCreate('burden');

export async function getBurdenPerson(person) {
  try {
    const response = await burden.get(`/person/${person}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
