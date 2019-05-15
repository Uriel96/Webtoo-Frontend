<template>
  <div class="component-container full-size tab-container">
    <component-property-definitions :componentId="componentId"/>
    <component-data-definitions :componentId="componentId"/>
    <component-function-definitions :componentId="componentId"/>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import ComponentPropertyDefinitions from '@/components/ComponentPropertyDefinitions.vue';
import ComponentDataDefinitions from '@/components/ComponentDataDefinitions.vue';
import ComponentFunctionDefinitions from '@/components/ComponentFunctionDefinitions.vue';

@Component({
  components: {
    'component-property-definitions': ComponentPropertyDefinitions,
    'component-data-definitions': ComponentDataDefinitions,
    'component-function-definitions': ComponentFunctionDefinitions,
  },
})
export default class ComponentPropertiesTab extends ExtendedVue {
  @Prop() public componentId!: string;
}
</script>

<style scoped>
.component-container {
  padding: 10px;
}
.container-form {
  margin: 0 0 5px !important;
}
</style>
