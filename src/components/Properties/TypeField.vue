<template>
  <sui-dropdown
    :icon="null"
    class="type-field"
    selection
    fluid
    floating
    v-model="selectedType"
    @input="updateType"
    :options="propertyTypes"
  ></sui-dropdown>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';

export const propertyTypes = [
  {
    value: 'static',
    image: {
      size: 'mini',
      src: '/img/icons/static.png',
    },
  },
  {
    value: 'dynamic',
    image: {
      src: '/img/icons/dynamic.gif',
    },
  },
];

@Component
export default class TypeFiled extends ExtendedVue {
  @Prop() public value!: string;

  public propertyTypes = propertyTypes;
  public selectedType = this.value;

  public updateType(value: string): void {
    this.$emit('input', value);
  }
}
</script>


<style scoped>
.type-field {
  padding-left: 10px !important;
  padding-right: 5px !important;
  vertical-align: middle !important;
  text-align: center !important;
  border-color: transparent !important;
  background-color: #d7d8d8 !important;
}
</style>
