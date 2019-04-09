<template>
  <div>
    <container
      v-for="componentId in components"
      :key="componentId"
      :get-child-payload="getChildPayload(componentId)"
      style="width: 100%; margin-top: 10px; margin: bottom: 10px;"
      group-name="design"
      :should-accept-drop="() => false"
    >
      <draggable style="cursor: pointer;">
        <sui-card style="border-radius: 2px; box-shadow: none;">
          <sui-card-content>
            <sui-card-header>{{getComponent(componentId).name}}</sui-card-header>
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

  public getComponent(componentId: string) {
    return this.editor.getComponent(componentId);
  }

  public getChildPayload(componentId: string) {
    return (index: any) => ({
      componentId,
      type: 'component-info',
    });
  }
}
</script>

<style scoped>
</style>
