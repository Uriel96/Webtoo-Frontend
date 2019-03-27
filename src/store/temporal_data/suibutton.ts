import { ComponentInfo } from '@/models';

export const suibutton: ComponentInfo = {
  id: 'semantic-ui-vue/SuiButton',
  libraryId: 'semantic-ui-vue',
  name: 'SuiButton',
  slots: [],
  dynamicDefinitions: {
    data: [],
    functions: [],
    properties: [
      {
        id: 'primary',
        name: 'Primary',
        type: 'boolean-property',
        defaultValue: 'true',
      },
      {
        id: 'icon',
        name: 'Icon',
        type: 'options-property',
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
        type: 'options-property',
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
        type: 'text-property',
        defaultValue: 'Content',
      },
      {
        id: 'fluid',
        name: 'Fluid',
        type: 'boolean-property',
        defaultValue: 'true',
      },
    ],
  },
};
