import { ComponentDefinitionData } from '@/models';

export const div: ComponentDefinitionData = {
  name: 'div',
  properties: {
    align: {
      name: 'Align',
      type: 'options-property',
      defaultValue: 'left',
      data: {
        options: [
          { value: 'left', text: 'Left' },
          { value: 'right', text: 'Right' },
          { value: 'center', text: 'Center' },
          { value: 'justify', text: 'Justify' },
        ],
      },
    },
    class: {
      name: 'Class',
      type: 'style-property',
      defaultValue: [],
    },
  },
  slots: {
    children: {
      name: 'Children',
      type: 'text-property',
      defaultValue: [],
    },
  },
  data: {},
  methods: {},
};
