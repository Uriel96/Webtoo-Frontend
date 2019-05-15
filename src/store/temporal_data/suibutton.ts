import { ComponentInfo } from '@/models';

export const suibutton: ComponentInfo = {
  id: 'semantic-ui-vue/SuiButton',
  libraryId: 'semantic-ui-vue',
  name: 'SuiButton',
  tagName: 'sui-button',
  slots: [],
  dynamicDefinitions: {
    data: [],
    functions: [],
    properties: [
      {
        id: 'primary',
        name: 'Primary',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        id: 'icon',
        name: 'Icon',
        type: 'options',
        defaultValue: '',
        data: {
          options: [
            { value: '', text: 'Empty' },
            { value: 'circle', text: 'Circle', icon: 'circle' },
            { value: 'heart', text: 'Heart', icon: 'heart' },
          ],
        },
      },
      {
        id: 'label-position',
        name: 'Label position',
        type: 'options',
        defaultValue: null,
        data: {
          options: [
            {
              value: null,
              text: 'None',
            },
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
        id: 'floated',
        name: 'Floated',
        type: 'options',
        defaultValue: null,
        data: {
          options: [
            {
              value: null,
              text: 'None',
            },
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
        id: 'content',
        name: 'Content',
        type: 'text',
        defaultValue: '',
      },
      {
        id: 'fluid',
        name: 'Fluid',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        id: 'negative',
        name: 'Negative',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        id: 'positive',
        name: 'Positive',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        id: 'basic',
        name: 'Basic',
        type: 'boolean',
        defaultValue: 'false',
      },
    ],
    events: [
      {
        id: 'click',
        name: 'Click',
        type: 'boolean',
        defaultValue: null,
      },
    ],
  },
};
