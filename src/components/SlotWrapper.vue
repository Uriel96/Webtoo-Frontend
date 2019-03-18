<template>
  <container
    v-if="isSlotList"
    class="slot-container"
    :get-child-payload="getChildPayload"
    @drop="onDrop"
    group-name="design"
  >
    <component-wrapper
      v-for="child in slotData"
      :key="child"
      :entryId="child"
      :componentDefinitionData="componentDefinitionData"
      :componentsDefinitionData="componentsDefinitionData"
    />
  </container>
  <div v-else>{{ slotData }}</div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { Container } from 'vue-smooth-dnd';
import { DroppedResult, ComponentData, ComponentsDefinitionData, ComponentDefinitionData, SlotData } from '@/models';

@Component({
  components: {
    'container': Container,
    'component-wrapper': () => import('@/components/ComponentWrapper.vue'),
  },
})
export default class SlotWrapper extends ExtendedVue {
  @Prop() public componentsDefinitionData!: ComponentsDefinitionData;
  @Prop() public componentDefinitionData!: ComponentDefinitionData;
  @Prop() public entryId!: string;
  @Prop() public slotData!: string[] | string;
  @Prop() public slotId!: string;

  get componentData() {
    const { template } = this.componentDefinitionData;
    return template ? template[this.entryId] : undefined;
  }

  get isSlotList() {
    return this.slotData instanceof Array;
  }

  public getChildPayload(index: number) {
    return {
      componentId: this.slotData[index],
    };
  }

  public onDrop(dropResult: DroppedResult) {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (removedIndex === null && addedIndex === null) {
      return;
    }
    if (!payload) {
      return;
    }
    const { componentId } = dropResult.payload;
    const newPayload = {
      draggedId: componentId,
      droppedId: this.entryId,
      slotId: this.slotId,
      removedIndex,
      addedIndex,
    };
    if (payload.type === 'component-definition') {
      this.editor.addComponent(newPayload);
    } else {
      this.editor.switchComponent(newPayload);
    }
  }
}
</script>
