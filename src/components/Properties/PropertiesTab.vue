<template>
  <div class="properties-container full-size tab-container">
    <properties-title :componentId="componentId" :elementId="elementId"/>
    <!-- Properties -->
    <h3
      is="sui-header"
      align="center"
      inverted
      style="margin-top: 8px; margin-bottom: 2px;"
    >Properties</h3>
    <component-defintions
      :definitions="properties"
      addTitle="Add Property to Element"
      emptyMessage="No properties added to the element"
      @add="() => showAddProperty = true"
      @remove="removeProperty"
    >
      <template #content="{definition}">
        <sui-form @submit.prevent.stop="() => {}">
          <sui-form-field>
            <label>Type</label>
            <sui-dropdown
              floating
              selection
              fluid
              v-model="getPropertyData(definition.id).type"
              :options="propertyTypes"
            />
          </sui-form-field>
          <sui-form-field v-if="getPropertyData(definition.id).type == 'static'">
            <label>Static Value</label>
            <component
              :is="getPropertyComponent(definition)"
              v-model="getPropertyData(definition.id).value"
            />
          </sui-form-field>
          <sui-form-field v-else>
            <label>Dynamic Value</label>
            <dynamic-field
              :elementId="elementId"
              v-model="getPropertyData(definition.id).dynamicId"
              :propertyDef="definition"
            />
          </sui-form-field>
        </sui-form>
      </template>
    </component-defintions>

    <!-- Slots -->
    <h3 is="sui-header" align="center" inverted style="margin-top: 8px; margin-bottom: 2px;">Slots</h3>
    <component-defintions
      :definitions="slots"
      addTitle="Add Slot to Element"
      emptyMessage="No slots added to the element"
    >
      <template #content="{definition}">
        <sui-form @submit.prevent.stop="() => {}">
          <sui-form-field>
            <label>Type</label>
            <sui-dropdown
              floating
              selection
              fluid
              v-model="getSlotData(definition.id).type"
              :options="propertyTypes"
            />
          </sui-form-field>
          <sui-form-field v-if="getSlotData(definition.id).type == 'static'">
            <label>Static Value</label>
            <component
              :is="getPropertyComponent(definition)"
              v-model="getSlotData(definition.id).value"
            />
          </sui-form-field>
          <sui-form-field v-else>
            <label>Dynamic Value</label>
            <dynamic-field
              :elementId="elementId"
              v-model="getSlotData(definition.id).dynamicId"
              :propertyDef="definition"
            />
          </sui-form-field>
        </sui-form>
      </template>
    </component-defintions>

    <sui-accordion exclusive inverted>
      <!-- Slots -->
      <sui-accordion-title>
        <sui-icon name="dropdown"/>Slots
      </sui-accordion-title>
      <sui-accordion-content class="no-padding">
        <div v-for="slot in slots" :key="slot.id">
          <component
            :is="getPropertyComponent(slot)"
            :elementId="elementId"
            :propertyDef="slot"
            :propertyData="getSlotData(slot.id)"
          />
        </div>
      </sui-accordion-content>

      <!-- Events -->
      <sui-accordion-title>
        <sui-icon name="dropdown"/>Events
      </sui-accordion-title>
      <sui-accordion-content class="no-padding">
        <events-data :componentId="componentId" :elementId="elementId"/>
      </sui-accordion-content>

      <!-- Display -->
      <sui-accordion-title>
        <sui-icon name="dropdown"/>Display
      </sui-accordion-title>
      <sui-accordion-content class="no-padding">
        <repeat-info :componentId="componentId" :elementId="elementId"/>
      </sui-accordion-content>
    </sui-accordion>

    <sui-modal v-model="showAddProperty">
      <sui-modal-content>
        <sui-modal-description>
          <sui-header>{{ elementInfo.name }}</sui-header>
          <sui-form-field>
            <label>Property</label>
            <sui-dropdown
              floating
              selection
              fluid
              v-model="newPropertyId"
              :options="propertiesOptions"
            />
          </sui-form-field>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="addProperty">OK</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { PropertyDefinition, SlotDefinition, EventDefinition, ElementInfo } from '@/models';
import PropertiesTitle from '@/components/Properties/PropertiesTitle.vue';
import { types } from '@/configuration/propertyType';
import DynamicField from './DynamicField.vue';
import EventsData from './EventsData.vue';
import RepeatInfo from '@/components/Properties/RepeatInfo.vue';
import ComponentDefinitions from '@/components/ComponentDefinitions.vue';
import { get } from '../../utilities';

export const propertyTypes = [
  {
    value: 'static',
    text: 'Static',
    image: {
      size: 'mini',
      src: require('@/assets/static.png'),
    },
  },
  {
    value: 'dynamic',
    text: 'Dynamic',
    image: {
      src: require('@/assets/dynamic.gif'),
    },
  },
];

@Component({
  name: 'properties-tab',
  components: {
    'properties-title': PropertiesTitle,
    'dynamic-field': DynamicField,
    'events-data': EventsData,
    'repeat-info': RepeatInfo,
    'component-defintions': ComponentDefinitions,
  },
})
export default class PropertiesTab extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public elementId!: string;
  public propertyTypes = propertyTypes;
  public showAddProperty = false;
  public newPropertyId: string | null = null;

  get properties() {
    const componentInfo = this.editor.getElementComponent(this.componentId, this.elementId);
    const props = componentInfo ? componentInfo.dynamicDefinitions.properties : [];
    const newProps = props.filter((prop) => {
      return get(this.propertiesData, prop.id);
    });
    return newProps;
  }
  get propertiesOptions() {
    const componentInfo = this.editor.getElementComponent(this.componentId, this.elementId);
    const props = componentInfo ? componentInfo.dynamicDefinitions.properties : [];
    const newProps = props.filter((prop) => {
      return !get(this.propertiesData, prop.id);
    });
    return newProps.map((x) => ({ value: x.id, text: x.name }));
  }
  get elementInfo() {
    return this.editor.getElement(this.componentId, this.elementId);
  }
  get propertiesData() {
    return this.elementInfo ? this.elementInfo.properties : [];
  }
  get slots() {
    const { selectedComponent } = this.editor;
    return selectedComponent ? selectedComponent.slots : [];
  }

  public getPropertyDef(propertyId: string) {
    const componentInfo = this.editor.getElementComponent(this.componentId, this.elementId);
    const props = componentInfo ? componentInfo.dynamicDefinitions.properties : [];
    return get(props, propertyId);
  }
  public getPropertyData(propertyId: string) {
    return this.editor.selectedPropertyData(propertyId);
  }
  public getSlotData(slotId: string) {
    return this.editor.selectedSlotData(slotId);
  }
  public getPropertyComponent(property: PropertyDefinition) {
    const type = types.find((x) => x.value === property.type);
    if (!type) {
      return;
    }
    return type.field;
  }
  public addProperty() {
    if (this.elementInfo && this.newPropertyId) {
      this.elementInfo.properties.push({ id: this.newPropertyId, type: 'static', value: undefined });
      this.newPropertyId = null;
      this.showAddProperty = false;
    }
  }
  public removeProperty(id: string) {
    if (this.elementInfo) {
      this.elementInfo.properties = this.elementInfo.properties.filter((x) => x.id !== id);
    }
  }
}
</script>

<style scoped>
.properties-container {
  padding: 10px;
}
</style>
