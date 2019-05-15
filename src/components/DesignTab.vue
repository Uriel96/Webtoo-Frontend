<template>
  <div class="full-size">
    <sui-tab class="full-size">
      <sui-tab-pane
        title="Editor"
        style="height: calc(100vh - 43px); padding: 4px; position: relative;"
      >
        <component :is="entryComponent"/>
        <transition name="fade" mode="out-in">
          <div
            v-show="isDragging"
            style="
            position: absolute;
            text-align: center;
            margin: 0px;
            left: 0;
            right: 0;
            bottom: 0;
            "
          >
            <container
              class="full-size"
              group-name="design"
              @drag-enter="onDragEnter"
              @drag-leave="onDragLeave"
              @drop="onDragLeave"
              style="position: absolute; transition: opacity 0.2s ease-out; bottom: 0; background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,0,0,0)), to(rgba(255,0,0,0.5)), color-stop(0.75, #eee));"
              :style="{ opacity: isDeleting ? 1 : 0 }"
            ></container>
            <sui-icon
              name="trash"
              :size="isDeleting ? 'large' : null"
              color="red"
              style="margin: 4px"
            ></sui-icon>
          </div>
        </transition>
      </sui-tab-pane>
      <sui-tab-pane title="Preview" class="full-size" style="padding: 4px;">
        <preview-component></preview-component>
      </sui-tab-pane>
    </sui-tab>
  </div>
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
import PreviewComponent from './PreviewComponent.vue';

@Component({
  components: {
    'preview-component': PreviewComponent,
    'container': Container,
  },
})
export default class DesignTab extends ExtendedVue {
  public entryComponent: VueConstructor | null = null;
  public isDeleting = false;

  get library() {
    const componentInfo = this.editor.currentComponent;
    if (!componentInfo) {
      return;
    }
    return this.editor.getLibrary(componentInfo.libraryId);
  }
  get isDragging() {
    return this.editor.isDraggingElement;
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
  public onDragEnter() {
    this.isDeleting = true;
  }
  public onDragLeave() {
    this.isDeleting = false;
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
