import Vue from 'vue';
import Router from 'vue-router';
import ComponentEditor from '@/views/ComponentEditor.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/editor/:componentId',
      name: 'ComponentEditor',
      component: ComponentEditor,
    },
  ],
});
