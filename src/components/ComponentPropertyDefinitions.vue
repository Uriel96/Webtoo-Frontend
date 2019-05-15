<template>
  <div>
    <h3
      is="sui-header"
      align="center"
      inverted
      style="margin-top: 8px; margin-bottom: 2px;"
    >Properties</h3>
    <component-defintions
      :definitions="componentProperties"
      addTitle="Add Property"
      emptyMessage="No Properties Added"
      @add="addProperty"
      @remove="removeProperty"
    >
      <template #content="{definition}">
        <property-definition-fields :componentId="componentId" :propertyDef="definition"/>
      </template>
    </component-defintions>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import PropertyDefinitionFields from '@/components/PropertyDefinitionFields.vue';
import GroupContainer from '@/components/GroupContainer.vue';
import { createUID } from '@/utilities';
import ComponentDefinitions from '@/components/ComponentDefinitions.vue';

@Component({
  components: {
    'property-definition-fields': PropertyDefinitionFields,
    'group-container': GroupContainer,
    'component-defintions': ComponentDefinitions,
  },
})
export default class ComponentPropertyDefinitions extends ExtendedVue {
  @Prop() public componentId!: string;

  get component() {
    return this.editor.getComponent(this.componentId);
  }
  get componentProperties() {
    if (!this.component) {
      return;
    }
    return this.component.dynamicDefinitions.properties;
  }

  public addProperty() {
    if (!this.component) {
      return;
    }
    this.component.dynamicDefinitions.properties.push({ id: createUID(), name: '', type: 'text', defaultValue: '' });
  }
  public removeProperty(propertyId: string) {
    if (!this.component) {
      return;
    }
    this.component.dynamicDefinitions.properties =
      this.component.dynamicDefinitions.properties.filter((x) => x.id !== propertyId);
  }
}
</script>

<style scoped>
</style>
