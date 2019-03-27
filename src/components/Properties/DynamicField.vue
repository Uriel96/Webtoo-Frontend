<template>
  <sui-dropdown
    selection
    fluid
    floating
    placeholder="Dynamic data"
    v-model="selectedDynamicData"
    @input="updateDynamic"
    :options="dynamicOptions"
  ></sui-dropdown>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import { PropertyDefinition } from '@/models';

@Component({})
export default class DynamicField extends ExtendedVue {
  @Prop() public propertyDef!: PropertyDefinition;
  @Prop() public value!: string;

  public selectedDynamicData = this.value;

  get componentDynamicData() {
    const { currentComponentDefinitionData } = this.editor;
    if (!currentComponentDefinitionData) {
      return [];
    }
    const { properties, data } = currentComponentDefinitionData.dynamicDefinitions;
    return [...properties, ...data];
  }
  get validDynamicData() {
    return this.componentDynamicData
      .filter((property) => property.type === this.propertyDef.type);
  }
  get dynamicOptions() {
    return this.validDynamicData.map((property) => ({
      text: property.name,
      value: property.id,
    }));
  }

  public updateDynamic(value: string) {
    this.$emit('input', value);
  }
}
</script>


<style scoped>
</style>
