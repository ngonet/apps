import { useMemo, useState } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { AppContext } from './app-context';
import dotenv from 'dotenv';
dotenv.config();

export const AppProvider = ({ children }) => {
  const [companyId, setCompanyId] = useState(process.env.COMPANY_ID);

  const value = useMemo(
    () => ({
      companyId,
      setCompanyId,
    }),
    [companyId]
  );

  return (
    <AppContext.Provider value={value}>
      <ReactNotifications />
      {children}
    </AppContext.Provider>
  );
};
