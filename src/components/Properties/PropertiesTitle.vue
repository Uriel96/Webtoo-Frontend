<template>
  <div align="center">
    <sui-list inverted selection vertical-align="middle">
      <sui-list-item class="title-item">
        <sui-list-content>
          <sui-form v-if="editing" @submit.prevent="editing = false">
            <sui-form-field>
              <sui-input
                v-model="element.name"
                @focus="editing = false"
                @blur="editing = false"
                class="name-input"
              />
            </sui-form-field>
          </sui-form>
          <span v-else @dblclick="editing = true" class="name-title">
            <b>{{element.name}}</b>
          </span>
        </sui-list-content>
      </sui-list-item>
      <sui-list-item class="title-item">
        <a is="sui-label" color="teal">
          {{relativePath}}
          <sui-label-detail>{{componentName}}</sui-label-detail>
        </a>
      </sui-list-item>
    </sui-list>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { ElementInfo } from '@/models';

@Component({
  name: 'properties-title',
})
export default class PropertiesTitle extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public elementId!: string;

  public editing = false;

  get element() {
    return this.editor.getElement(this.componentId, this.elementId);
  }
  get elementComponent() {
    if (!this.element) {
      return;
    }
    return this.editor.getComponent(this.element.componentId);
  }
  get relativePath() {
    if (!this.elementComponent) {
      return;
    }
    const library = this.editor.getLibrary(this.elementComponent.libraryId);
    if (!library) {
      return;
    }
    return library.name;
  }
  get componentName() {
    return this.elementComponent ? this.elementComponent.name : undefined;
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
