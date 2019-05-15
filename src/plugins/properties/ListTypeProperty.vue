<template>
  <sui-form-field>
    <label>List of:</label>
    <sui-dropdown
      selection
      fluid
      floating
      placeholder="None"
      v-model="definition.type"
      :options="types"
    ></sui-dropdown>
  </sui-form-field>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import { PropertyData, Definition } from '@/models';
import { types } from '@/configuration/propertyType';

@Component({})
export default class ListProperty extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public elementId!: string;
  @Prop() public definition!: Definition;
  @Prop() public propertyData!: PropertyData;
  public types = types;
}
</script>

<style scoped>
</style>
