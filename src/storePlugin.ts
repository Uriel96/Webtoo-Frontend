import store from '@/store';

export default {
  store,
  install(Vue: any, options: any) {
    Vue.prototype.$store = store;
  },
};
