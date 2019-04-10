import TextProperty from '@/plugins/properties/TextProperty.vue';
import OptionsProperty from '@/plugins/properties/OptionsProperty.vue';
import BooleanProperty from '@/plugins/properties/BooleanProperty.vue';
import StyleProperty from '@/plugins/properties/StyleProperty.vue';
import ListProperty from '@/plugins/properties/ListProperty.vue';
import TextField from '@/plugins/properties/TextField.vue';
import OptionsField from '@/plugins/properties/OptionsField.vue';
import BooleanField from '@/plugins/properties/BooleanField.vue';
import StyleField from '@/plugins/properties/StyleField.vue';
import ListField from '@/plugins/properties/ListField.vue';

export const types = [
  {
    value: 'text-property',
    text: 'Text',
    icon: 'font',
    component: TextProperty,
    field: TextField,
  },
  {
    value: 'options-property',
    text: 'Options',
    icon: 'map signs',
    component: OptionsProperty,
    field: OptionsField,
  },
  {
    value: 'boolean-property',
    text: 'Boolean',
    icon: 'question circle',
    component: BooleanProperty,
    field: BooleanField,
  },
  {
    value: 'style-property',
    text: 'Style',
    icon: 'paint brush',
    component: StyleProperty,
    field: StyleField,
  },
  {
    value: 'list-property',
    text: 'List',
    icon: 'numbered list',
    component: ListProperty,
    field: ListField,
  },
];
