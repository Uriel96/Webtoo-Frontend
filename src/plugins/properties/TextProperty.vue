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
export default class TextProperty extends ExtendedVue {
  @Prop() public propertyDef!: PropertyDefinition;
  @Prop() public propertyData!: PropertyData;

  get isDynamic() {
    if (!this.propertyData) {
      return;
    }
    return this.propertyData.type === 'dynamic';
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
