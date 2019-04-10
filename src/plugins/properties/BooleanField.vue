<template>
  <option-field :value="value" @input="handleInput" :options="options"/>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import OptionsField from '@/plugins/properties/OptionsField.vue';
import { PropertyDefinition, PropertyData } from '@/models';

const booleanOptions = [
  { value: 'true', text: 'Yes' },
  { value: 'false', text: 'No' },
];

@Component({
  components: {
    'option-field': OptionsField,
  },
})
export default class BooleanField extends ExtendedVue {
  @Prop() public value!: any;
  public options = booleanOptions;

  public handleInput(e: any) {
    this.$emit('input', e);
  }
}
</script>

<style scoped>
</style>
