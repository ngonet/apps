import { useMemo, useState } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { AppContext } from './app-context';

export const AppProvider = ({ children }) => {
  const [companyId, setCompanyId] = useState(import.meta.env.VITE_COMPANY_ID);

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
