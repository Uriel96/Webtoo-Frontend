<template>
  <container @drop="onDrop" drag-handle-selector=".column-drag-handle">
    <draggable v-for="(val, index) in value" :key="val">
      <div class="draggable-item">
        <fields-group :items="[{name: 'left', size: 3}, {name: 'right', size: 13}]">
          <template slot="left">
            <sui-button class="column-drag-handle" compact icon="bars"/>
          </template>
          <template slot="right">
            <input readonly inverted :value="value[index]" @input="handleInput">
          </template>
        </fields-group>
      </div>
    </draggable>
  </container>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import { PropertyDefinition, PropertyData, DropPayload } from '@/models';
import { Container, Draggable } from 'vue-smooth-dnd';

@Component({
  components: {
    container: Container,
    draggable: Draggable,
  },
})
export default class ListField extends ExtendedVue {
  @Prop() public value!: any[];
  @Prop() public placeholder!: string;

  public onDrop(dropResult: { addedIndex: number; removedIndex: number }) {
    const { addedIndex, removedIndex } = dropResult;
    const value = [...this.value];
    const temp = value[removedIndex];
    value.splice(removedIndex, 1);
    value.splice(addedIndex, 0, temp);
    this.handleInput(value);
  }

  public handleInput(e: any) {
    this.$emit('input', e);
  }
}
</script>

<style scoped>
</style>
