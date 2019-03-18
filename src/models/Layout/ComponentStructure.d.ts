import { VueConstructor } from 'vue';

export interface ComponentStructure {
  component: VueConstructor;
  min?: number;
  max?: number;
  default?: number;
  opened: boolean;
}
