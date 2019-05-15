import { ComponentInfo } from '@/models';

export const suilist: ComponentInfo = {
  id: 'semantic-ui-vue/SuiList',
  libraryId: 'semantic-ui-vue',
  name: 'SuiList',
  tagName: 'sui-list',
  slots: [
    {
      id: 'default',
      name: 'Default',
      type: 'list',
      defaultValue: [],
    },
  ],
  dynamicDefinitions: {
    data: [],
    functions: [],
    properties: [
      {
        id: 'bulleted',
        name: 'Bulleted',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        id: 'divided',
        name: 'Divided',
        type: 'boolean',
        defaultValue: 'false',
      },
    ],
    events: [
    ],
  },
};

export const suilistitem: ComponentInfo = {
  id: 'semantic-ui-vue/SuiListItem',
  libraryId: 'semantic-ui-vue',
  name: 'SuiListItem',
  tagName: 'sui-list-item',
  slots: [
    {
      id: 'default',
      name: 'Default',
      type: 'list',
      defaultValue: '',
    },
  ],
  dynamicDefinitions: {
    data: [],
    functions: [],
    properties: [
    ],
    events: [
    ],
  },
};
