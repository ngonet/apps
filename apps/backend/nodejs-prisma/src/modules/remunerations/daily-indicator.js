import { axiosCreate } from '../../config/axios-create.js';

const dailyIndicator = axiosCreate('daily-indicator');

export async function getUF(date) {
  try {
    const response = await dailyIndicator.get(`/date/${date}`);
    return response.data.uf;
  } catch (error) {
    console.error(error);
  }
}

export async function getUTM(date) {
  try {
    const response = await dailyIndicator.get(`/date/${date}`);
    return response.data.utm;
  } catch (error) {
    console.error(error);
  }
}
