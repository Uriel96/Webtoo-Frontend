<template>
  <options-property :propertyDef="extendedPropertyDef" :propertyData="propertyData"/>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import OptionsProperty from '@/plugins/properties/OptionsProperty.vue';
import { PropertyDefinition, PropertyData } from '@/models';

const booleanOptions = {
  options: [
    { value: 'true', text: 'Yes' },
    { value: 'false', text: 'No' },
  ],
};

@Component({
  components: {
    'options-property': OptionsProperty,
  },
})
export default class BooleanProperty extends ExtendedVue {
  @Prop() public propertyDef!: PropertyDefinition;
  @Prop() public propertyData!: PropertyData;

  get extendedPropertyDef() {
    return { ...this.propertyDef, data: booleanOptions };
  }
}
</script>

<style scoped>
</style>
