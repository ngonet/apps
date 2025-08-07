import { axiosCreate } from '../../config/axios-create.js';

const healthPerson = axiosCreate('health-person');

export async function getHealthPersonFactor(person) {
  try {
    const response = await healthPerson.get(`/person/${person}`);
    return response.data.health.rate;
  } catch (error) {
    console.error(error);
  }
}

export async function getHealthPersonPlanValue(person) {
  try {
    const response = await healthPerson.get(`/person/${person}`);
    return response.data.planValue;
  } catch (error) {
    console.error(error);
  }
}
