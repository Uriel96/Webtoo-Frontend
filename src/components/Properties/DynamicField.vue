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
  @Prop() public elementId!: string;
  @Prop() public value!: string;

  public selectedDynamicData = this.value;

  get componentDynamicData() {
    const { currentComponent } = this.editor;
    if (!currentComponent) {
      return [];
    }
    const { properties, data } = currentComponent.dynamicDefinitions;
    const definitions = this.editor.getExternalDefinitions(this.editor.currentComponent!.id, this.elementId)
      .flatMap((x) => [x.item, x.index]);
    return [...properties, ...data, ...definitions];
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
