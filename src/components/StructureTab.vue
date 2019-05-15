<template>
  <elements-tree
    class="element-tree full-size tab-container"
    :elements="elements"
    @select="selectComponent($event)"
    @dblclick="showProperties($event)"
  />
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import ElementsTree from '@/components/ElementsTree.vue';
import { ElementInfo, TreeStructure } from '@/models';

@Component({
  name: 'components-tab',
  components: { 'elements-tree': ElementsTree },
})
export default class StructureTab extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public elementId!: string;

  public elements: TreeStructure[] = [];

  public mounted() {
    this.elements = this.currentTemplate;
  }

  get currentTemplate() {
    const componentInfo = this.editor.currentComponent;
    if (!componentInfo || !componentInfo.elements || !componentInfo.entryId) {
      return [];
    }
    return this.getStructure(componentInfo.entryId);
  }

  public getStructure(entryId: string) {
    const component = this.editor.getComponent(this.componentId);
    if (!component) {
      return [];
    }
    return this.editor.getStructure(this.componentId, component.entryId);
  }

  public selectComponent(elementId: string) {
    this.editor.setSelectedComponent(elementId);
  }

  public showProperties(elementId: string) {
    this.selectComponent(elementId);
    this.editor.toggleTab('properties-tab');
  }
}
</script>

<style scoped>
.element-tree {
  padding: 10px !important;
}
</style>
