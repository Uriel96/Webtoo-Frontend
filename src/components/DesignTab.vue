<template>
  <component :is="entryComponent"/>
</template>

<script lang='ts'>
import { VueConstructor } from 'vue';
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import DesignEntry from '@/components/DesignEntry.vue';
import { loadDependencies } from '@/services/dependenciesLoader';
import { InternalVue, setInternalVueConfiguration, setInternalVueGlobals, defaultTemplate } from '@/utilities';
import { LibraryInfo } from '@/models';

@Component
export default class DesignTab extends ExtendedVue {
  public entryComponent: VueConstructor | null = null;

  public mounted() {
    const componentDefinition = this.editor.currentComponentDefinitionData;
    if (!componentDefinition) {
      return;
    }
    const library = this.editor.getLibrary(componentDefinition.libraryId);
    const contentTemplate =
      (library ? library.contentTemplate : undefined) ||
      componentDefinition.contentTemplate ||
      defaultTemplate;
    const libraries = this.editor.dependencies(componentDefinition.libraryId);

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

<style scope>
</style>
