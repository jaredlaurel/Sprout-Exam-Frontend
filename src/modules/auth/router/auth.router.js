/**
 * Module dependencies.
 */
import signin from '../views/auth.signin.view.vue';

/**
 * Router configuration
 */
export default [
  {
    path: '/',
    name: 'Signin',
    component: signin,
    meta: {
      icon: 'fa-solid fa-user',
      display: false, // hide from drawer any time
    },
  },
];
