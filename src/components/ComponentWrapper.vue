<template>
  <draggable
    :class="{
      'selected-element-container' : isSelectedElement,
      'element-container': !isSelectedElement
    }"
  >
    <div @click.stop="selectComponent">
      <component
        :is="componentData"
        v-bind="componentProperties"
        :style="componentStyles"
        class="real-element"
      >
        <template v-for="slot in slots">
          <slot-wrapper
            :key="slot.id"
            :slotData="slot"
            :elementId="elementId"
            :componentId="componentId"
          />
        </template>
      </component>
    </div>
  </draggable>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import {
  ElementInfo,
  ComponentInfo,
} from '@/models';
import { Container, Draggable } from 'vue-smooth-dnd';
import { entries, InternalVue, get, reduceEntries } from '@/utilities';
import SlotWrapper from '@/components/SlotWrapper.vue';

@Component({
  components: {
    'container': Container,
    'draggable': Draggable,
    'slot-wrapper': SlotWrapper,
  },
})
export default class ComponentWrapper extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public elementId!: string;

  get slots() {
    const { getStaticSlots } = this.editor;
    return getStaticSlots(this.componentId, this.elementId);
  }
  get componentData() {
    const { getElement, getComponent } = this.editor;
    const elementInfo = getElement(this.componentId, this.elementId);
    if (!elementInfo) {
      return;
    }
    const elementComponent = getComponent(elementInfo.componentId);
    if (!elementComponent) {
      return;
    }
    if (elementComponent.isHTMLTag) {
      return elementComponent.name;
    }
    return InternalVue().options.components[elementComponent.name];
  }
  get componentProperties() {
    const { getStaticProperties, getDynamicDummyProperties } = this.editor;
    const staticProperties = getStaticProperties(this.componentId, this.elementId);
    const dynamicDummyProperties = getDynamicDummyProperties(this.componentId, this.elementId);
    return { ...staticProperties, ...dynamicDummyProperties };
  }
  get componentStyles() {
    const { getComponentStyles } = this.editor;
    return getComponentStyles(this.componentId, this.elementId);
  }
  get isSelectedElement() {
    return this.editor.selectedElementId === this.elementId;
  }

  public selectComponent() {
    this.editor.setSelectedComponent(this.elementId);
  }
}
</script>

<style scoped>
.selected-element-container {
  padding: 2px;
  margin: 2px;
  border-color: orange !important;
  border-style: solid !important;
  border-radius: 5px !important;
  border-width: 1px !important;
  pointer-events: auto !important;
  cursor: pointer !important;
}
.element-container {
  padding: 2px;
  margin: 2px;
  border-color: #8caec2 !important;
  border-style: solid !important;
  border-radius: 5px !important;
  border-width: 0.6px !important;
  pointer-events: auto !important;
  cursor: pointer !important;
}
.real-element {
  pointer-events: none !important;
}
.slot-container {
  border-color: lightgrey !important;
  border-style: solid !important;
  border-radius: 5px !important;
  border-width: 0.6px !important;
  padding: 4px;
  border-radius: 5px;
  width: 100%;
  pointer-events: auto;
}
</style>
