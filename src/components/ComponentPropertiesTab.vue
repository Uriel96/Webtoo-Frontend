<template>
  <div class="component-container">
    <h2 is="sui-header" inverted>Properties</h2>
    <sui-accordion exclusive styled>
      <div v-for="property in componentProperties" :key="property.id">
        <sui-accordion-title>
          {{property.name}}
          <sui-button
            @click.prevent.stop="removeProperty(property.id)"
            circular
            basic
            size="mini"
            icon="trash"
            floated="right"
          />
        </sui-accordion-title>
        <sui-accordion-content style="padding: 5px">
          <property-definition-fields :property="property"/>
        </sui-accordion-content>
      </div>
    </sui-accordion>
    <sui-button
      primary
      fluid
      icon="plus"
      @click="addProperty"
      size="small"
      style="margin-top: 8px"
    >Add Property</sui-button>
    <h2 is="sui-header" inverted>Data</h2>
    <sui-accordion exclusive styled>
      <div v-for="data in componentData" :key="data.id">
        <sui-accordion-title>
          {{data.name}}
          <sui-button
            @click.prevent.stop="removeData(data.id)"
            circular
            basic
            size="mini"
            icon="trash"
            floated="right"
          />
        </sui-accordion-title>
        <sui-accordion-content style="padding: 5px">
          <data-definition-fields :dataDef="data"/>
        </sui-accordion-content>
      </div>
    </sui-accordion>
    <sui-button
      primary
      fluid
      icon="plus"
      @click="addData"
      style="margin-top: 8px"
      size="small"
    >Add Data</sui-button>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { types } from '@/configuration/propertyType';
import PropertyDefinitionFields from '@/components/PropertyDefinitionFields.vue';
import DataDefinitionFields from '@/components/DataDefinitionFields.vue';

@Component({
  name: 'component-properties-tab',
  components: {
    'property-definition-fields': PropertyDefinitionFields,
    'data-definition-fields': DataDefinitionFields,
  },
})
export default class ComponentPropertiesTab extends ExtendedVue {
  @Prop() public componentId!: string;
  public typeProperties = types;

  get component() {
    return this.editor.getComponent(this.componentId);
  }
  get componentProperties() {
    if (!this.component) {
      return;
    }
    return this.component.dynamicDefinitions.properties;
  }
  get componentData() {
    if (!this.component) {
      return;
    }
    return this.component.dynamicDefinitions.data;
  }

  public addProperty() {
    if (!this.component) {
      return;
    }
    this.component.dynamicDefinitions.properties.push({ id: '', name: '', type: 'text-property', defaultValue: '' });
  }
  public removeProperty(propertyId: string) {
    if (!this.component) {
      return;
    }
    this.component.dynamicDefinitions.properties =
      this.component.dynamicDefinitions.properties.filter((x) => x.id !== propertyId);
  }
  public removeData(dataId: string) {
    if (!this.component) {
      return;
    }
    this.component.dynamicDefinitions.data =
      this.component.dynamicDefinitions.data.filter((x) => x.id !== dataId);
  }
  public addData() {
    if (!this.component) {
      return;
    }
    this.component.dynamicDefinitions.data.push({ id: '', name: '', type: 'text-property', initialValue: '' });
  }
}
</script>

<style scoped>
.component-container {
  margin: 10px;
}
.container-form {
  margin: 0 0 5px !important;
}
</style>
