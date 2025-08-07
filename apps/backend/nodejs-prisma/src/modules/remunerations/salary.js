import { axiosCreate } from '../../config/axios-create.js';

const salary = axiosCreate('salary');

export async function getSalaryLabel(id) {
  try {
    const response = await salary.get(id);
    // console.log(response.data);
    return response.data.name;
  } catch (error) {
    console.error(error);
  }
}

export async function getSalaryTaxable(id) {
  try {
    const response = await salary.get(id);
    // console.log(response.data);
    return response.data.taxable;
  } catch (error) {
    console.error(error);
  }
}

export async function getSalaryProportional(id) {
  try {
    const response = await salary.get(id);
    // console.log(response.data);
    return response.data.proportional;
  } catch (error) {
    console.error(error);
  }
}
