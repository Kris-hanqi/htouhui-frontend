import ServiceApi from './server-api';

let Vue = null;
let service = null;

export function setVue(VueObj) {
  Vue = VueObj
}

export function getService() {
  service = Vue.axios.create({
    baseURL: ServiceApi()
  });

  return service;
}

export default getService;

