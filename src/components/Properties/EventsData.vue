<template>
  <div>
    <div v-for="event in events" :key="event.id">
      <sui-form-field>
        <label>{{ event.name }}</label>
        <sui-dropdown
          selection
          fluid
          floating
          placeholder="Dynamic data"
          v-model="getEventData(event.id).dynamicId"
          @input="updateEvent($event, event)"
          :options="dynamicOptions"
        ></sui-dropdown>
      </sui-form-field>
      <div v-if="getEventData(event.id).dynamicId">
        <div
          v-for="(param, index) in getFunction(getEventData(event.id).dynamicId).parameters"
          :key="param.id"
        >
          <component
            v-if="getArgument(event.id, index).type !== 'event'"
            :is="getComponent(param.type)"
            :elementId="elementId"
            :propertyDef="param"
            :propertyData="getArgument(event.id, index)"
          />
          <sui-form-field
            v-if="!hasEvent(event.id) || getArgument(event.id, index).type === 'event'"
          >
            <label v-if="getArgument(event.id, index).type === 'event'">{{ param.name }}</label>
            <sui-checkbox
              style="margin-left: 10px; margin-top: 0px; margin-bottom: 10px;"
              label="Is Event"
              :value="getArgument(event.id, index).type === 'event' ? 'true' : undefined"
              @input="(e) => getArgument(event.id, index).type = e.target.checked ? 'event' : 'dynamic'"
            />
          </sui-form-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component, Prop } from 'vue-property-decorator';
import { get } from '@/utilities';
import { ArgumentData, EventDefinition } from '@/models';
import { types } from '@/configuration/propertyType';

@Component
export default class EventsData extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public elementId!: string;

  get componentInfo() {
    return this.editor.getComponent(this.componentId);
  }
  get elementInfo() {
    return this.editor.getElement(this.componentId, this.elementId);
  }
  get elementComponent() {
    return this.editor.getElementComponent(this.componentId, this.elementId);
  }
  get events() {
    return this.elementComponent ? this.elementComponent.dynamicDefinitions.events : [];
  }
  get dynamicOptions() {
    return this.componentInfo ? this.componentInfo.dynamicDefinitions.functions
      .map((property) => ({
        text: property.name,
        value: property.id,
      })) : [];
  }

  public mounted() {
    for (const event of this.events) {
      const { parameters } = this.getFunction(this.getEventData(event.id)!.dynamicId!)!;
      const newArguments = parameters
        .map((paramDef) => ({ id: paramDef.id, type: 'static', dynamicId: null, value: null } as ArgumentData));
      this.getEventData(event.id)!.arguments = newArguments;
    }
  }

  public getEventData(eventId: string) {
    return this.elementInfo ? get(this.elementInfo.events, eventId) : undefined;
  }
  public getFunction(id: string) {
    return this.componentInfo ? get(this.componentInfo.dynamicDefinitions.functions, id) : undefined;
  }
  public updateEvent(e, event: EventDefinition) {
    const { parameters } = this.getFunction(e)!;
    const newArguments = parameters
      .map((paramDef) => ({ id: paramDef.id, type: 'static', dynamicId: null, value: null } as ArgumentData));
    this.getEventData(event.id)!.arguments = newArguments;
  }
  public getComponent(type: string) {
    const typeCompnent = types.find((x) => x.value === type);
    if (!typeCompnent) {
      return;
    }
    return typeCompnent.component;
  }
  public getArgument(eventId: string, index: number) {
    return this.getEventData(eventId)!.arguments[index];
  }
  public hasEvent(eventId: string) {
    return !!this.getEventData(eventId)!.arguments.find((arg) => arg.type === 'event');
  }
}
</script>

<style scoped>
</style>
