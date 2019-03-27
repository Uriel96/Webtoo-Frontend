<template>
  <sui-card-group style="margin: 10px">
    <sui-accordion exclusive inverted>
      <div v-for="library in libraries" :key="library.id">
        <sui-accordion-title>
          <sui-card style="border-radius: 2px; box-shadow: none;">
            <sui-card-content>
              <sui-card-header>
                <sui-icon name="dropdown"/>
                {{library.name}}
              </sui-card-header>
            </sui-card-content>
          </sui-card>
        </sui-accordion-title>
        <sui-accordion-content>
          <library-components :libraryId="library.id"/>
        </sui-accordion-content>
      </div>
    </sui-accordion>
  </sui-card-group>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import { ComponentInfo } from '@/models';
import { Container, Draggable } from 'vue-smooth-dnd';
import LibraryComponents from '@/components/LibraryComponents.vue';

@Component({
  name: 'components-tab',
  components: { 'container': Container, 'draggable': Draggable, 'library-components': LibraryComponents },
})
export default class ComponentsTab extends ExtendedVue {
  get libraries() {
    const componentDefinition = this.editor.currentComponentDefinitionData;
    if (!componentDefinition) {
      return [];
    }
    const library = this.editor.getLibrary(componentDefinition.libraryId);
    if (!library) {
      return [];
    }
    const otherLibraries = library.dependencies.map((x) => x.library)
      .map((x) => {
        const lib = this.editor.getLibrary(x || '');
        if (!lib) {
          return;
        }
        return lib;
      });
    return [...otherLibraries, library];
  }

  get allComponents() {
    const componentDefinition = this.editor.currentComponentDefinitionData;
    if (!componentDefinition) {
      return [];
    }
    const library = this.editor.getLibrary(componentDefinition.libraryId);
    if (!library) {
      return [];
    }
    const otherComponents = library.dependencies.map((x) => x.library)
      .flatMap((x) => {
        const lib = this.editor.getLibrary(x || '');
        if (!lib) {
          return [];
        }
        return lib.components;
      });
    return [...otherComponents, ...library.components];
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
