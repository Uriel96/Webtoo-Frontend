<template>
  <sui-accordion
    is="sui-list"
    :active-index="1"
    vertical
    inverted
    divided
    relaxed
    link
    style="margin: 0px"
  >
    <sui-item v-for="element in elements" :key="element.title">
      <sui-list-content>
        <div v-if="element.children">
          <sui-accordion-title class="element-container">
            <sui-button
              class="element-button"
              :color="isSelected(element) ? 'violet' : null"
              fluid
              :basic="!isSelected(element)"
              inverted
              @click="$emit('select', element.id)"
              @dblclick="$emit('dblclick', element.id)"
            >
              <sui-icon name="dropdown"/>
              {{element.title}}
            </sui-button>
          </sui-accordion-title>
          <sui-accordion-content class="children-container">
            <elements-tree :elements="element.children" @select="select" @dblclick="dblclick"/>
          </sui-accordion-content>
        </div>
        <h5 v-else is="sui-header" inverted>{{element.title}}</h5>
      </sui-list-content>
    </sui-item>
  </sui-accordion>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop, Model, Emit } from 'vue-property-decorator';
import { TreeStructure } from '@/models';

@Component({
  name: 'elements-tree',
})
export default class ElementsTree extends ExtendedVue {
  @Prop() public elements!: TreeStructure[];

  get selectedComponentId() {
    return this.editor.selectedComponentId;
  }

  public isSelected(element: TreeStructure) {
    return this.selectedComponentId === element.id;
  }

  @Emit()
  public select(selectedId: string) {
    //
  }
  @Emit()
  public dblclick(selectedId: string) {
    //
  }
}
</script>

<style scope>
.element-button {
  padding-left: 5px !important;
  text-align: left !important;
}
.element-container {
  padding: 2px !important;
}
.children-container {
  padding: 0px !important;
  margin-left: 15px !important;
}
</style>
