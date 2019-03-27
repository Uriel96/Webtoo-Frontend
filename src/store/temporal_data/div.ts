import { ComponentInfo } from '@/models';

export const div: ComponentInfo = {
  id: 'main/div',
  libraryId: 'main',
  name: 'div',
  isHTMLTag: true,
  slots: [
    {
      id: 'children',
      name: 'Children',
      type: 'list-property',
      defaultValue: [],
    },
  ],
  dynamicDefinitions: {
    data: [],
    functions: [],
    properties: [
      {
        id: 'align',
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
      {
        id: 'class',
        name: 'Class',
        type: 'style-property',
        defaultValue: [],
      },
    ],
  },
};
