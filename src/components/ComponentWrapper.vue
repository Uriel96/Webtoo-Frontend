<template>
  <draggable
    :class="{
      'selected-component-container' : isSelectedComponent,
      'component-container': !isSelectedComponent
    }"
  >
    <div @click.stop="selectComponent">
      <component
        :is="properComponent"
        v-bind="componentProperties"
        :style="componentStyles"
        class="real-component"
      >
        <template v-for="(slot, slotId) in slots">
          <slot-wrapper
            :key="slotId"
            :slotData="slot"
            :slotId="slotId"
            :entryId="entryId"
            :componentDefinitionData="componentDefinitionData"
            :componentsDefinitionData="componentsDefinitionData"
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
  ComponentData,
  ComponentsDefinitionData,
  ComponentDefinitionData,
  Slots,
} from '@/models';
import { Container, Draggable } from 'vue-smooth-dnd';
import { entries, InternalVue } from '@/utilities';
import SlotWrapper from '@/components/SlotWrapper.vue';

@Component({
  components: {
    'container': Container,
    'draggable': Draggable,
    'slot-wrapper': SlotWrapper,
  },
})
export default class ComponentWrapper extends ExtendedVue {
  @Prop() public componentsDefinitionData!: ComponentsDefinitionData;
  @Prop() public componentDefinitionData!: ComponentDefinitionData;
  @Prop() public entryId!: string;

  get componentData() {
    const { template } = this.componentDefinitionData;
    return template ? template[this.entryId] : undefined;
  }
  get slots() {
    return getStaticSlots(this.componentData);
  }
  get properComponent() {
    return getComponent(this.componentData);
  }
  get componentProperties() {
    const componentDef = this.editor.getComponentInfo(this.editor.componentData(this.entryId));
    const staticProperties = getStaticProperties(componentDef, this.componentData);
    const dynamicDummyProperties = getDynamicDummyProperties(this.componentDefinitionData, this.componentData);
    return { ...staticProperties, ...dynamicDummyProperties };
  }
  get componentStyles() {
    return getComponentStyles(this.editor.currentComponentDefinitionData, this.componentData);
  }
  get isSelectedComponent() {
    return this.editor.selectedComponentId === this.entryId;
  }

  public selectComponent() {
    this.editor.setSelectedComponent(this.entryId);
  }
}

// TODO: Move to another place.
const getStaticSlots = (componentData?: ComponentData): { [key: string]: any; } => {
  if (!componentData) {
    return {};
  }
  const { slots } = componentData;
  if (!slots) {
    return {};
  }
  return entries(slots, (entities) =>
    entities
      .filter(([key, value]) => value.type === 'static')
      .map<[string, any]>(([key, value]) => [key, value.value]),
  );
};

const getStaticProperties = (componentDefinition: ComponentDefinitionData, componentData?: ComponentData) => {
  if (!componentData) {
    return {};
  }
  if (!componentDefinition) {
    return;
  }
  const { properties } = componentData;
  return entries(properties, (entities) =>
    entities
      .filter(([key, value]) => value.type === 'static')
      .map<[string, any]>(([key, value]) => {
        if (componentDefinition.properties[key].type === 'boolean-property') {
          return [key, (value.value === 'true')];
        } else {
          return [key, value.value];
        }
      }),
  );
};

const getDynamicDummyProperties = (
  componentDefinitionData: ComponentDefinitionData,
  componentData?: ComponentData,
) => {
  if (!componentData) {
    return {};
  }
  const { properties } = componentData;
  return entries(properties, (entities) =>
    entities
      .filter(([key, value]) => value.type === 'dynamic' && value.dynamicId)
      .map<[string, any]>(([key, value]) => [
        key,
        componentDefinitionData.properties[value.dynamicId!].dummy,
      ]),
  );
};

const getComponentStyles = (componentDefinition: ComponentDefinitionData, componentData?: ComponentData) => {
  if (!componentData) {
    return '';
  }
  const classInfo = componentData.properties.class;
  if (!classInfo) {
    return '';
  }
  const { style } = componentDefinition;
  if (!style) {
    return '';
  }
  const styleClasses = classInfo.value as string[];
  return styleClasses.map((styleClass) => style[styleClass] || '').join(' ');
};

const getComponent = (componentData?: ComponentData) => {
  if (!componentData) {
    return undefined;
  }
  if (componentData.element) {
    return componentData.element;
  }
  if (componentData.component) {
    return InternalVue().options.components[componentData.component];
  }
};
</script>

<style scope>
.selected-component-container {
  padding: 2px;
  margin: 2px;
  border-color: orange !important;
  border-style: solid !important;
  border-radius: 5px !important;
  border-width: 1px !important;
  pointer-events: auto !important;
  cursor: pointer !important;
}
.component-container {
  padding: 2px;
  margin: 2px;
  border-color: #8caec2 !important;
  border-style: solid !important;
  border-radius: 5px !important;
  border-width: 0.6px !important;
  pointer-events: auto !important;
  cursor: pointer !important;
}
.real-component {
  pointer-events: none !important;
}
.slot-container {
  background-color: lightgrey;
  padding: 4px;
  border-radius: 5px;
  width: 100%;
  pointer-events: auto;
}
</style>
