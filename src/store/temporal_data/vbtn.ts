import { ComponentDefinitionData } from '@/models';

export const vbtn: ComponentDefinitionData = {
  name: 'VBtn',
  properties: {
    'absolute': {
      name: 'Absolute',
      type: 'boolean-property',
      defaultValue: false,
    },
    'active-class': {
      name: 'Active Class',
      type: 'text-property',
      defaultValue: 'v-btn--active',
    },
    'append': {
      name: 'Append',
      type: 'boolean-property',
      defaultValue: false,
    },
    'block': {
      name: 'Block',
      type: 'boolean-property',
      defaultValue: false,
    },
    'color': {
      name: 'Color',
      type: 'text-property',
      defaultValue: 'primary',
    },
    'dark': {
      name: 'Dark',
      type: 'boolean-property',
      defaultValue: false,
    },
    'depressed': {
      name: 'Depressed',
      type: 'boolean-property',
      defaultValue: false,
    },
    'disabled': {
      name: 'Disabled',
      type: 'boolean-property',
      defaultValue: false,
    },
    'exact': {
      name: 'Exact',
      type: 'boolean-property',
      defaultValue: false,
    },
    'exact-active-class': {
      name: 'Exact Active Class',
      type: 'text-property',
      defaultValue: undefined,
    },
    'fab': {
      name: 'Fab',
      type: 'boolean-property',
      defaultValue: false,
    },
    'fixed': {
      name: 'Fixed',
      type: 'boolean-property',
      defaultValue: false,
    },
    'flat': {
      name: 'Flat',
      type: 'boolean-property',
      defaultValue: false,
    },
    'href': {
      name: 'Href',
      type: 'text-property',
      defaultValue: '',
    },
    'icon': {
      name: 'Icon',
      type: 'boolean-property',
      defaultValue: false,
    },
    'input-value': {
      name: 'Input Value',
      type: 'text-property',
      defaultValue: '',
    },
    'large': {
      name: 'Large',
      type: 'boolean-property',
      defaultValue: false,
    },
    'left': {
      name: 'Left',
      type: 'boolean-property',
      defaultValue: false,
    },
    'light': {
      name: 'Light',
      type: 'boolean-property',
      defaultValue: false,
    },
    'loading': {
      name: 'Loading',
      type: 'boolean-property',
      defaultValue: false,
    },
    'nuxt': {
      name: 'Nuxt',
      type: 'boolean-property',
      defaultValue: false,
    },
    'outline': {
      name: 'Outline',
      type: 'boolean-property',
      defaultValue: false,
    },
    'replace': {
      name: 'Replace',
      type: 'boolean-property',
      defaultValue: false,
    },
    'right': {
      name: 'Right',
      type: 'boolean-property',
      defaultValue: false,
    },
    'ripple': {
      name: 'Ripple',
      type: 'boolean-property',
      defaultValue: undefined,
    },
    'round': {
      name: 'Round',
      type: 'boolean-property',
      defaultValue: false,
    },
    'small': {
      name: 'Small',
      type: 'boolean-property',
      defaultValue: false,
    },
    'tag': {
      name: 'Tag',
      type: 'text-property',
      defaultValue: 'button',
    },
    'target': {
      name: 'Target',
      type: 'text-property',
      defaultValue: undefined,
    },
    'to': {
      name: 'To',
      type: 'text-property',
      defaultValue: undefined,
    },
    'top': {
      name: 'Top',
      type: 'boolean-property',
      defaultValue: false,
    },
    'type': {
      name: 'Type',
      type: 'text-property',
      defaultValue: 'button',
    },
    'value': {
      name: 'Value',
      type: 'text-property',
      defaultValue: '',
    },
  },
  slots: {
    default: {
      name: 'Children',
      type: 'text-property',
      defaultValue: 'Click Me!',
    },
  },
  data: {},
  methods: {},
};
