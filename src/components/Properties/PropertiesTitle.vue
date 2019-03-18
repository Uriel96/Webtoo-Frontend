<template>
  <div align="center">
    <sui-list inverted selection vertical-align="middle">
      <sui-list-item class="title-item">
        <sui-list-content>
          <sui-form v-if="editing" @submit.prevent="editing = false">
            <fui-form-field>
              <sui-input
                v-model="selectedComponent.name"
                @focus="editing = false"
                @blur="editing = false"
                class="name-input"
              />
            </fui-form-field>
          </sui-form>
          <span v-else @dblclick="editing = true" class="name-title">
            <b>{{selectedComponent.name}}</b>
          </span>
        </sui-list-content>
      </sui-list-item>
      <sui-list-item class="title-item">
        <a v-if="!isElement" is="sui-label" color="teal">
          {{relativePath}}
          <sui-label-detail>{{componentName}}</sui-label-detail>
        </a>
        <a v-else is="sui-label" color="teal">{{componentName}}</a>
      </sui-list-item>
    </sui-list>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { ComponentData } from '@/models';

@Component({
  name: 'properties-title',
})
export default class PropertiesTitle extends ExtendedVue {
  @Prop() public selectedComponent!: ComponentData;
  @Prop() public elementId!: string;

  public editing = false;

  get relativePath() {
    return this.selectedComponent.path;
  }
  get componentName() {
    const { component, element } = this.selectedComponent;
    return element ? element : component;
  }
  get isElement() {
    return !!this.selectedComponent.element;
  }
}
</script>

<style scoped>
.title-item {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0px;
}
.name-input {
  color: white;
  margin: 0px;
}
.name-title {
  color: white;
  margin: 0px;
  font-size: 24px;
}
</style>
