/**
 * Module dependencies.
 */
import { createStore } from 'vuex';
import core from '../core/stores/core.store';
import auth from '../auth/stores/auth.store';
import employees from '../employees/stores/employees.store';

const debug = process.env.NODE_ENV !== 'production';

/**
 * Vuex configuration
 */
const getStore = (app) => {
  return createStore({
    state: {
      name: 'Vue',
    },
    modules: {
      core: core(app),
      auth: auth(app),
      employees: employees(app),
    },
    strict: debug,
  });
};

export default getStore;
