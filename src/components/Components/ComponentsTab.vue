<template>
  <div class="components-container full-size tab-container">
    <sui-accordion inverted class="full-size">
      <div v-for="library in libraries" :key="library.id">
        <sui-accordion-title>
          <sui-card class="library-card" style="width: 100%">
            <sui-card-content>
              <sui-card-header>
                <sui-icon name="dropdown"/>
                {{library.name}}
              </sui-card-header>
            </sui-card-content>
          </sui-card>
        </sui-accordion-title>
        <sui-accordion-content style="padding-left: 6px">
          <library-components :libraryId="library.id"/>
        </sui-accordion-content>
      </div>
    </sui-accordion>
  </div>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import { ComponentInfo } from '@/models';
import { Container, Draggable } from 'vue-smooth-dnd';
import LibraryComponents from '@/components/Components/LibraryComponents.vue';

@Component({
  name: 'components-tab',
  components: { 'container': Container, 'draggable': Draggable, 'library-components': LibraryComponents },
})
export default class ComponentsTab extends ExtendedVue {
  get libraries() {
    const componentInfo = this.editor.currentComponent;
    if (!componentInfo) {
      return [];
    }
    const library = this.editor.getLibrary(componentInfo.libraryId);
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
}
</script>

<style scoped>
.components-container {
  padding: 10px !important;
}
.library-card {
  border-radius: 2px !important;
  box-shadow: none !important;
  background-color: rgb(219, 224, 248) !important;
}
</style>
