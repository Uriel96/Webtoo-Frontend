<template>
  <sui-segment class="field-container">
    <sui-grid :columns="items.length">
      <sui-grid-column
        v-for="(item, index) in items"
        :key="item.name"
        :class="properFieldStyle(index)"
        :width="item.size"
      >
        <slot :name="item.name"/>
      </sui-grid-column>
    </sui-grid>
  </sui-segment>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component({
  name: 'fields-group',
})
export default class FieldsGroup extends Vue {
  @Prop() public items!: string[];

  public properFieldStyle(index: number): string {
    return index === 0 ? 'first-field' : 'rest-field';
  }
}
</script>

<style>
.field-container {
  border-width: 0px !important;
  margin: 0px !important;
}
.first-field,
.rest-field {
  padding: 0px !important;
}
.first-field > * {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  height: 100%;
  width: 100%;
}
.rest-field > * {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  height: 100%;
  width: 100%;
}
</style>
