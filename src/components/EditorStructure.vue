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

<style scoped>
.splitpanes__splitter {
  background-color: rgba(44, 65, 73, 0.05);
  position: relative;
}
.splitpanes__splitter:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  background-color: rgba(44, 65, 73, 0.1);
  opacity: 0;
  z-index: 1;
}
.splitpanes__splitter:hover:before {
  opacity: 1;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  left: -3px;
  right: -3px;
  height: 100%;
}
.splitpanes--horizontal > .splitpanes__splitter:before {
  top: -3px;
  bottom: -3px;
  width: 100%;
}
</style>
