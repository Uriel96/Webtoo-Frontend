import { ComponentInfo } from '@/models';

export const paragraph: ComponentInfo = {
  id: 'main/paragraph',
  libraryId: 'main',
  name: 'Paragraph',
  tagName: 'p',
  isHTMLTag: true,
  slots: [
    {
      id: 'default',
      name: 'Default',
      type: 'text',
      defaultValue: '',
      dummy: 'A dummy value',
    },
  ],
  dynamicDefinitions: {
    data: [],
    functions: [],
    properties: [
    ],
    events: [],
  },
};

export const span: ComponentInfo = {
  id: 'main/span',
  libraryId: 'main',
  name: 'Span',
  tagName: 'span',
  isHTMLTag: true,
  slots: [
    {
      id: 'default',
      name: 'Default',
      type: 'text',
      defaultValue: '',
      dummy: 'A dummy value',
    },
  ],
  dynamicDefinitions: {
    data: [],
    functions: [],
    properties: [
    ],
    events: [],
  },
};
