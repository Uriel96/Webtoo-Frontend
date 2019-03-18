import { defaultLayoutStructure } from '@/configuration/editorLayout';
import { ComponentData, ComponentDefinitionData, Pane, DropPayload, PropertyData } from '@/models';
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators';
import { componentsDefinitionData } from '../temporal_data/data';
import store from '@/store';
import { reduceEntries, createUID, entries } from '@/utilities';

@Module({
  namespaced: true,
  name: 'editor',
  store,
  dynamic: true,
})
export class DesignEditorModule extends VuexModule {
  public structure: Pane = defaultLayoutStructure;
  public currentTab = '';
  public componentsDefinitionData = componentsDefinitionData;
  public currentComponentId: string = 'user1/pack1/HelloExample';
  public selectedComponentId: string | undefined = 'button-1';

  @Mutation
  public toggleTab(tab: string) {
    if (this.currentTab === tab) {
      this.currentTab = '';
    } else {
      this.currentTab = tab;
    }
  }
  @Mutation
  public setSelectedComponent(value: string) {
    this.selectedComponentId = value;
  }
  @Mutation
  public switchComponent(payload: DropPayload) {
    const { draggedId, droppedId, slotId, removedIndex, addedIndex } = payload;
    const draggedComponent = componentData(this, draggedId);
    const droppedComponent = componentData(this, droppedId);
    const template = currentComponentDefinitionData(this).template;
    if (!template || !draggedComponent || !droppedComponent) {
      return;
    }
    if (droppedComponent.slots) {
      const currentSlot = droppedComponent.slots[slotId];
      if (removedIndex !== null) {
        currentSlot.value.splice(removedIndex, 1);
      }
      if (addedIndex !== null) {
        currentSlot.value.splice(addedIndex, 0, draggedId);
      }
    }
  }
  @Mutation
  public addComponent(payload: DropPayload) {
    const { draggedId, droppedId, slotId, removedIndex, addedIndex } = payload;
    const draggedComponentDefinition = this.componentsDefinitionData[draggedId];
    const draggedComponentId = draggedComponentDefinition.name;
    const pieces = draggedId.split('/');
    pieces.pop();
    const path = pieces.join('/');
    const properties = entries(draggedComponentDefinition.properties, (entities) =>
      entities.map<[string, PropertyData]>(([key, prop]) =>
        ([key, { type: 'static', value: prop.defaultValue }]),
      ),
    );
    const slots = entries(draggedComponentDefinition.slots, (entities) =>
      entities.map<[string, PropertyData]>(([key, slot]) =>
        ([key, { type: 'static', value: slot.defaultValue }]),
      ),
    );
    const temp: ComponentData = {
      name: draggedComponentId + '-1',
      component: draggedComponentId ? draggedComponentId : undefined,
      element: draggedComponentId ? undefined : path,
      path: draggedComponentId ? path : undefined,
      properties,
      slots,
    };
    const newId = `${draggedComponentId}-${createUID()}`;
    const { template } = currentComponentDefinitionData(this);
    if (!template) {
      return;
    }
    currentComponentDefinitionData(this).template = {
      ...template,
      [newId]: temp,
    };
    const doppedComponentData = componentData(this, droppedId);
    if (!doppedComponentData || !doppedComponentData.slots) {
      return;
    }
    doppedComponentData.slots[slotId].value.splice(addedIndex, 0, newId);
  }
  @Mutation
  public initializeProperties() {
    if (!currentComponentDefinitionData(this)) {
      return;
    }
    const { template } = currentComponentDefinitionData(this);
    if (!template) {
      return;
    }
    for (const [componentId, compData] of Object.entries(template)) {
      const componentDefinition = getComponentInfo(this, compData);
      if (componentDefinition) {
        for (const [propertyId, compDefProp] of Object.entries(componentDefinition.properties)) {
          if (!compData.properties[propertyId]) {
            template[componentId].properties = {
              ...template[componentId].properties,
              [propertyId]: {
                type: 'static', value: compDefProp.defaultValue,
                dynamicId: null,
              },
            };
          }
        }
      }
    }
  }


  get currentComponentDefinitionData() {
    return currentComponentDefinitionData(this);
  }
  get componentData() {
    return (componentId: string) => {
      return componentData(this, componentId);
    };
  }
  get selectedComponent() {
    return selectedComponent(this);
  }
  get selectedComponentInfo() {
    return selectedComponentInfo(this);
  }
  get getComponentInfo() {
    return (data: ComponentData) => {
      return getComponentInfo(this, data);
    };
  }
}

const currentComponentDefinitionData = (self: DesignEditorModule) => {
  return self.componentsDefinitionData[self.currentComponentId];
};
const componentData = (self: DesignEditorModule, componentId: string) => {
  const template = currentComponentDefinitionData(self).template;
  if (!template) {
    return;
  }
  return template[componentId];
};
const selectedComponent = (self: DesignEditorModule): ComponentData | undefined => {
  if (!self.selectedComponentId) {
    return;
  }
  return componentData(self, self.selectedComponentId);
};
const selectedComponentInfo = (self: DesignEditorModule): ComponentDefinitionData | undefined => {
  const selectedComp = selectedComponent(self);
  if (!selectedComp) {
    return;
  }
  const { path, component, element } = selectedComp;
  const componentName = path ? `${path}/${component}` : element;
  if (!componentName) {
    return;
  }
  return self.componentsDefinitionData[componentName];
};
const getComponentInfo = (self: DesignEditorModule, { path, component }: ComponentData) => {
  const componentName = `${path}/${component}`;
  return self.componentsDefinitionData[componentName];
};

export default getModule(DesignEditorModule, store);
