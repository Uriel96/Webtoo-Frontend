<template>
  <sui-form @submit.prevent.stop="() => {}" style="margin: 5px">
    <sui-form-field>
      <label>Name</label>
      <input v-model="dataDef.name" placeholder="My Property">
    </sui-form-field>
    <sui-form-field>
      <label>Value Type</label>
      <sui-dropdown
        selection
        fluid
        floating
        placeholder="Type"
        v-model="dataDef.type"
        :options="types"
      ></sui-dropdown>
    </sui-form-field>
    <sui-form-field>
      <label>Initial Value</label>
      <component :is="fieldComponent" v-model="dataDef.initialValue" placeholder="Empty"/>
    </sui-form-field>
    <sui-form-field>
      <label>Dummy</label>
      <component :is="fieldComponent" v-model="dataDef.dummy" placeholder="Empty"/>
    </sui-form-field>
  </sui-form>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { types } from '@/configuration/propertyType';
import { DataDefinition } from '@/models';

@Component
export default class DataDefinitionFields extends ExtendedVue {
  @Prop() public dataDef!: DataDefinition;
  public types = types;

  get fieldComponent() {
    const type = this.types.find((x) => x.value === this.dataDef.type);
    if (!type) {
      return;
    }
    return type.field;
  }
}
</script>

<style scoped>
</style>
