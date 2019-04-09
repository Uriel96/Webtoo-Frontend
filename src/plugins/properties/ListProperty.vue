<template>
  <sui-form-field class="container-form" v-if="propertyData">
    <label>{{ propertyDef.name }}</label>
    <fields-group :items="[{name: 'left', size: 4}, {name: 'right', size: 12}]">
      <template slot="left">
        <type-field v-model="propertyData.type"></type-field>
      </template>
      <template slot="right">
        <input
          v-if="!isDynamic"
          disabled
          inverted
          :placeholder="propertyDef.name"
          v-model="propertyData.value"
        >
        <dynamic-field
          v-if="isDynamic"
          v-model="propertyData.dynamicId"
          :propertyDef="propertyDef"
        />
      </template>
    </fields-group>
    <container @drop="onDrop" drag-handle-selector=".column-drag-handle">
      <draggable v-for="(val, index) in propertyData.value" :key="val">
        <div class="draggable-item">
          <fields-group :items="[{name: 'left', size: 3}, {name: 'right', size: 13}]">
            <template slot="left">
              <sui-button class="column-drag-handle" compact icon="bars"/>
            </template>
            <template slot="right">
              <input readonly inverted v-model="propertyData.value[index]">
            </template>
          </fields-group>
        </div>
      </draggable>
    </container>
  </sui-form-field>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import { PropertyDefinition, PropertyData, DroppedPayload, DropPayload } from '@/models';
import TypeField from '@/components/Properties/TypeField.vue';
import DynamicField from '@/components/Properties/DynamicField.vue';
import { Container, Draggable } from 'vue-smooth-dnd';

@Component({
  components: {
    'type-field': TypeField,
    'dynamic-field': DynamicField,
    'container': Container,
    'draggable': Draggable,
  },
})
export default class ListProperty extends ExtendedVue {
  @Prop() public elementId!: string;
  @Prop() public propertyDef!: PropertyDefinition;
  @Prop() public propertyData!: PropertyData;

  public mounted() {
    console.log(this.elementId);
  }

  get isDynamic() {
    if (!this.propertyData) {
      return;
    }
    return this.propertyData.type === 'dynamic';
  }

  get options() {
    if (!this.editor.currentComponent || !this.editor.currentComponent.elements) {
      return [];
    }
    return this.editor.currentComponent.elements
      .map((element) => ({ value: element.id, text: element.name }));
  }

  public onDrop(dropResult: { addedIndex: number; removedIndex: number }) {
    const { addedIndex, removedIndex } = dropResult;
    const payload: DropPayload = {
      draggedId: this.propertyData.value[removedIndex],
      droppedId: this.elementId,
      slotId: this.propertyDef.id,
      removedIndex,
      addedIndex,
    };
    this.editor.switchComponent(payload);
  }
}
</script>

<style scoped>
</style>
