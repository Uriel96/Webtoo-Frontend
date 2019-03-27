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
        <template v-for="slot in slots">
          <slot-wrapper
            :key="slot.id"
            :slotData="slot"
            :entryId="entryId"
            :componentDefinitionData="componentDefinitionData"
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
  @Prop() public componentsDefinitionData!: ComponentInfo[];
  @Prop() public componentDefinitionData!: ComponentInfo;
  @Prop() public entryId!: string;

  get componentData() {
    const { elements } = this.componentDefinitionData;
    return elements ? elements.find((x) => x.id === this.entryId) : undefined;
  }
  get slots() {
    return getStaticSlots(this.componentData);
  }
  get properComponent() {
    if (!this.componentData) {
      return;
    }
    const componentDefinition = this.editor.getComponentDefinition(this.componentData.componentId);
    if (!componentDefinition) {
      return;
    }
    if (componentDefinition.isHTMLTag) {
      return componentDefinition.name;
    }
    return InternalVue().options.components[componentDefinition.name];
  }
  get componentProperties() {
    const compData = this.editor.componentData(this.entryId);
    if (!compData) {
      return [];
    }
    const componentDef = this.editor.getComponentInfo(compData);
    const staticProperties = getStaticProperties(componentDef, this.componentData);
    const dynamicDummyProperties = getDynamicDummyProperties(this.componentDefinitionData, this.componentData);
    return { ...staticProperties, ...dynamicDummyProperties };
  }
  get componentStyles() {
    const componentDefinition = this.editor.currentComponentDefinitionData;
    return getComponentStyles(componentDefinition, this.componentData);
  }
  get isSelectedComponent() {
    return this.editor.selectedComponentId === this.entryId;
  }

  public selectComponent() {
    this.editor.setSelectedComponent(this.entryId);
  }
}

// TODO: Move to another place.
const getStaticSlots = (componentData?: ElementInfo) => {
  if (!componentData) {
    return [];
  }
  const { slots } = componentData;
  if (!slots) {
    return [];
  }
  return slots
    .filter((slot) => slot.type === 'static');
};

const getStaticProperties = (componentDefinition: ComponentInfo | undefined, componentData?: ElementInfo) => {
  if (!componentData) {
    return {};
  }
  if (!componentDefinition) {
    return {};
  }
  const { properties } = componentData;
  return reduceEntries(properties
    .filter((property) => property.type === 'static')
    .map<[string, any]>((property) => {
      const propertyDefinition = get(componentDefinition.dynamicDefinitions.properties, property.id);
      if (!propertyDefinition) {
        return [property.id, undefined];
      }
      if (propertyDefinition.type === 'boolean-property') {
        return [property.id, property.value === 'true'];
      } else {
        return [property.id, property.value];
      }
    }));
};

const getDynamicDummyProperties = (
  componentDefinition: ComponentInfo,
  componentData?: ElementInfo,
) => {
  if (!componentData) {
    return {};
  }
  const { properties } = componentData;
  return reduceEntries(properties
    .filter((property) => property.type === 'dynamic' && property.dynamicId)
    .map<[string, any]>((property) => {
      if (!property.dynamicId) {
        return [property.id, undefined];
      }
      const propertyDefinition = get(componentDefinition.dynamicDefinitions.properties, property.dynamicId);
      if (!propertyDefinition) {
        const dataDefinition = get(componentDefinition.dynamicDefinitions.data, property.dynamicId);
        if (dataDefinition) {
          return [property.id, dataDefinition.dummy];
        }
        return [property.id, undefined];
      }
      return [property.id, propertyDefinition.dummy];
    }));
};

const getComponentStyles = (componentDefinition: ComponentInfo | undefined, componentData?: ElementInfo) => {
  if (!componentDefinition) {
    return '';
  }
  if (!componentData) {
    return '';
  }
  const classInfo = get(componentData.properties, 'class');
  if (!classInfo) {
    return '';
  }
  const { style } = componentDefinition;
  if (!style) {
    return '';
  }
  const styleClasses = classInfo.value as string[];
  return styleClasses.map((styleClass) => {
    const currentStyle = get(style, styleClass);
    if (!currentStyle) {
      return '';
    }
    return currentStyle.value || '';
  }).join(' ');
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
