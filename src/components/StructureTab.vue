<template>
  <elements-tree
    :elements="elements"
    @select="selectComponent($event)"
    @dblclick="showProperties($event)"
  />
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import ElementsTree from '@/components/ElementsTree.vue';
import { Template, TreeStructure } from '@/models';

@Component({
  name: 'components-tab',
  components: { 'elements-tree': ElementsTree },
})
export default class StructureTab extends ExtendedVue {
  public elements: TreeStructure[] = [];

  public mounted() {
    this.elements = this.currentTemplate;
  }

  get currentTemplate() {
    const componentDef = this.editor.currentComponentDefinitionData;
    if (!componentDef.template || !componentDef.entryId) {
      return [];
    }
    return this.getStructure(componentDef.template, componentDef.entryId);
  }

  public getStructure(template: Template, entryId: string) {
    return getStructure(template, entryId);
  }

  public selectComponent(elementId: string) {
    this.editor.setSelectedComponent(elementId);
  }

  public showProperties(elementId: string) {
    this.selectComponent(elementId);
    this.editor.toggleTab('properties-tab');
  }
}

// TODO: Move to another place.
const getStructure = (template: Template, entryId: string): TreeStructure[] => {
  const componentData = template[entryId];
  if (!componentData || !componentData.slots) {
    return [];
  }
  const slots = Object.entries(componentData.slots).map(([slotId, slot]) => {
    let children = slot.value;
    if (children instanceof Array) {
      children = slot.value.map((childId: string) => getStructure(template, childId)).flat(1);
    }
    return { id: entryId, title: slotId, children };
  });
  return [{ id: entryId, title: componentData.name, children: slots }];
};
</script>

<style scope>
</style>
