<template>
  <sui-dropdown selection fluid floating :value="value" @input="handleInput" :options="options"/>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import { PropertyDefinition, PropertyData } from '@/models';

@Component
export default class OptionsField extends ExtendedVue {
  @Prop() public value!: any;
  @Prop() public options!: any[];

  public handleInput(e: any) {
    this.$emit('input', e);
  }
}
</script>

<style scoped>
</style>
