import TextProperty from '@/plugins/properties/TextProperty.vue';
import OptionsProperty from '@/plugins/properties/OptionsProperty.vue';
import BooleanProperty from '@/plugins/properties/BooleanProperty.vue';
import StyleProperty from '@/plugins/properties/StyleProperty.vue';
import ListProperty from '@/plugins/properties/ListProperty.vue';
import { PropertyBindings } from '@/models';

export const mapTypesToComponent: PropertyBindings = {
  'text-property': TextProperty,
  'options-property': OptionsProperty,
  'boolean-property': BooleanProperty,
  'style-property': StyleProperty,
  'list-property': ListProperty,
};
