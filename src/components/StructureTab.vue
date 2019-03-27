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
import { ElementInfo, TreeStructure } from '@/models';

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
    if (!componentDef || !componentDef.elements || !componentDef.entryId) {
      return [];
    }
    return this.getStructure(componentDef.elements, componentDef.entryId);
  }

  public getStructure(elements: ElementInfo[], entryId: string) {
    return getStructure(elements, entryId);
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
const getStructure = (elements: ElementInfo[], entryId: string): TreeStructure[] => {
  const componentData = elements.find((x) => x.id === entryId);
  if (!componentData || !componentData.slots) {
    return [];
  }
  const slots = componentData.slots.map((slot) => {
    let children = slot.value;
    if (children instanceof Array) {
      children = slot.value.map((childId: string) => getStructure(elements, childId)).flat(1);
    }
    return { id: entryId, title: slot.id, children };
  });
  return [{ id: entryId, title: componentData.name, children: slots }];
};
</script>

<style scope>
</style>
