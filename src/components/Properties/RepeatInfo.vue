<template>
  <div>
    <sui-form-field>
      <sui-checkbox label="Repeat Element" v-model="elementInfo.repeated" @input="repeat"/>
    </sui-form-field>
    <template v-if="elementInfo.repeated && elementInfo.repeat">
      <sui-form-field>
        <label>Items To Repeat</label>
        <sui-dropdown
          selection
          fluid
          floating
          placeholder="Empty"
          v-model="elementInfo.repeat.listId"
          :options="dynamicProperties"
        ></sui-dropdown>
      </sui-form-field>
      <sui-form-field>
        <label>Item Name</label>
        <input placeholder="Item" v-model="elementInfo.repeat.item.name">
      </sui-form-field>
      <sui-form-field>
        <label>Index Name</label>
        <input placeholder="Index" v-model="elementInfo.repeat.index.name">
      </sui-form-field>
    </template>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { PropertyDefinition, SlotDefinition, EventDefinition, ElementInfo } from '@/models';
import { createUID } from '@/utilities';

@Component
export default class RepeatInfo extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public elementId!: string;

  get elementInfo() {
    return this.editor.getElement(this.componentId, this.elementId)!;
  }
  get dynamicProperties() {
    const { currentComponent } = this.editor;
    if (!currentComponent) {
      return [];
    }
    const { data, properties } = currentComponent.dynamicDefinitions;
    return [...data, ...properties]
      .map((property) => ({
        text: property.name,
        value: property.id,
      }));
  }

  public repeat(e: any) {
    const newRepeat = {
      item: { id: createUID(), name: '', type: 'text' },
      index: { id: createUID(), name: '', type: 'text' },
      listId: null,
    };
    this.elementInfo.repeat = e.target.checked ? newRepeat : undefined;
  }
}
</script>

<style scoped>
</style>
