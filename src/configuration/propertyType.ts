import TextProperty from '@/plugins/properties/TextProperty.vue';
import NumberProperty from '@/plugins/properties/NumberProperty.vue';
import OptionsProperty from '@/plugins/properties/OptionsProperty.vue';
import BooleanProperty from '@/plugins/properties/BooleanProperty.vue';
import StyleProperty from '@/plugins/properties/StyleProperty.vue';
import ListProperty from '@/plugins/properties/ListProperty.vue';
import TextField from '@/plugins/properties/TextField.vue';
import NumberField from '@/plugins/properties/NumberField.vue';
import OptionsField from '@/plugins/properties/OptionsField.vue';
import BooleanField from '@/plugins/properties/BooleanField.vue';
import StyleField from '@/plugins/properties/StyleField.vue';
import ListField from '@/plugins/properties/ListField.vue';

export const types = [
  {
    value: 'number',
    text: 'Number',
    icon: 'sort numeric down',
    realType: Number,
    component: NumberProperty,
    field: NumberField,
  },
  {
    value: 'text',
    text: 'Text',
    icon: 'font',
    realType: String,
    component: TextProperty,
    field: TextField,
  },
  {
    value: 'options',
    text: 'Options',
    icon: 'map signs',
    realType: String,
    component: OptionsProperty,
    field: OptionsField,
  },
  {
    value: 'boolean',
    text: 'Boolean',
    realType: Boolean,
    icon: 'question circle',
    component: BooleanProperty,
    field: BooleanField,
  },
  {
    value: 'style',
    text: 'Style',
    realType: String,
    icon: 'paint brush',
    component: StyleProperty,
    field: StyleField,
  },
  {
    value: 'list',
    text: 'List',
    realType: String,
    icon: 'numbered list',
    component: ListProperty,
    field: ListField,
  },
];

const models = [
  {
    value: 'options',
    text: 'Icon',
    icon: 'map signs',
    realType: String,
    component: OptionsProperty,
    field: OptionsField,
    data: [
      {
        value: null,
        text: 'None',
      },
      {
        value: 'left',
        text: 'Left',
        icon: 'hand point left outline',
      },
      {
        value: 'right',
        text: 'Right',
        icon: 'hand point right outline',
      },
    ],
  },
  {
    value: 'options',
    text: 'Icon',
    icon: 'map signs',
    realType: String,
    component: OptionsProperty,
    field: OptionsField,
    data: [
    ],
  },
];


