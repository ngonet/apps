import { axiosCreate } from '../../config/axios-create.js';

const AFPPerson = axiosCreate('afp-person');

export async function getAFPPersonDependentFactor(person) {
  try {
    const response = await AFPPerson.get(`/person/${person}`);
    return response.data.afp.dependentRate;
  } catch (error) {
    console.error(error);
  }
}
