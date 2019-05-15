<template>
  <div>
    <group-container>
      <template slot="top">
        <sui-accordion v-if="definitions.length > 0" exclusive styled class="group-content">
          <div v-for="definition in definitions" :key="definition.id">
            <sui-accordion-title
              @mouseover="() => showDelete = definition.id"
              @mouseleave="() => showDelete = null"
            >
              <sui-icon name="dropdown"/>
              {{definition.name}}
              <sui-button
                v-show="showDelete == definition.id"
                @click.prevent.stop="removeDefinition(definition.id)"
                circular
                basic
                size="mini"
                icon="trash"
                floated="right"
              />
            </sui-accordion-title>
            <sui-accordion-content style="padding: 5px">
              <slot name="content" :definition="definition"></slot>
            </sui-accordion-content>
          </div>
        </sui-accordion>
        <div v-else align="center">
          <sui-label style="margin: 10px;" icon="ban">{{emptyMessage}}</sui-label>
        </div>
      </template>
      <template slot="bottom">
        <sui-button
          class="group-content"
          primary
          fluid
          size="small"
          icon="plus"
          :content="addTitle"
          @click="addDefinition"
        />
      </template>
    </group-container>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import GroupContainer from '@/components/GroupContainer.vue';
import { Definition } from '@/models';

@Component({
  components: {
    'group-container': GroupContainer,
  },
})
export default class ComponentDefinitions extends ExtendedVue {
  @Prop() public definitions!: Definition[];
  @Prop() public addTitle!: string;
  @Prop() public emptyMessage!: string;
  public showDelete = null;

  public removeDefinition(definitionId: string) {
    this.$emit('remove', definitionId);
  }
  public addDefinition() {
    this.$emit('add');
  }
}
</script>

<style scoped>
</style>
