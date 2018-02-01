export const state = () => ({
  token: '123'
});

export const mutations = {
  SET_TOKEN(state, data) {
    state.token = data;
  }
};
