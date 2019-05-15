<template>
  <sui-segments>
    <sui-segment attached="top" class="top-group-container group-container no-padding no-margin">
      <slot name="top"></slot>
    </sui-segment>
    <sui-segment
      attached="bottom"
      class="bottom-group-container group-container no-padding no-margin"
    >
      <slot name="bottom"></slot>
    </sui-segment>
  </sui-segments>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class GroupContainer extends ExtendedVue {

}
</script>

<style>
.group-container {
  width: 100% !important;
  border-width: 0px !important;
}
.top-group-container > .group-content {
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  margin: 0px !important;
}
.bottom-group-container > .group-content {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
  margin: 0px !important;
}
</style>
