<template>
  <div>
    <h3
      is="sui-header"
      align="center"
      inverted
      style="margin-top: 8px; margin-bottom: 2px;"
    >Functions</h3>
    <component-defintions
      :definitions="componentFunctions"
      addTitle="Add Function"
      emptyMessage="No Functions Added"
      @add="addFunction"
      @remove="removeFunction"
    >
      <template #content="{definition}">
        <function-definition-fields :componentId="componentId" :functionDef="definition"/>
      </template>
    </component-defintions>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import FunctionDefinitionFields from '@/components/FunctionDefinitionFields.vue';
import GroupContainer from '@/components/GroupContainer.vue';
import { createUID } from '@/utilities';
import ComponentDefinitions from '@/components/ComponentDefinitions.vue';

@Component({
  components: {
    'function-definition-fields': FunctionDefinitionFields,
    'group-container': GroupContainer,
    'component-defintions': ComponentDefinitions,
  },
})
export default class ComponentPropertyDefinitions extends ExtendedVue {
  @Prop() public componentId!: string;
  public showDelete = null;

  get component() {
    return this.editor.getComponent(this.componentId);
  }
  get componentFunctions() {
    if (!this.component) {
      return;
    }
    return this.component.dynamicDefinitions.functions;
  }

  public addFunction() {
    if (!this.component) {
      return;
    }
    this.component.dynamicDefinitions.functions.push({
      id: createUID(), name: '', type: 'text', parameters: [], code: '',
    });
  }
  public removeFunction(functionId: string) {
    if (!this.component) {
      return;
    }
    this.component.dynamicDefinitions.functions =
      this.component.dynamicDefinitions.functions.filter((x) => x.id !== functionId);
  }
}
</script>

<style scoped>
</style>
