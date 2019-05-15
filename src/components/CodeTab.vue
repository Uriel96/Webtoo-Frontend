<template>
  <monaco-editor
    class="full-size editor"
    :value="code"
    language="html"
    theme="vs-dark"
    :options="editorOptions"
  />
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import MonacoEditor from 'vue-monaco';
import { generateCode } from '@/services/codeGenerator';

@Component({
  components: {
    'monaco-editor': MonacoEditor,
  },
})
export default class App extends ExtendedVue {
  public editorOptions = { automaticLayout: true, selectOnLineNumbers: true, fontSize: '12px', readOnly: true };

  get code() {
    if (this.editor.currentComponent) {
      return generateCode(this.editor, this.editor.currentComponent);
    }
    return '';
  }
}
</script>

<style scoped>
.editor {
  height: 100% !important;
}
</style>