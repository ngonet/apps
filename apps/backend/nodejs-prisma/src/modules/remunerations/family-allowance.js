import { axiosCreate } from '../../config/axios-create.js';

const familyAllowance = axiosCreate('family-allowance');

export async function getFamilyAllowanceAmount(salary, date) {
  try {
    const response = await familyAllowance.get(`/salary/${salary}/date/${date}`);
    if (response.data[0]) {
      return response.data[0].amount;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}

// export async function getFamilyAllowance(amount, burdens) {
//    const response = amount * burdens;
//    return response
// }
