const Menu = [
  {
    path: 'dashboard',
    icon: 'fa fa-sitemap',
    title: 'Dashboard',
    children: [
      { path: '/dashboard/v1', title: 'Dashboard v1' },
      { path: '/dashboard/v2', title: 'Dashboard v2' },
    ],
  },
  { path: '/indicator', icon: 'fa fa-chart-line', title: 'Indicadores' },
  { path: '/maintainer', icon: 'fa fa-cogs', title: 'Mantenedor' },
  { path: '/career', icon: 'fa fa-graduation-cap', title: 'Carrera Docente' },
  { path: '/person', icon: 'fa fa-users', title: 'Funcionários' },
  {
    path: '/page-option',
    icon: 'fa fa-cogs',
    title: 'Page Options',
    label: 'NEW',
    children: [{ path: '/page-option/blank', title: 'Blank Page' }],
  },
  {
    path: '/user',
    icon: 'fa fa-key',
    title: 'Login & Register',
    children: [
      { path: '/user/login-v1', title: 'Login' },
      { path: '/user/login-v2', title: 'Login v2' },
      { path: '/user/login-v3', title: 'Login v3' },
    ],
  },
];

export default Menu;
