<template>
  <div class="properties-container">
    <sui-form inverted @submit.prevent.stop="() => {}">
      <properties-title :componentId="componentId" :elementId="elementId"/>
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
          <div v-for="slot in slots" :key="slot.id">
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
import { Component, Prop } from 'vue-property-decorator';
import { PropertyDefinition } from '@/models';
import PropertiesTitle from '@/components/Properties/PropertiesTitle.vue';
import { mapTypesToComponent } from '@/configuration/propertyType';
import { SlotDefinition } from '@/models/SlotDefinitionData';

@Component({
  name: 'properties-tab',
  components: {
    'properties-title': PropertiesTitle,
  },
})
export default class PropertiesTab extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public elementId!: string;

  get properties() {
    const { selectedComponent } = this.editor;
    return selectedComponent ? selectedComponent.dynamicDefinitions.properties : [];
  }
  get slots() {
    const { selectedComponent } = this.editor;
    return selectedComponent ? selectedComponent.slots : [];
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
