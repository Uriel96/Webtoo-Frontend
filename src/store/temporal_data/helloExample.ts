import { ComponentDefinitionData } from '@/models';

export const helloExample: ComponentDefinitionData = {
  name: 'HelloExample',
  entryId: 'div-1',
  contentTemplate: `<div><design-entry></design-entry></div>`,
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
      component: 'SuiButton',
      path: 'semantic-ui-vue',
      properties: {
      },
      slots: {
        content: {
          type: 'static',
          value: 'Click Me!',
        },
      },
    },
  },
  style: {
    'my-class': 'background-color: blue; padding: 10px;',
    'other-class': 'width: 50%;',
  },
  globals: [
    'SemanticUIVue',
  ],
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
    },
    {
      src:
        'https://unpkg.com/semantic-ui-vue/dist/umd/semantic-ui-vue.min.js',
    },
  ],
  links: [
    {
      href:
        'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css',
    },
  ],
  properties: {
    isActive: {
      name: 'Is Active',
      type: 'boolean-property',
      defaultValue: '',
      dummy: true,
    },
    title: {
      name: 'Title',
      type: 'text-property',
      defaultValue: '',
      dummy: 'circle',
    },
  },
  data: {},
  slots: {},
  methods: {
    handleClick: {
      parameters: ['e'],
      code: 'this.setState({ isActive: !this.state.isActive});',
    },
  },
};
