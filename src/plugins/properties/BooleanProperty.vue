<template>
  <options-property :propertyDef="extendedPropertyDef" :propertyId="propertyId"></options-property>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import OptionsProperty from '@/plugins/properties/OptionsProperty.vue';
import { PropertyDefinitionData } from '@/models';

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
  @Prop() public propertyDef!: PropertyDefinitionData;
  @Prop() public propertyId!: string;

  get extendedPropertyDef() {
    return { ...this.propertyDef, data: booleanOptions };
  }
}
</script>

<style scoped>
</style>
