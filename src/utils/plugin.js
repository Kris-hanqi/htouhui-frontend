function plugins(Vue, axios) {
  let installed = false;

  if (installed) return;

  installed = true;

  if (!axios) return;

  Vue.axios = axios;

  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return axios
      }
    }
  })
}

export default plugins;
