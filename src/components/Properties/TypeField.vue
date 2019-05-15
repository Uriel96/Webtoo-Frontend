<template>
  <sui-dropdown :icon="icon" floating button v-model="selectedType">
    <sui-dropdown-menu>
      <sui-dropdown-item
        v-for="propType in propertyTypes"
        :key="propType.value"
        @click="updateType"
        :icon="propType.icon"
        :text="propType.text"
      ></sui-dropdown-item>
    </sui-dropdown-menu>
  </sui-dropdown>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';

export const propertyTypes = [
  {
    value: 'static',
    icon: 'circle',
    text: 'Static',
    /*image: {
      size: 'mini',
      src: require('@/assets/static.png'),
    },*/
  },
  {
    value: 'dynamic',
    icon: 'dot circle',
    text: 'Dynamic',
    /*image: {
      src: require('@/assets/dynamic.gif'),
    },*/
  },
];

@Component
export default class TypeFiled extends ExtendedVue {
  @Prop() public value!: string;

  public propertyTypes = propertyTypes;
  public selectedType = this.value;

  get icon() {
    const propType = this.propertyTypes.find((x) => x.value === this.value);
    if (!propType) {
      return null;
    }
    return propType.icon;
  }

  public updateType(value: any): void {
    const propType = this.propertyTypes.find((x) => x.text === value.target.textContent);
    if (!propType) {
      return;
    }
    this.$emit('input', propType.value);
  }
}
</script>


<style scoped>
</style>
