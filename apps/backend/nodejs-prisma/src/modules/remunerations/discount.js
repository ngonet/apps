import { axiosCreate } from '../../config/axios-create.js';

const discount = axiosCreate('discount');

export async function getDiscountLabel(id) {
  try {
    const response = await discount.get(id);
    // console.log(response.data);
    return response.data.name;
  } catch (error) {
    console.error(error);
  }
}
