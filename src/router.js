import { Router } from '@vaadin/router';
import './layout.js';
import '../src/components/EmployeeList.js';
import '../src/components/EmployeeForm.js';

const routes = [
  {
    path: '/',
    component: 'main-layout',
    children: [
      {
        path: '/',
        component: 'employee-list',
      },
      {
        path: '/add-employee',
        component: 'employee-form',
        action: (context, commands) => {
          const form = document.createElement('employee-form');
          form.mode = 'add';
          return form;
        },
      },
      {
        path: '/edit-employee',
        component: 'employee-form',
        action: (context, commands) => {
          const params = new URLSearchParams(context.search);
          const employeeId = params.get('id');
          if (!employeeId) {
            return commands.redirect('/');
          }

          const form = document.createElement('employee-form');
          form.mode = 'edit';
          form.employeeId = employeeId;
          return form;
        },
      },
    ],
  },
];

const outlet = document.getElementById('app');
const router = new Router(outlet);
router.setRoutes(routes);
