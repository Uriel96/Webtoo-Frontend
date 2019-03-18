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
      <component :is="currentTab"></component>
    </div>
  </div>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import PropertiesTab from '@/components/Properties/PropertiesTab.vue';
import ComponentsTab from '@/components/ComponentsTab.vue';
import StructureTab from '@/components/StructureTab.vue';

// TODO: Move to aonther place. (make it a plugin)
const menuItems = [
  {
    name: 'components-tab',
    title: 'Components',
    icon: 'puzzle',
  },
  {
    name: 'structure-tab',
    title: 'Structure',
    icon: 'sitemap',
  },
  {
    name: 'properties-tab',
    title: 'Properties',
    icon: 'list',
  },
  {
    name: 'code-tab',
    title: 'Code',
    icon: 'code',
  },
];

@Component({
  components: {
    'properties-tab': PropertiesTab,
    'components-tab': ComponentsTab,
    'structure-tab': StructureTab,
  },
})
export default class LeftLayout extends ExtendedVue {
  public menuItems = menuItems;

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

<style scope>
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
