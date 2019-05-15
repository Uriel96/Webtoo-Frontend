<template>
  <div>
    <preview-frame
      ref="frame"
      :libraries="libraries"
      :code="code"
      :componentId="componentId"
      :properties="properties"
    ></preview-frame>
    <sui-header>Test your component</sui-header>
    <sui-form @submit.prevent.stop="() => {}">
      <sui-form-field v-for="prop of propertiesDef" :key="prop.id">
        <label>{{ prop.name }}</label>
        <input
          placeholder="Value"
          :value="properties[prop.id]"
          @input="(e) => updatePropValue(prop, e)"
        >
      </sui-form-field>
    </sui-form>
  </div>
</template>

<script lang='ts'>
import { VueConstructor } from 'vue';
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import { loadDependencies, loadScripts, loadLinks } from '@/services/dependenciesLoader';
import { InternalVue, setInternalVueConfiguration, setInternalVueGlobals, defaultTemplate } from '@/utilities';
import { LibraryInfo } from '../models';
import { generateCode } from '../services/codeGenerator';
import PreviewFrame from './PreviewFrame.vue';

@Component({
  components: {
    'preview-frame': PreviewFrame,
  },
})
export default class PreviewComponent extends ExtendedVue {
  public entryComponent: VueConstructor | null = null;
  public libraries: LibraryInfo[] = [];
  public code: string = '';
  public properties: { [propertyId: string]: any } = {};

  get componentId() {
    return this.editor.currentComponentId;
  }
  get library() {
    const componentInfo = this.editor.currentComponent;
    if (!componentInfo) {
      return;
    }
    return this.editor.getLibrary(componentInfo.libraryId);
  }
  get propertiesDef() {
    const componentInfo = this.editor.currentComponent;
    if (!componentInfo) {
      return [];
    }
    return componentInfo.dynamicDefinitions.properties;
  }

  public mounted() {
    this.properties = this.propertiesDef.map((prop) => [prop.id, prop.defaultValue])
      .reduce((result, item) => ({ ...result, [item[0]]: item[1] }), {});
  }

  public updatePropValue(prop: any, e: any) {
    this.properties[prop.id] = e.target.value;
    (this.$refs.frame as PreviewFrame).loadComponent();
  }
}
</script>

<style scoped>
</style>
