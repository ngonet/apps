import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSettings } from '../../config/app-settings.js';

const Content = () => {
  return (
    <AppSettings.Consumer>
      {({ appContentClass }) => (
        <div className={`app-content ${appContentClass}`}>
          <Outlet />
        </div>
      )}
    </AppSettings.Consumer>
  );
};

export default Content;
