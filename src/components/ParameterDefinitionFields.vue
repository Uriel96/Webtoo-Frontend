<template>
  <sui-form @submit.prevent.stop="() => {}" style="margin: 5px">
    <!-- Name -->
    <sui-form-field>
      <label>Name</label>
      <input v-model="parameterDef.name" placeholder="My Parameter">
    </sui-form-field>
    <!-- Type -->
    <sui-form-field>
      <label>Type</label>
      <sui-dropdown
        selection
        fluid
        floating
        placeholder="None"
        v-model="parameterDef.type"
        :options="types"
      ></sui-dropdown>
    </sui-form-field>
  </sui-form>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { types } from '@/configuration/propertyType';
import { ParameterDefinition } from '@/models';
import { toCamelCase } from '@/utilities';

@Component
export default class ParameterDefinitionFields extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public functionId!: string;
  @Prop() public parameterDef!: ParameterDefinition;
  public types = types;
}
</script>

<style scoped>
.parameter-editor {
  width: 100%;
  height: 400px;
}
</style>
