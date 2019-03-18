<template>
  <sui-form-field class="container-form" v-if="propertyData">
    <label>{{ propertyDef.name }}</label>
    <fields-group :items="[{name: 'left', size: 4}, {name: 'right', size: 12}]">
      <template slot="left">
        <type-field v-model="propertyData.type"></type-field>
      </template>
      <template slot="right">
        <sui-dropdown
          v-if="propertyData.type === 'static'"
          selection
          fluid
          floating
          :placeholder="propertyDef.name"
          v-model="propertyData.value"
          :options="propertyDef.data.options"
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
import { PropertyDefinitionData } from '@/models';
import TypeField from '@/components/Properties/TypeField.vue';
import DynamicField from '@/components/Properties/DynamicField.vue';
import { entries } from '@/utilities';

@Component({
  components: {
    'type-field': TypeField,
    'dynamic-field': DynamicField,
  },
})
export default class OptionsProperty extends ExtendedVue {
  @Prop() public propertyDef!: PropertyDefinitionData;
  @Prop() public propertyId!: string;

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
.field-container {
  border-width: 0px !important;
  margin: 0px !important;
}
.left-field {
  padding: 0px !important;
  width: 50px !important;
}
.right-field {
  padding: 0px !important;
  width: calc(100% - 50px) !important;
}
</style>
