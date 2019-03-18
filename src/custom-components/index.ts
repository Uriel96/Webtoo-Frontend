import IFrame from './IFrame.vue';
import FieldsGroup from './FieldsGroup.vue';
import Vue, { VueConstructor } from 'vue';

const components: Array<VueConstructor<Vue>> = [
  IFrame,
  FieldsGroup,
];

export default {
  install(vue: VueConstructor<Vue>, options: any) {
    for (const component of components) {
      vue.component(component.name, component);
    }
  },
};
