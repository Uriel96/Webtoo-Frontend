import { ComponentInfo } from '@/models';

export const suiinput: ComponentInfo = {
  id: 'semantic-ui-vue/SuiInput',
  libraryId: 'semantic-ui-vue',
  name: 'SuiInput',
  slots: [],
  dynamicDefinitions: {
    data: [],
    functions: [],
    properties: [
      {
        id: 'placeholder',
        name: 'Placeholder',
        type: 'text-property',
        defaultValue: 'My Input',
      },
      {
        id: 'disabled',
        name: 'Disabled',
        type: 'boolean-property',
        defaultValue: 'false',
      },
      {
        id: 'error',
        name: 'Error',
        type: 'boolean-property',
        defaultValue: 'false',
      },
      {
        id: 'focus',
        name: 'Focus',
        type: 'boolean-property',
        defaultValue: 'false',
      },
      {
        id: 'icon',
        name: 'Icon',
        type: 'options-property',
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
        type: 'options-property',
        defaultValue: 'left',
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
        type: 'boolean-property',
        defaultValue: 'false',
      },
      {
        id: 'loading',
        name: 'Loading',
        type: 'boolean-property',
        defaultValue: 'false',
      },
      {
        id: 'transparent',
        name: 'Transparent',
        type: 'boolean-property',
        defaultValue: 'false',
      },
      {
        id: 'type',
        name: 'Type',
        type: 'text-property',
        defaultValue: 'text',
      },
      {
        id: 'value',
        name: 'Value',
        type: 'text-property',
        defaultValue: '',
      },
    ],
  },
};
