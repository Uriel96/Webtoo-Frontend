import { ComponentInfo } from '@/models';

export const div: ComponentInfo = {
  id: 'main/div',
  libraryId: 'main',
  name: 'Div',
  tagName: 'div',
  isHTMLTag: true,
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
        id: 'align',
        name: 'Align',
        type: 'options',
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
        type: 'style',
        defaultValue: [],
      },
    ],
    events: [],
  },
};
