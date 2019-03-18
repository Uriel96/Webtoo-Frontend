import { ComponentDefinitionData } from '@/models';

export const suibutton: ComponentDefinitionData = {
  name: 'SuiButton',
  properties: {
    'primary': {
      name: 'Primary',
      type: 'boolean-property',
      defaultValue: 'true',
    },
    'icon': {
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
    'label-position': {
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
    'content': {
      name: 'Content',
      type: 'text-property',
      defaultValue: 'Content',
    },
    'fluid': {
      name: 'Fluid',
      type: 'boolean-property',
      defaultValue: 'true',
    },
  },
  slots: {},
  data: {},
  methods: {},
};
