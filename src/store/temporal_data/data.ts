import { ComponentsDefinitionData } from '@/models';
import { helloExample } from './helloExample';
import { example2 } from './example2';
import { suibutton } from './suibutton';
import { vbtn } from './vbtn';
import { div } from './div';

export const componentsDefinitionData: ComponentsDefinitionData = {
  'user1/pack1/HelloExample': helloExample,
  'user2/pack1/Example2': example2,
  'semantic-ui-vue/SuiButton': suibutton,
  'vuetify/VBtn': vbtn,
  'div': div,
};
