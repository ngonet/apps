import axios from 'axios';
import xml2js from 'xml2js';
import { BCENTRAL_API_USER, BCENTRAL_API_PASS, BCENTRAL_API_URL } from '../config/process-env.js';

// TODO check SOAPAction
const HEADERS = {
  'Content-Type': 'text/xml;charset=UTF-8',
  SOAPAction: 'http://bancocentral.org/GetSeries',
};

/**
 * Fetches SOAP data for a specific series on bancocentral.org .
 * @param {string} firstDate - Start date (YYYY-MM-DD).
 * @param {string} lastDate - End date (YYYY-MM-DD).
 * @param {string} seriesId - Series ID to query.
 * @returns {Promise<Object>} - Returns the processed data from the SOAP API.
 */
const fetchData = async (firstDate, lastDate, seriesId) => {
  // TODO podria mejorar esto ?
  const xmlBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ban="http://bancocentral.org/">
      <soapenv:Header/>
      <soapenv:Body>
        <ban:GetSeries>
          <ban:user>${BCENTRAL_API_USER}</ban:user>
          <ban:password>${BCENTRAL_API_PASS}</ban:password>
          <ban:firstDate>${firstDate}</ban:firstDate>
          <ban:lastDate>${lastDate}</ban:lastDate>
          <ban:seriesIds>
            <ban:string>${seriesId}</ban:string>
          </ban:seriesIds>
        </ban:GetSeries>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const { data } = await axios.post(BCENTRAL_API_URL, xmlBody, { headers: HEADERS });

    return new Promise((resolve, reject) => {
      xml2js.parseString(data, { explicitArray: false }, (err, result) => {
        if (err) {
          console.error(`Error parsing XML for ${seriesId}:`, err);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  } catch (error) {
    console.error(
      `Error during the SOAP request for ${seriesId}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default fetchData;
