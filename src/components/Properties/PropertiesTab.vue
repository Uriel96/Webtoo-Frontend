<template>
  <div class="properties-container">
    <sui-form inverted @submit.prevent.stop="() => {}">
      <properties-title :selectedComponent="selectedComponent"/>
      <sui-accordion exclusive inverted>
        <sui-accordion-title active>
          <sui-icon name="dropdown"/>Properties
        </sui-accordion-title>
        <sui-accordion-content active>
          <!-- Properties Fields -->
          <div v-for="property in properties" :key="property.name">
            <component
              :is="getPropertyComponent(property)"
              :propertyDef="property"
              :propertyData="getPropertyData(property.id)"
            />
          </div>
        </sui-accordion-content>
        <sui-accordion-title active>
          <sui-icon name="dropdown"/>Slots
        </sui-accordion-title>
        <sui-accordion-content active>
          <!-- Slots Fields -->
          <div v-for="slot in slots" :key="slot.name">
            <component
              :is="getPropertyComponent(slot)"
              :propertyId="slot.id"
              :propertyDef="slot"
              :propertyData="getSlotData(slot.id)"
            />
          </div>
        </sui-accordion-content>
      </sui-accordion>
    </sui-form>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import { PropertyDefinition } from '@/models';
import PropertiesTitle from '@/components/Properties/PropertiesTitle.vue';
import { mapTypesToComponent } from '@/configuration/propertyType';
import { get } from '@/utilities';
import { SlotDefinition } from '@/models/SlotDefinitionData';

@Component({
  name: 'properties-tab',
  components: {
    'properties-title': PropertiesTitle,
  },
})
export default class PropertiesTab extends ExtendedVue {
  get selectedComponent() {
    return this.editor.selectedComponent;
  }
  get properties() {
    const { selectedComponentInfo } = this.editor;
    return selectedComponentInfo ? selectedComponentInfo.dynamicDefinitions.properties : [];
  }
  get slots() {
    const { selectedComponentInfo } = this.editor;
    return selectedComponentInfo ? selectedComponentInfo.slots : [];
  }

  public getPropertyData(propertyId: string) {
    return this.editor.selectedPropertyData(propertyId);
  }
  public getSlotData(slotId: string) {
    return this.editor.selectedSlotData(slotId);
  }
  public getPropertyComponent(property: PropertyDefinition) {
    return mapTypesToComponent[property.type];
  }
}
</script>

<style scoped>
.properties-container {
  margin: 10px;
}
</style>
