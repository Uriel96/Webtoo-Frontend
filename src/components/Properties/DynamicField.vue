<template>
  <sui-dropdown
    selection
    fluid
    floating
    placeholder="Dynamic data"
    v-model="selectedDynamicData"
    @input="updateDynamic"
    :options="dynamicOptions"
    style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;"
  ></sui-dropdown>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import { PropertyDefinitionData, Properties } from '@/models';

@Component({})
export default class DynamicField extends ExtendedVue {
  @Prop() public propertyDef!: PropertyDefinitionData;
  @Prop() public value!: string;

  public selectedDynamicData = this.value;

  get componentDynamicData(): Properties {
    return this.editor.currentComponentDefinitionData.properties;
  }
  get validDynamicData(): Properties {
    return Object.entries(this.componentDynamicData)
      .filter(([key, value]) => value.type === this.propertyDef.type)
      .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
  }
  get dynamicOptions(): Array<{
    text: string;
    value: string;
  }> {
    return Object.entries(this.validDynamicData).map(([key, value]) => ({
      text: key,
      value: key,
    }));
  }

  public updateDynamic(value: string): void {
    this.$emit('input', value);
  }
}
</script>


<style scoped>
</style>
