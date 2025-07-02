import { axiosCreate } from '../../config/axios-create.js';

const AFC = axiosCreate('afc');

export async function getCICIndefiniteWorker(date) {
  try {
    const response = await AFC.get(`/date/${date}`);
    return response.data.cicIndefiniteWorker;
  } catch (error) {
    console.error(error);
  }
}
