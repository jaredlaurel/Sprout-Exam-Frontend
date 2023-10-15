/**
 * Module dependencies.
 */
/* eslint-disable */
import _ from 'lodash';
import model from '../../../lib/middlewares/model';

const whitelists = [
  'first_name',
  'last_name',
  'email',
  'type',
  'number_of_leaves',
  'benefits',
  'contract_end_date',
  'project',
];

/**
 * Getters: get state
 */
const getters = {
  employee: (state) => state.employee,
  employees: (state) => state.employees,
};

/**
 * Actions
 */
const actions = (app) => {
  const config = app.config.globalProperties.config;
  const api = `${config.api.protocol}://${config.api.host}:${config.api.port}/${config.api.base}`;

  return {
    getEmployees: async ({ commit }) => {
      try {
        const res = await app.config.globalProperties.axios.get(`${api}/${config.api.endPoints.employee}/all`);
        commit('employees_set', res.data.data);
      } catch (err) {
        console.log(err)
      }
    },
    getEmployee: async ({ commit }, params) => {
      try {
        const res = await app.config.globalProperties.axios.get(`${api}/${config.api.endPoints.employee}/${params.id}`);
        return res.data
      } catch (err) {
        console.log(err)
      }
    },
    createEmployee: async ({ commit }, params) => {
      try {
        const obj = model.clean(params, whitelists);
        const res = await app.config.globalProperties.axios.post(`${api}/${config.api.endPoints.employee}/`, obj);
      } catch (err) {
        console.log(err)
      }
    },
    updateEmployee: async ({ commit, state }, params) => {
      try {
        const obj = model.clean(params.params, whitelists);
        const res = await app.config.globalProperties.axios.put(`${api}/${config.api.endPoints.employee}/${params.id}`, obj);
      } catch (err) {
        console.log(err)
      }
    },
    deleteEmployee: async ({ commit }, params) => {
      try {
        await app.config.globalProperties.axios.delete(`${api}/${config.api.endPoints.employee}/${params.id}`);
      } catch (err) {
        console.log(err)
      }
    },
  };
};

/**
 * Mutation: change state in a Vuex store is by committing a mutation
 */
const mutations = {
  employees_set(state, data) {
    state.employees = data;
  },
};

/**
 * State
 */
const state = () => ({
  employees: [],
});

/**
 * Export default
 */
export default (app) => {
  return {
    state,
    getters,
    actions: actions(app),
    mutations,
  };
};
