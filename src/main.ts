import Vue from 'vue';
import VueHotkey from 'v-hotkey';
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import CustomComponents from '@/custom-components';
import editor from '@/store/modules/editor';
import App from '@/App.vue';

// Pass editor data
Vue.mixin({
  data() {
    return {
      editor,
    };
  },
});
// Add plugins
Vue.use(VueHotkey);
Vue.use(SuiVue);
Vue.use(CustomComponents);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
