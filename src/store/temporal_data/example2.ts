import { ComponentDefinitionData } from '@/models';

export const example2: ComponentDefinitionData = {
  name: 'Example2',
  entryId: 'div-1',
  contentTemplate: `<v-app><design-entry></design-entry></v-app>`,
  globals: [
    'Vuetify',
  ],
  template: {
    'div-1': {
      name: 'Div 1',
      element: 'div',
      properties: {
        align: {
          type: 'static',
          value: 'center',
        },
        class: {
          type: 'static',
          value: [],
        },
      },
      slots: {
        children: {
          type: 'static',
          value: ['button-1'],
        },
      },
    },
    'button-1': {
      name: 'Button 1',
      component: 'VBtn',
      path: 'vuetify',
      properties: {
        color: {
          type: 'static',
          value: 'primary',
          dynamicId: null,
        },
        round: {
          type: 'static',
          value: true,
          dynamicId: null,
        },
      },
      slots: {
        default: {
          type: 'static',
          value: 'Click Me!',
        },
      },
    },
  },
  style: {
  },
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
    },
    {
      src:
        'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.js',
    },
  ],
  links: [
    {
      href:
        'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',
    },
  ],
  properties: {
  },
  slots: {},
  data: {
  },
  methods: {
  },
};
