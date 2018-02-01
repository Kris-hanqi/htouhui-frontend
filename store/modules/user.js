import { setToken, removeToken } from '../../utils/auth';

const user = {
  state: {
    token: '',                          // 会话标识
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
    }
  },
  actions: {}
};

export default user;
