<template>
  <div v-hotkey="keymap" class="component-editor">
    <editor-structure :entryId="entryId"/>
  </div>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import EditorStructure from '@/components/EditorStructure.vue';
import {
  keyBindings,
  bindKeysTo,
} from '@/configuration/keyBindings';
import { KeyBindings, Structure } from '@/models';

@Component({
  components: {
    'editor-structure': EditorStructure,
  },
})
export default class ComponentEditor extends ExtendedVue {
  public mounted() {
    // this.editor.initializeProperties();
  }

  get keymap() {
    return bindKeysTo(keyBindings,
      (key, action) => () => (this.editor as any)[action.name](...action.parameters),
    );
  }
  get entryId() {
    return this.editor.structure.entryId;
  }
}
</script>

<style scoped>
.component-editor {
  height: 100vh;
}
</style>