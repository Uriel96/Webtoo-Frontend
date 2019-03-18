<template>
  <sui-card-group style="margin: 10px">
    <sui-card
      v-for="(component, key) in allComponents"
      :key="key"
      style="margin-top: 10px; margin: bottom: 10px;"
    >
      <sui-card-content>
        <sui-card-header>{{component.name}}</sui-card-header>
        <sui-card-meta>{{key}}</sui-card-meta>
        <Container
          :get-child-payload="getChildPayload(component, key)"
          style="width: 100%;"
          group-name="design"
          :should-accept-drop="() => false"
        >
          <Draggable style="cursor: pointer;">
            <div
              style="padding: 10px; border-style: solid; border-radius: 4px; border-color: lightgrey; background-color: white;"
            >Component</div>
          </Draggable>
        </Container>
      </sui-card-content>
    </sui-card>
  </sui-card-group>
</template>

<script lang='ts'>
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';
import { ComponentDefinitionData } from '@/models';
import { Container, Draggable } from 'vue-smooth-dnd';

@Component({
  name: 'components-tab',
  components: { Container, Draggable },
})
export default class ComponentsTab extends ExtendedVue {
  public name = 'components-tab';

  get allComponents(): { [key: string]: ComponentDefinitionData; } {
    return this.editor.componentsDefinitionData;
  }

  public getChildPayload(component: ComponentDefinitionData, componentId: string) {
    return (index: any) => ({
      component,
      componentId,
      type: 'component-definition',
    });
  }
}
</script>

<style scope>
</style>
