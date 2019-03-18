<template>
  <sui-form-field class="container-form">
    <label>{{ propertyDef.name }}</label>
    <fields-group :items="[{name: 'left', size: 4}, {name: 'right', size: 12}]">
      <template slot="left">
        <type-field v-model="propertyData.type"></type-field>
      </template>
      <template slot="right">
        <sui-dropdown
          v-if="propertyData.type === 'static'"
          multiple
          search
          selection
          fluid
          :placeholder="propertyDef.name"
          v-model="propertyData.value"
          :options="styleOptions"
        ></sui-dropdown>
        <dynamic-field
          v-if="propertyData.type === 'dynamic'"
          v-model="propertyData.dynamicId"
          :propertyDef="propertyDef"
        ></dynamic-field>
      </template>
    </fields-group>
  </sui-form-field>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import { PropertyDefinitionData, Style } from '@/models';
import TypeField from '@/components/Properties/TypeField.vue';
import DynamicField from '@/components/Properties/DynamicField.vue';

@Component({
  components: {
    'type-field': TypeField,
    'dynamic-field': DynamicField,
  },
})
export default class BooleanProperty extends ExtendedVue {
  @Prop() public propertyDef!: PropertyDefinitionData;
  @Prop() public propertyId!: string;

  public mounted() {
    this.propertyDef.data = { options: this.styleOptions };
  }

  get styles() {
    return this.editor.currentComponentDefinitionData.style;
  }

  get styleOptions() {
    if (!this.styles) {
      return [];
    }
    const classes = Object.keys(this.styles).map((x) => ({ value: x, text: x }));
    return classes;
  }

  get propertyData() {
    if (!this.editor.selectedComponent) {
      return;
    }
    return this.editor.selectedComponent.properties[this.propertyId];
  }
}
</script>

<style scoped>
.container-form {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
