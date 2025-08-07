import { axiosCreate } from '../../config/axios-create.js';

const provisionalIndicator = axiosCreate('provisional-indicator');

export async function getMaxTaxIncomeAFP(date) {
  try {
    const response = await provisionalIndicator.get(`/date/${date}`);
    return response.data.maxTaxIncomeAFP;
  } catch (error) {
    console.error(error);
  }
}

export async function getMaxTaxIncomeINP(date) {
  try {
    const response = await provisionalIndicator.get(`/date/${date}`);
    return response.data.maxTaxIncomeINP;
  } catch (error) {
    console.error(error);
  }
}

export async function getMaxTaxIncomeAFC(date) {
  try {
    const response = await provisionalIndicator.get(`/date/${date}`);
    return response.data.maxTaxIncomeAFC;
  } catch (error) {
    console.error(error);
  }
}

export async function getMinTaxIncomeDepIndep(date) {
  try {
    const response = await provisionalIndicator.get(`/date/${date}`);
    return response.data.minTaxIncomeDepIndep;
  } catch (error) {
    console.error(error);
  }
}
