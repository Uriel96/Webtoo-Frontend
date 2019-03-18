<template>
  <div class="properties-container">
    <sui-form inverted @submit.prevent.stop="() => {}">
      <properties-title :elementId="selectedComponentId" :selectedComponent="selectedComponent"/>

      <!-- Property Field -->
      <div v-for="(property, id) in properties" :key="property.name">
        <component :is="getPropertyComponent(property)" :propertyId="id" :propertyDef="property"/>
      </div>
    </sui-form>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import { Properties, PropertyDefinitionData } from '@/models';
import PropertiesTitle from '@/components/Properties/PropertiesTitle.vue';
import { mapTypesToComponent } from '@/configuration/propertyType';

@Component({
  name: 'properties-tab',
  components: {
    'properties-title': PropertiesTitle,
  },
})
export default class PropertiesTab extends ExtendedVue {
  get selectedComponentId() {
    return this.editor.selectedComponentId;
  }
  get selectedComponent() {
    return this.editor.selectedComponent;
  }
  get properties() {
    const selectedComponentInfo = this.editor.selectedComponentInfo;
    if (!selectedComponentInfo) {
      return ({} as Properties);
    }
    return selectedComponentInfo.properties;
  }

  public getPropertyComponent(property: PropertyDefinitionData) {
    return mapTypesToComponent[property.type];
  }
}
</script>

<style scoped>
.properties-container {
  margin: 10px;
}
</style>
