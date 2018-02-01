import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';

export default () => {
  return new Vuex.Store({
    modules: {
      user
    },
    getters
  })
}
