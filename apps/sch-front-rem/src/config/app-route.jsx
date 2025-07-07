import { Outlet, Navigate } from 'react-router-dom';
import App from '../App';
import CareerPage from '../pages/career/career-page';
import DashboardV1 from '../pages/dashboard/dashboard-v1';
import DashboardV2 from '../pages/dashboard/dashboard-v2';
import Error from '../pages/error/error';
import IndicatorPage from '../pages/indicator/indicator-page';
import MaintainerPage from '../pages/maintainer/maintainer-page';
import PageBlank from '../pages/option/page-blank';
import PersonDetailsPage from '../pages/person/person-details';
import PersonPage from '../pages/person/person-page';
import SettingPage from '../pages/setting/setting-page';
import LoginV1 from '../pages/user/login-v1';
import LoginV2 from '../pages/user/login-v2';
import LoginV3 from '../pages/user/login-v3';

const AppRoute = [
  {
    path: '*',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard/v1" />,
      },
      {
        path: 'setting',
        element: <SettingPage />,
      },
      {
        path: 'dashboard/*',
        element: <Outlet />,
        children: [
          { path: 'v1', element: <DashboardV1 /> },
          { path: 'v2', element: <DashboardV2 /> },
          { path: '*', element: <Error /> },
        ],
      },
      {
        path: 'indicator',
        element: <IndicatorPage />,
      },
      {
        path: 'maintainer',
        element: <MaintainerPage />,
      },
      {
        path: 'career',
        element: <CareerPage />,
      },
      {
        path: 'person',
        element: <PersonPage />,
      },
      {
        path: 'person/:id',
        element: <PersonDetailsPage />,
      },
      {
        path: 'page-option/*',
        element: <Outlet />,
        children: [
          { path: 'blank', element: <PageBlank /> },
          { path: '*', element: <Error /> },
        ],
      },
      {
        path: 'user/*',
        element: <Outlet />,
        children: [
          { path: 'login-v1', element: <LoginV1 /> },
          { path: 'login-v2', element: <LoginV2 /> },
          { path: 'login-v3', element: <LoginV3 /> },
          { path: '*', element: <Error /> },
        ],
      },
      { path: '*', element: <Error /> },
    ],
  },
];

export default AppRoute;
