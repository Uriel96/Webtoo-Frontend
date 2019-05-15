<template>
  <input inverted type="number" :value="value" @input="handleInput" :placeholder="placeholder">
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class TextField extends ExtendedVue {
  @Prop() public value!: any;
  @Prop() public placeholder!: string;

  public handleInput(e: any) {
    this.$emit('input', e.target.value);
  }
}
</script>

<style scoped>
</style>
