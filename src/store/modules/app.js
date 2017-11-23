import { getLocationUrl } from 'utils/index';

const app = {
  state: {
    baseUrl: getLocationUrl()
  },
  mutations: {
    SET_BASE_URL: (state, baseUrl) => {
      state.baseUrl = baseUrl;
    }
  }
};

export default app;
