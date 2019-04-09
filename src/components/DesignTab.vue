<template>
  <component :is="entryComponent"/>
</template>

<script lang='ts'>
import { VueConstructor } from 'vue';
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import DesignEntry from '@/components/DesignEntry.vue';
import { loadDependencies, loadScripts, loadScript, loadLinks } from '@/services/dependenciesLoader';
import { InternalVue, setInternalVueConfiguration, setInternalVueGlobals, defaultTemplate } from '@/utilities';
import { LibraryInfo, LinkData } from '@/models';
import vueCustomElement from 'vue-custom-element';
import { Container, Draggable } from 'vue-smooth-dnd';

@Component
export default class DesignTab extends ExtendedVue {
  public entryComponent: VueConstructor | null = null;

  get library() {
    const componentInfo = this.editor.currentComponent;
    if (!componentInfo) {
      return;
    }
    return this.editor.getLibrary(componentInfo.libraryId);
  }

  public mounted() {
    const componentInfo = this.editor.currentComponent;
    if (!componentInfo) {
      return;
    }
    const contentTemplate =
      (this.library ? this.library.contentTemplate : undefined) ||
      componentInfo.contentTemplate ||
      defaultTemplate;
    const libraries = this.editor.getDependencies(componentInfo.libraryId);
    loadDependencies(libraries).then(() => {
      setInternalVueConfiguration();
      setInternalVueGlobals(libraries);
      this.addEntryComponent(contentTemplate);
    }).catch((error) => {
      throw new Error(error);
    });
  }

  public addEntryComponent(contentTemplate: string) {
    InternalVue().component('design-entry', DesignEntry);
    const EntryComponent = InternalVue().extend({
      template: contentTemplate,
      components: {
        'design-entry': DesignEntry,
      },
    });
    this.entryComponent = EntryComponent;
  }
}
</script>

<style scoped>
</style>
