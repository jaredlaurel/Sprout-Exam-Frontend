/**
 * Module dependencies.
 */
import employees from '../views/employees.view.vue';
import employee from '../views/employee.view.vue';

/**
 * Router configuration
 */
export default [
  {
    path: '/employees',
    name: 'Employee',
    component: employees,
    meta: {
      icon: 'fa-solid fa-person',
    },
  },
  {
    path: '/employee',
    name: 'employee create',
    component: employee,
    meta: {
      display: false,
      roles: ['user'],
    },
  },
  {
    path: '/employee/:id',
    name: 'view employee',
    component: employee,
    meta: {
      display: false,
      roles: ['user'],
    },
  },
];
