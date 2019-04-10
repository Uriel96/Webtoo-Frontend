<template>
  <div class="full-size left-layout-container">
    <sui-menu icon="labeled" fluid attached vertical inverted secondary class="menu-buttons">
      <sui-menu-item
        v-for="menuItem of menuItems"
        :key="menuItem.name"
        :name="menuItem.name"
        link
        :active="isActive(menuItem.name)"
        @click="setActive(menuItem.name)"
      >
        <sui-icon :name="menuItem.icon"/>
        {{menuItem.title}}
      </sui-menu-item>
    </sui-menu>
    <div class="full-size tab-container">
      <component :is="currentTab" :componentId="componentId" :elementId="elementId"></component>
    </div>
  </div>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import PropertiesTab from '@/components/Properties/PropertiesTab.vue';
import ComponentsTab from '@/components/Components/ComponentsTab.vue';
import StructureTab from '@/components/StructureTab.vue';
import { menuItems } from '@/configuration/menuItems';
import ComponentPropertiesTab from './ComponentPropertiesTab.vue';

@Component({
  components: {
    'properties-tab': PropertiesTab,
    'components-tab': ComponentsTab,
    'structure-tab': StructureTab,
    'component-properties-tab': ComponentPropertiesTab,
  },
})
export default class LeftLayout extends ExtendedVue {
  public menuItems = menuItems;

  get componentId() {
    return this.editor.currentComponentId;
  }
  get elementId() {
    return this.editor.selectedElementId;
  }
  get currentTab(): string {
    return this.editor.currentTab;
  }

  public isActive(tab: string): boolean {
    return tab === this.currentTab;
  }
  public setActive(tab: string): void {
    this.editor.toggleTab(tab);
  }
}
</script>

<style scoped>
.left-layout-container {
  background-color: #13171e !important;
  display: flex !important;
}
.menu-buttons {
  height: 100% !important;
  max-width: 95px !important;
}
.tab-container {
  overflow-y: auto !important;
}
</style>
