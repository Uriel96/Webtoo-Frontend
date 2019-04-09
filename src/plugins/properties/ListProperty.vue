<template>
  <sui-form-field class="container-form" v-if="propertyData">
    <label>{{ propertyDef.name }}</label>
    <fields-group :items="[{name: 'left', size: 4}, {name: 'right', size: 12}]">
      <template slot="left">
        <type-field v-model="propertyData.type"></type-field>
      </template>
      <template slot="right">
        <input
          v-if="!isDynamic"
          disabled
          inverted
          :placeholder="propertyDef.name"
          v-model="propertyData.value"
        >
        <dynamic-field
          v-if="isDynamic"
          v-model="propertyData.dynamicId"
          :propertyDef="propertyDef"
        />
      </template>
    </fields-group>
    <div v-for="(val, index) in propertyData.value" :key="val">
      <sui-dropdown
        selection
        fluid
        floating
        :placeholder="'Item' + (index + 1)"
        v-model="propertyData.value[index]"
        :options="options"
      ></sui-dropdown>
    </div>
  </sui-form-field>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Prop, Component } from 'vue-property-decorator';
import { PropertyDefinition, PropertyData } from '@/models';
import TypeField from '@/components/Properties/TypeField.vue';
import DynamicField from '@/components/Properties/DynamicField.vue';

@Component({
  components: {
    'type-field': TypeField,
    'dynamic-field': DynamicField,
  },
})
export default class ListProperty extends ExtendedVue {
  @Prop() public propertyDef!: PropertyDefinition;
  @Prop() public propertyData!: PropertyData;

  get isDynamic() {
    if (!this.propertyData) {
      return;
    }
    return this.propertyData.type === 'dynamic';
  }

  get options() {
    if (!this.editor.currentComponent || !this.editor.currentComponent.elements) {
      return [];
    }
    return this.editor.currentComponent.elements
      .map((element) => ({ value: element.id, text: element.name }));
  }
}
</script>

<style scoped>
</style>
