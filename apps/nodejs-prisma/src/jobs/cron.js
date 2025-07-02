import cron from 'node-cron';
import { prisma } from '../config/prisma-client.js';
import { CRON_BCENTRAL_INTERVAL } from '../config/process-env.js';
import fetchData from './dailyIndicatorData.js';

let cronJob;

export const startCronJobs = () => {
  cronJob = cron.schedule(CRON_BCENTRAL_INTERVAL, async () => {
    console.log('Running bcentral SOAP request...');

    const todayISO = new Date().toISOString().split('T')[0];
    const today = new Date();

    const seriesIds = ['F073.UFF.PRE.Z.D', 'F073.UTR.PRE.Z.M'];
    let uf = null;
    let utm = null;

    for (const seriesId of seriesIds) {
      try {
        const response = await fetchData(todayISO, todayISO, seriesId);
        const value =
          response?.['soap:Envelope']?.['soap:Body']?.GetSeriesResponse?.GetSeriesResult?.Series
            ?.fameSeries?.obs?.value;

        console.log(`Value data for series ${seriesId}:`, value);
        if (seriesId === 'F073.UFF.PRE.Z.D') {
          uf = value;
        } else if (seriesId === 'F073.UTR.PRE.Z.M') {
          utm = parseInt(value, 10);
        }
      } catch (error) {
        console.error(`Error fetching data for series ${seriesId}:`, error);
      }
    }

    if (uf !== null && utm !== null) {
      try {
        const newRecord = await prisma.dailyIndicator.create({
          data: {
            date: today,
            uf: uf,
            utm: utm,
          },
        });
        console.log(`✅ Record inserted for ${todayISO}: UF = ${uf}, UTM = ${utm}`);
      } catch (error) {
        console.error('Error inserting data into the database:', error);
      }
    } else {
      console.log('Could not obtain valid values for UF and UTM.');
    }
  });

  console.log('Cron job started with interval ->', CRON_BCENTRAL_INTERVAL);
};

export const stopCronJobs = () => {
  if (cronJob) {
    cronJob.stop();
    console.log('Cron job stopped');
  }
};
