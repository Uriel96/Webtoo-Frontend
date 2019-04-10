<template>
  <sui-dropdown
    multiple
    search
    selection
    fluid
    :placeholder="placeholder"
    :value="value"
    @input="handleInput"
    :options="styleOptions"
  ></sui-dropdown>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import { PropertyDefinition, PropertyData } from '@/models';

@Component
export default class StyleField extends ExtendedVue {
  @Prop() public value!: any;
  @Prop() public placeholder!: string;

  get styles() {
    if (!this.editor.currentComponent) {
      return;
    }
    return this.editor.currentComponent.style;
  }
  get styleOptions() {
    if (!this.styles) {
      return [];
    }
    const classes = this.styles.map((x) => ({ value: x.id, text: x.name }));
    return classes;
  }

  public handleInput(e: any) {
    this.$emit('input', e);
  }
}
</script>

<style scoped>
</style>
