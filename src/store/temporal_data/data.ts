import { LibraryInfo, ComponentInfo } from '@/models';
import { semanticExample } from './suiExample';
import { example2 } from './example2';
import { suibutton } from './suibutton';
import { vbtn } from './vbtn';
import { div } from './div';
import { suiinput } from './suiinput';
import { paragraph, span } from './paragraph';
import { suilist, suilistitem } from './suiList';

export const temporalComponentsInfo: ComponentInfo[] = [
  semanticExample,
  example2,
  suibutton,
  suiinput,
  suilist,
  suilistitem,
  vbtn,
  div,
  paragraph,
  span,
];

export const libraries: LibraryInfo[] = [
  {
    id: 'UrielS/MyPack',
    name: 'User MyPack',
    globals: [],
    components: [
      'UrielS/MyPack/SemanticExample',
    ],
    dependencies: [
      {
        library: 'semantic-ui-vue',
      },
      {
        library: 'main',
      },
    ],
    scripts: [],
    links: [],
  },
  {
    id: 'user2/pack1',
    name: 'User2 Pack1',
    globals: [],
    components: [
      'user2/pack1/SayHello',
    ],
    dependencies: [
      {
        library: 'vuetify',
      },
      {
        library: 'main',
      },
    ],
    scripts: [],
    links: [],
    contentTemplate: `<v-app><design-entry /></v-app>`,
  },
  {
    id: 'vuetify',
    name: 'Vuetify',
    globals: [
      {
        name: 'Vuetify',
      },
    ],
    components: [
      'vuetify/VBtn',
    ],
    dependencies: [
    ],
    scripts: [
      {
        src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
      },
      {
        src:
          'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.js',
      },
    ],
    links: [
      {
        href:
          'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',
      },
    ],
  },
  {
    id: 'semantic-ui-vue',
    name: 'Semantic UI Vue',
    globals: [
      {
        name: 'SemanticUIVue',
      },
    ],
    components: [
      'semantic-ui-vue/SuiButton',
      'semantic-ui-vue/SuiInput',
      'semantic-ui-vue/SuiList',
      'semantic-ui-vue/SuiListItem',
    ],
    dependencies: [
    ],
    scripts: [
      {
        src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
      },
      {
        src:
          'https://unpkg.com/semantic-ui-vue/dist/umd/semantic-ui-vue.min.js',
      },
    ],
    links: [
      {
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css',
      },
    ],
  },
  {
    id: 'main',
    name: 'main',
    globals: [
    ],
    components: [
      'main/div',
      'main/paragraph',
      'main/span',
    ],
    dependencies: [
    ],
    scripts: [
    ],
    links: [
    ],
  },
];
