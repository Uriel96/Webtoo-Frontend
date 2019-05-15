import { ComponentInfo } from '@/models';

export const suiinput: ComponentInfo = {
  id: 'semantic-ui-vue/SuiInput',
  libraryId: 'semantic-ui-vue',
  name: 'SuiInput',
  tagName: 'sui-input',
  slots: [],
  dynamicDefinitions: {
    data: [],
    functions: [],
    properties: [
      {
        id: 'placeholder',
        name: 'Placeholder',
        type: 'text',
        defaultValue: '',
      },
      {
        id: 'disabled',
        name: 'Disabled',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        id: 'error',
        name: 'Error',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        id: 'focus',
        name: 'Focus',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        id: 'icon',
        name: 'Icon',
        type: 'options',
        defaultValue: null,
        data: {
          options: [
            { value: '', text: 'Empty' },
            { value: 'circle', text: 'Circle', icon: 'circle' },
            { value: 'heart', text: 'Heart', icon: 'heart' },
          ],
        },
      },
      {
        id: 'iconPosition',
        name: 'Icon Position',
        type: 'options',
        defaultValue: null,
        data: {
          options: [
            {
              value: 'left',
              text: 'Left',
              icon: 'hand point left outline',
            },
            {
              value: 'right',
              text: 'Right',
              icon: 'hand point right outline',
            },
          ],
        },
      },
      {
        id: 'inverted',
        name: 'Inverted',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        id: 'loading',
        name: 'Loading',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        id: 'transparent',
        name: 'Transparent',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        id: 'type',
        name: 'Type',
        type: 'text',
        defaultValue: 'text',
      },
      {
        id: 'value',
        name: 'Value',
        type: 'text',
        defaultValue: '',
      },
    ],
    events: [
      {
        id: 'input',
        name: 'Input',
        type: 'text',
        defaultValue: null,
      },
    ],
  },
};
