import { axiosCreate } from '../../config/axios-create.js';

const discountRemuneration = axiosCreate('discount-remuneration');

export async function postDiscountRemuneration(data) {
  try {
    const response = await discountRemuneration.post('/', data);
    return response.data.id;
  } catch (error) {
    console.error(error);
  }
}
