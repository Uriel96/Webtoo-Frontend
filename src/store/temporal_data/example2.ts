import { ComponentInfo } from '@/models';

export const example2: ComponentInfo = {
  id: 'user2/pack1/Example2',
  libraryId: 'user2/pack1',
  name: 'Example2',
  tagName: 'example-2',
  entryId: 'div-1',
  elements: [
    {
      id: 'div-1',
      name: 'Div 1',
      parentId: null,
      componentId: 'main/div',
      properties: [
        {
          id: 'align',
          type: 'static',
          value: 'center',
        },
        {
          id: 'class',
          type: 'static',
          value: [],
        },
      ],
      slots: [
        {
          id: 'children',
          type: 'static',
          value: ['button-1'],
        },
      ],
      events: [],
    },
    {
      id: 'button-1',
      name: 'Button 1',
      parentId: 'div-1',
      componentId: 'vuetify/VBtn',
      properties: [
        {
          id: 'color',
          type: 'static',
          value: 'primary',
          dynamicId: null,
        },
        {
          id: 'round',
          type: 'static',
          value: 'true',
          dynamicId: null,
        },
      ],
      slots: [
        {
          id: 'default',
          type: 'static',
          value: 'Click Me!',
        },
      ],
      events: [],
    },
  ],
  style: [],
  slots: [],
  dynamicDefinitions: {
    data: [],
    functions: [],
    properties: [],
    events: [],
  },
};
