const app = {
  state: {
    sidebar: {
      opened: true
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
    }
  },
  actions: {
    ToggleSidebar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR');
    }
  }
};

export default app;
