<template>
  <div>
    <sui-form @submit.prevent.stop="() => {}" style="margin: 5px">
      <!-- Function Name -->
      <sui-form-field>
        <label>Name</label>
        <input v-model="functionDef.name" placeholder="My Function">
      </sui-form-field>
      <sui-button fluid icon="code" color="green" @click="toggleCode">Edit Code</sui-button>

      <!-- Return Type -->
      <sui-form-field>
        <label>Return Type</label>
        <sui-dropdown
          selection
          fluid
          floating
          placeholder="None"
          v-model="functionDef.type"
          :options="types"
        ></sui-dropdown>
      </sui-form-field>

      <!-- Parameters -->
      <sui-form-field>
        <label>Parameters</label>
        <component-defintions
          :definitions="functionDef.parameters"
          addTitle="Add Parameter"
          emptyMessage="No Parameters Added"
          @add="addParameter"
          @remove="removeParameter"
        >
          <template #content="{definition}">
            <parameter-definition-fields
              :componentId="componentId"
              :functionId="functionDef.id"
              :parameterDef="definition"
            />
          </template>
        </component-defintions>
      </sui-form-field>

      <!-- Dummy Value -->
      <sui-form-field>
        <label>Dummy Value</label>
        <component :is="fieldComponent" v-model="functionDef.dummy" placeholder="Empty"/>
      </sui-form-field>
    </sui-form>
    <!-- Code Editor -->
    <sui-modal v-model="open">
      <sui-modal-content style="padding: 0px; height: 400px; width: 100%;">
        <sui-modal-description>
          <monaco-editor
            ref="editor"
            class="function-editor"
            :value="refinedCode"
            @change="handleCode"
            @position="changePosition"
            language="javascript"
            theme="vs-dark"
            :options="editorOptions"
          />
        </sui-modal-description>
      </sui-modal-content>
    </sui-modal>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { types } from '@/configuration/propertyType';
import { FunctionDefinition } from '@/models';
import MonacoEditor from 'vue-monaco';
import { toCamelCase } from '@/utilities';
import ParameterDefinitionFields from '@/components/ParameterDefinitionFields.vue';
import GroupContainer from '@/components/GroupContainer.vue';
import { createUID } from '@/utilities';
import ComponentDefinitions from './ComponentDefinitions.vue';

@Component({
  components: {
    'monaco-editor': MonacoEditor,
    'group-container': GroupContainer,
    'parameter-definition-fields': ParameterDefinitionFields,
    'component-defintions': ComponentDefinitions,
  },
})
export default class FunctionDefinitionFields extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public functionDef!: FunctionDefinition;
  public editorOptions = { automaticLayout: true, selectOnLineNumbers: true, fontSize: '16px' };
  public types = types;
  public open = false;

  get codeParameters() {
    return this.functionDef.parameters.map((parDef) => toCamelCase(parDef.name)).join(', ');
  }
  get firstPart() {
    return `function ${toCamelCase(this.functionDef.name)}(${this.codeParameters}) {\n`;
  }
  get lastPart() {
    return `\n}`;
  }
  get fieldComponent() {
    const type = this.types.find((x) => x.value === this.functionDef.type);
    if (!type) {
      return;
    }
    return type.field;
  }
  get refinedCode() {
    return `${this.firstPart}${this.functionDef.code}${this.lastPart}`;
  }

  public handleCode(e: any) {
    this.functionDef.code = e.substring(this.firstPart.length, e.length - this.lastPart.length);
  }
  public changePosition(e: any) {
    const monaco = (this.$refs.editor as any).getMonaco();
    const lastLine = monaco.getModel().getLineCount();
    if (e.position.lineNumber <= 1) {
      monaco.setPosition({
        lineNumber: 2,
        column: 1,
      });
    } else if (e.position.lineNumber >= lastLine) {
      monaco.setPosition({
        lineNumber: lastLine - 1,
        column: monaco.getModel().getLineLength(lastLine - 1) + 1,
      });
    }
  }
  public toggleCode() {
    this.open = !this.open;
  }
  public addParameter() {
    this.functionDef.parameters.push({
      id: createUID(), name: '', type: 'text',
    });
  }
  public removeParameter(parameterId: string) {
    this.functionDef.parameters =
      this.functionDef.parameters.filter((x) => x.id !== parameterId);
  }
}
</script>

<style scoped>
.function-editor {
  width: 100%;
  height: 400px;
}
</style>
