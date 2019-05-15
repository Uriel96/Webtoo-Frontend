import { ComponentInfo } from '@/models';

export const semanticExample: ComponentInfo = {
  id: 'UrielS/MyPack/SemanticExample',
  libraryId: 'UrielS/MyPack',
  name: 'Semantic Example',
  tagName: 'sui-example',
  entryId: 'div-1',
  elements: [
    {
      id: 'div-1',
      name: 'Main Container',
      componentId: 'main/div',
      parentId: null,
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
          id: 'default',
          type: 'static',
          value: ['input-1', 'button-1', 'list-1'],
        },
      ],
      events: [],
    },
    {
      id: 'input-1',
      name: 'New Todo Input',
      componentId: 'semantic-ui-vue/SuiInput',
      parentId: 'div-1',
      properties: [
        {
          id: 'placeholder',
          type: 'static',
          value: 'Add your TODO',
        },
        {
          id: 'value',
          type: 'dynamic',
          dynamicId: '$newTodo',
          value: '',
        },
      ],
      slots: [],
      events: [
        {
          id: 'input',
          type: 'dynamic',
          arguments: [{ id: 'index', type: 'event' }],
          dynamicId: '$updateNewTodo',
        },
      ],
    },
    {
      id: 'button-1',
      name: 'Add Todo Button',
      componentId: 'semantic-ui-vue/SuiButton',
      parentId: 'div-1',
      properties: [
        {
          id: 'positive',
          type: 'static',
          value: 'true',
        },
        {
          id: 'content',
          type: 'static',
          value: 'Add',
        },
      ],
      slots: [],
      events: [
        {
          id: 'click',
          type: 'static',
          arguments: [],
          dynamicId: '$addTodo',
        },
      ],
    },
    {
      id: 'list-1',
      name: 'List Todo Container',
      componentId: 'semantic-ui-vue/SuiList',
      parentId: 'div-1',
      properties: [
        {
          id: 'divided',
          type: 'static',
          value: 'true',
        },
      ],
      slots: [
        {
          id: 'default',
          type: 'static',
          value: ['list-item-1'],
        },
      ],
      events: [],
    },
    {
      id: 'list-item-1',
      name: 'Todo Items',
      componentId: 'semantic-ui-vue/SuiListItem',
      parentId: 'list-1',
      repeated: true,
      repeat: {
        listId: '$todos',
        item: {
          id: 'todo',
          name: 'Todo',
          type: 'text',
        },
        index: {
          id: '$index',
          name: 'Index',
          type: 'text',
        },
      },
      properties: [
      ],
      slots: [
        {
          id: 'default',
          type: 'static',
          value: ['p-1', 'button-2'],
        },
      ],
      events: [],
    },
    {
      id: 'p-1',
      name: 'New Todo Label',
      componentId: 'main/span',
      parentId: 'list-item-1',
      properties: [
      ],
      slots: [
        {
          id: 'default',
          type: 'dynamic',
          value: '',
          dynamicId: 'todo',
        },
      ],
      events: [],
    },
    {
      id: 'button-2',
      name: 'Remove Todo Button',
      componentId: 'semantic-ui-vue/SuiButton',
      parentId: 'list-item-1',
      properties: [
        {
          id: 'icon',
          type: 'static',
          value: 'trash',
        },
        {
          id: 'basic',
          type: 'static',
          value: 'true',
        },
        {
          id: 'floated',
          type: 'static',
          value: 'right',
        },
        {
          id: 'negative',
          type: 'static',
          value: 'true',
        },
      ],
      slots: [],
      events: [
        {
          id: 'click',
          type: 'static',
          dynamicId: '$removeTodo',
          arguments: [{ dynamicId: '$index', type: 'dynamic' }],
        },
      ],
    },
  ],
  style: [
    {
      id: 'my-class',
      name: 'My Class',
      type: 'class',
      value: 'background-color: blue;\npadding: 10px;',
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
        id: '$newTodo',
        name: 'New Todo',
        type: 'text',
        initialValue: '',
        dummy: 'Create a TODO app',
      },
      {
        id: '$todos',
        name: 'Todos',
        type: 'list',
        initialValue: [],
        dummy: ['Pickup trash', 'Do nonsense'],
      },
    ],
    functions: [
      {
        id: '$addTodo',
        name: 'Add Todo',
        parameters: [
        ],
        type: 'text',
        code: '  this.todos.push(this.newTodo);\n  this.newTodo = \'\';',
      },
      {
        id: '$removeTodo',
        name: 'Remove Todo',
        parameters: [
          {
            id: '$index',
            name: 'Index',
            type: 'text',
          },
        ],
        type: 'text',
        code: '  this.todos.splice(index, 1);',
      },
      {
        id: '$updateNewTodo',
        name: 'Update New Todo',
        parameters: [
          {
            id: '$e',
            name: 'Event',
            type: 'text',
          },
        ],
        type: 'text',
        code: '  this.newTodo = event;',
        dummy: 'something',
      },
    ],
    properties: [
    ],
    events: [],
  },
};
