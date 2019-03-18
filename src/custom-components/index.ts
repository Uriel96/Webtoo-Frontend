import IFrame from './IFrame.vue';
import FieldsGroup from './FieldsGroup.vue';
import Vue, { VueConstructor } from 'vue';

const components: { [name: string]: VueConstructor<Vue> } = {
  'i-frame': IFrame,
  'fields-group': FieldsGroup,
};

export default {
  install(vue: VueConstructor<Vue>, options: any) {
    for (const [name, component] of Object.entries(components)) {
      vue.component(name, component);
    }
  },
};
