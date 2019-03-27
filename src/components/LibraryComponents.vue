<template>
  <div>
    <container
      v-for="componentId in components"
      :key="componentId"
      :get-child-payload="getChildPayload(component, componentId)"
      style="width: 100%; margin-top: 10px; margin: bottom: 10px;"
      group-name="design"
      :should-accept-drop="() => false"
    >
      <draggable style="cursor: pointer;">
        <sui-card style="border-radius: 2px; box-shadow: none;">
          <sui-card-content>
            <sui-card-header>{{getComponentDefinition(componentId).name}}</sui-card-header>
          </sui-card-content>
        </sui-card>
      </draggable>
    </container>
  </div>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { ComponentInfo } from '@/models';
import { Container, Draggable } from 'vue-smooth-dnd';

@Component({
  name: 'library-components',
  components: { container: Container, draggable: Draggable },
})
export default class LibraryComponents extends ExtendedVue {
  @Prop() public libraryId!: string;

  get components() {
    const library = this.editor.getLibrary(this.libraryId);
    if (!library) {
      return [];
    }
    return library.components;
  }

  public getComponentDefinition(componentId: string) {
    return this.editor.getComponentDefinition(componentId);
  }

  public getChildPayload(component: ComponentInfo, componentId: string) {
    return (index: any) => ({
      component,
      componentId,
      type: 'component-definition',
    });
  }
}
</script>

<style scope>
</style>
