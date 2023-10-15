/**
 * Getters: get state
 */
/* eslint-disable */
const getters = {
  isLoggedIn: (state) => !!state.cookieExpire,
  authStatus: (state) => state.status,
  auth: (state) => state.auth,
  mail: (state) => state.mail,
};

/**
 * Actions
 */
const actions = (app) => {
  const config = app.config.globalProperties.config;
  const api = `${config.api.protocol}://${config.api.host}:${config.api.port}/${config.api.base}`;
  return {
    signin: async ({ commit, dispatch }, params) => {
      try {
        // const res = await app.config.globalProperties.axios.post(`${api}/${config.api.endPoints.auth}/signin`, params);
        const res = {
          'data': {
          'user': {
              '_id': '5ef1be30b53e89657f8578e8',
              'id': '5ef1be30b53e89657f8578e8',
              'firstName': 'test',
              'lastName': 'test',
              'email': 'test@waos.me',
              'avatar': 'b266d75da05b17a986b6d745ecdc0bd418d1bb2e2360f82873d4836354761ad1.jpeg',
              'roles': [
                  'user'
              ],
              'provider': 'local',
              'updatedAt': '2022-04-20T07:13:46.183Z',
              'createdAt': '2020-06-23T08:32:48.520Z',
              'terms': '2022-04-20T07:13:46.175Z'
          },
          'tokenExpiresIn': 1697790481082,
          'type': 'sucess',
          'message': 'Sign in'
      }}
        localStorage.setItem(`${config.cookie.prefix}UserRoles`, res.data.user.roles);
        localStorage.setItem(`${config.cookie.prefix}CookieExpire`, res.data.tokenExpiresIn);
        commit('auth_success', res.data);
        dispatch('refreshNav');
      } catch (err) {
        localStorage.removeItem('token');
        commit('auth_error', err);
      }
    },
    signout: ({ commit }) =>
      new Promise((resolve) => {
        commit('auth_logout');
        localStorage.removeItem(`${config.cookie.prefix}UserRoles`);
        localStorage.removeItem(`${config.cookie.prefix}CookieExpire`);
        resolve();
      }
    ),
  };
};

/**
 * Mutation: change state in a Vuex store is by committing a mutation
 */
const mutations = {
  auth_success(state, data) {
    state.auth = true;
    state.cookieExpire = data.tokenExpiresIn;
    state.user = data.user;
  },
  auth_error(state, err) {
    console.log(err);
  },
  auth_logout(state) {
    state.auth = false;
    state.cookieExpire = 0;
  },
};

/**
 * State
 */
const state = (app) => {
  return {
    cookieExpire: localStorage.getItem(`${app.config.globalProperties.config.cookie.prefix}CookieExpire`) || 0,
    auth: false,
    mail: {
      status: false,
      message: '',
    },
  };
};

/**
 * Export default
 */
export default (app) => {
  return {
    state: state(app),
    getters,
    actions: actions(app),
    mutations,
  };
};
