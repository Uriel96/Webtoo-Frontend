<template>
  <container class="drop-container">
    <component-wrapper
      :entryId="componentDefinitionData.entryId"
      :componentDefinitionData="componentDefinitionData"
      :componentsDefinitionData="componentsDefinitionData"
    ></component-wrapper>
  </container>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import ComponentWrapper from '@/components/ComponentWrapper.vue';
import { Container } from 'vue-smooth-dnd';

@Component({
  components: {
    'component-wrapper': ComponentWrapper,
    'container': Container,
  },
})
export default class DesignEntry extends ExtendedVue {
  get componentDefinitionData() {
    return this.editor.currentComponentDefinitionData;
  }
  get componentsDefinitionData() {
    return this.editor.componentsDefinitionData;
  }
}
</script>

<style scoped>
.drop-container {
  width: 100% !important;
  pointer-events: auto !important;
}
</style>
