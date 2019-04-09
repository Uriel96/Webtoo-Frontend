import { ComponentInfo } from '@/models';

export const helloExample: ComponentInfo = {
  id: 'user1/pack1/HelloExample',
  libraryId: 'user1/pack1',
  name: 'HelloExample',
  entryId: 'div-1',
  elements: [
    {
      id: 'div-1',
      name: 'Div 1',
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
          value: ['button-1', 'button-2'],
        },
      ],
    },
    {
      id: 'button-1',
      name: 'Button 1',
      componentId: 'semantic-ui-vue/SuiButton',
      properties: [],
      slots: [
        {
          id: 'content',
          type: 'static',
          value: 'Click Me!',
        },
      ],
    },
    {
      id: 'button-2',
      name: 'Button 2',
      componentId: 'semantic-ui-vue/SuiButton',
      properties: [],
      slots: [
        {
          id: 'content',
          type: 'static',
          value: 'Click Me 2!',
        },
      ],
    },
  ],
  style: [
    {
      id: 'my-class',
      name: 'My Class',
      type: 'class',
      value: 'background-color: blue; padding: 10px;',
    },
    {
      id: 'other-class',
      name: 'Other Class',
      type: 'class',
      value: 'width: 50%;',
    },
  ],
  slots: [],
  dynamicDefinitions: {
    data: [
      {
        id: 'isActive',
        name: 'Is Active',
        type: 'boolean-property',
        initialValue: true,
        dummy: true,
      },
    ],
    functions: [],
    properties: [
      {
        id: 'title',
        name: 'Title',
        type: 'text-property',
        defaultValue: '',
        dummy: 'circle',
      },
    ],
  },
};
