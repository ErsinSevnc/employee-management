import { Router } from '@vaadin/router';
import './layout.js';
import '../src/components/EmployeeList.js';

const routes = [
  {
    path: '/',
    component: 'main-layout',
    children: [
      {
        path: '/',
        component: 'employee-list',
      },
      //TODO: Add other Navigations
    ],
  },
];

const outlet = document.getElementById('app');
const router = new Router(outlet);
router.setRoutes(routes);

