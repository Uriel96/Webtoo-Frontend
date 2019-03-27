<template>
  <container
    v-if="isSlotList"
    class="slot-container"
    :get-child-payload="getChildPayload"
    @drop="onDrop"
    group-name="design"
  >
    <component-wrapper
      v-for="child in slotData.value"
      :key="child"
      :entryId="child"
      :componentDefinitionData="componentDefinitionData"
    />
  </container>
  <div v-else>{{ slotData.value }}</div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { Container } from 'vue-smooth-dnd';
import { DroppedResult, ElementInfo, ComponentInfo, SlotData } from '@/models';
import { get } from '@/utilities';

@Component({
  components: {
    'container': Container,
    'component-wrapper': () => import('@/components/ComponentWrapper.vue'),
  },
})
export default class SlotWrapper extends ExtendedVue {
  @Prop() public componentDefinitionData!: ComponentInfo;
  @Prop() public entryId!: string;
  @Prop() public slotData!: SlotData;

  get componentData() {
    const { elements } = this.componentDefinitionData;
    return elements ? elements.find((x) => x.id === this.entryId) : undefined;
  }

  get isSlotList() {
    if (!this.slotInfo) {
      return false;
    }
    return this.slotInfo.type === 'list-property';
  }

  get slotInfo() {
    if (!this.componentData) {
      return;
    }
    const a = this.editor.getComponentInfo(this.componentData);
    if (!a) {
      return;
    }
    return get(a.slots, this.slotData.id);
  }

  public getChildPayload(index: number) {
    return {
      componentId: this.slotData.value[index],
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
      slotId: this.slotData.id,
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

<style scoped>
.slot-container {
  padding: 5px;
}
</style>
