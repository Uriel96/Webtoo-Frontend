<template>
  <div class="full-size">
    <div v-if="currentStructure.component" class="full-size">
      <component :is="currentStructure.component"></component>
    </div>
    <split-panes v-else :vertical="isVerticalPane" :horizontal="!isVerticalPane">
      <div
        v-for="componentId in currentStructure.components"
        :key="componentId"
        :splitpanes-min="structure[componentId].min"
        :splitpanes-max="structure[componentId].max"
        :splitpanes-default="structure[componentId].default"
        class="full-size"
      >
        <editor-structure :entryId="componentId"></editor-structure>
      </div>
    </split-panes>
  </div>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Vue, Component, Prop } from 'vue-property-decorator';
import splitpanes from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { PaneStructure } from '@/models';

@Component({
  name: 'editor-structure',
  components: {
    'split-panes': splitpanes,
  },
})
export default class EditorStructure extends ExtendedVue {
  @Prop() public entryId!: string;

  get structure() {
    return this.editor.structure.structure;
  }
  get currentStructure() {
    return this.structure[this.entryId];
  }
  get isVerticalPane() {
    return (this.currentStructure as PaneStructure).orientation === 'vertical';
  }
}
</script>

<style>
.splitpanes__splitter {
  background-color: rgba(44, 65, 73, 0.5) !important;
  position: relative !important;
}
.splitpanes__splitter:before {
  content: "" !important;
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  transition: opacity 0.4s !important;
  background-color: rgba(44, 65, 73, 0.01) !important;
  opacity: 0 !important;
  z-index: 1 !important;
}
.splitpanes__splitter:hover:before {
  opacity: 1 !important;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  left: -6px !important;
  right: -6px !important;
  height: 100% !important;
}
.splitpanes--horizontal > .splitpanes__splitter:before {
  top: -6px !important;
  bottom: -6px !important;
  width: 100% !important;
}
</style>
