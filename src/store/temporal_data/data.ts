import { LibraryInfo, ComponentInfo } from '@/models';
import { helloExample } from './helloExample';
import { example2 } from './example2';
import { suibutton } from './suibutton';
import { vbtn } from './vbtn';
import { div } from './div';
import { suiinput } from './suiinput';

export const temporalComponentsInfo: ComponentInfo[] = [
  helloExample,
  example2,
  suibutton,
  suiinput,
  vbtn,
  div,
];

export const libraries: LibraryInfo[] = [
  {
    id: 'user1/pack1',
    name: 'User Pack1',
    globals: [],
    components: [
      'user1/pack1/HelloExample',
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
    ],
    dependencies: [
    ],
    scripts: [
    ],
    links: [
    ],
  },
];
