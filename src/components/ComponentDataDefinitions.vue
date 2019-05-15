<template>
  <div>
    <h3 is="sui-header" align="center" inverted style="margin-top: 8px; margin-bottom: 2px;">Data</h3>
    <component-defintions
      :definitions="componentData"
      addTitle="Add Data"
      emptyMessage="No Data Added"
      @add="addData"
      @remove="removeData"
    >
      <template #content="{definition}">
        <data-definition-fields :componentId="componentId" :dataDef="definition"/>
      </template>
    </component-defintions>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import DataDefinitionFields from '@/components/DataDefinitionFields.vue';
import GroupContainer from '@/components/GroupContainer.vue';
import { createUID } from '@/utilities';
import ComponentDefinitions from '@/components/ComponentDefinitions.vue';

@Component({
  components: {
    'data-definition-fields': DataDefinitionFields,
    'group-container': GroupContainer,
    'component-defintions': ComponentDefinitions,
  },
})
export default class ComponentPropertyDefinitions extends ExtendedVue {
  @Prop() public componentId!: string;

  get component() {
    return this.editor.getComponent(this.componentId);
  }
  get componentData() {
    if (!this.component) {
      return;
    }
    return this.component.dynamicDefinitions.data;
  }

  public addData() {
    if (!this.component) {
      return;
    }
    this.component.dynamicDefinitions.data.push({ id: createUID(), name: '', type: 'text', initialValue: '' });
  }
  public removeData(dataId: string) {
    if (!this.component) {
      return;
    }
    this.component.dynamicDefinitions.data =
      this.component.dynamicDefinitions.data.filter((x) => x.id !== dataId);
  }
}
</script>

<style scoped>
</style>
