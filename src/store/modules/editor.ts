import { defaultLayoutStructure } from '@/configuration/editorLayout';
import { ElementInfo, ComponentInfo, Pane, DropPayload, PropertyData, LibraryInfo } from '@/models';
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators';
import { componentsDefinitionData, libraries } from '../temporal_data/data';
import store from '@/store';
import { createUID, entries, get } from '@/utilities';

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
  public libraries = libraries;

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
    const componentDefinition = currentComponentDefinitionData(this);
    if (!componentDefinition) {
      return;
    }
    const { elements } = componentDefinition;
    if (!elements || !draggedComponent || !droppedComponent) {
      return;
    }
    if (droppedComponent.slots) {
      const currentSlot = get(droppedComponent.slots, slotId);
      if (!currentSlot) {
        return;
      }
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
    const draggedComponentDefinition = get(this.componentsDefinitionData, draggedId);
    if (!draggedComponentDefinition) {
      return;
    }
    const properties = draggedComponentDefinition.dynamicDefinitions.properties
      .map((property) =>
        ({ id: property.id, type: 'static', value: property.defaultValue } as PropertyData),
      );
    const slots = draggedComponentDefinition.slots
      .map((slot) =>
        ({ id: slot.id, type: 'static', value: slot.defaultValue } as PropertyData),
      );
    const newId = `${draggedId}-${createUID()}`;
    const temp: ElementInfo = {
      id: newId,
      name: draggedComponentDefinition.name + '-1',
      componentId: draggedId,
      properties,
      slots,
    };
    const componentDefinition = currentComponentDefinitionData(this);
    if (!componentDefinition) {
      return;
    }
    const { elements } = componentDefinition;
    if (!elements) {
      return;
    }
    componentDefinition.elements = [
      ...elements,
      temp,
    ];
    const doppedComponentData = componentData(this, droppedId);
    if (!doppedComponentData || !doppedComponentData.slots) {
      return;
    }
    const droppedSlot = get(doppedComponentData.slots, slotId);
    if (!droppedSlot) {
      return;
    }
    droppedSlot.value.splice(addedIndex, 0, newId);
  }
  @Mutation
  public initializeProperties() {
    const componentInfo = currentComponentDefinitionData(this);
    if (!componentInfo) {
      return;
    }
    const { elements } = componentInfo;
    if (!elements) {
      return;
    }
    for (const element of elements) {
      const componentDefinition = getComponentInfo(this, element.componentId);
      if (componentDefinition) {
        for (const propertyDef of componentDefinition.dynamicDefinitions.properties) {
          const propertyData = get(element.properties, propertyDef.id);
          if (!propertyData) {
            element.properties = [
              ...element.properties,
              {
                id: propertyDef.id,
                type: 'static', value: propertyDef.defaultValue,
                dynamicId: null,
              },
            ];
          }
        }
      }
    }
  }

  get getComponentDefinition() {
    return (id: string) => {
      return get(this.componentsDefinitionData, id);
    };
  }
  get getLibrary() {
    return (id: string) => {
      return get(this.libraries, id);
    };
  }

  get dependencies() {
    return (libraryId: string) => {
      const library = get(this.libraries, libraryId);
      return getDependencies(this, library);
    };
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
    return (data: ElementInfo) => {
      return getComponentInfo(this, data.componentId);
    };
  }
  get selectedPropertyData() {
    return (propertyId: string) => {
      if (!this.selectedComponent) {
        return;
      }
      return get(this.selectedComponent.properties, propertyId);
    };
  }
  get selectedSlotData() {
    return (slotId: string) => {
      if (!this.selectedComponent || !this.selectedComponent.slots) {
        return;
      }
      return get(this.selectedComponent.slots, slotId);
    };
  }
}

const currentComponentDefinitionData = (self: DesignEditorModule) => {
  return get(self.componentsDefinitionData, self.currentComponentId);
};
const componentData = (self: DesignEditorModule, componentId: string) => {
  const componentDefinition = currentComponentDefinitionData(self);
  if (!componentDefinition) {
    return;
  }
  const { elements } = componentDefinition;
  if (!elements) {
    return;
  }
  return get(elements, componentId);
};
const selectedComponent = (self: DesignEditorModule): ElementInfo | undefined => {
  if (!self.selectedComponentId) {
    return;
  }
  return componentData(self, self.selectedComponentId);
};
const selectedComponentInfo = (self: DesignEditorModule): ComponentInfo | undefined => {
  const selectedComp = selectedComponent(self);
  if (!selectedComp) {
    return;
  }
  return get(self.componentsDefinitionData, selectedComp.componentId);
};
const getComponentInfo = (self: DesignEditorModule, componentId: string) => {
  return get(self.componentsDefinitionData, componentId);
};
const getDependencies = (self: DesignEditorModule, library?: LibraryInfo): LibraryInfo[] => {
  if (!library) {
    return [];
  }
  return library.dependencies.filter((x) => x.library).flatMap((dep) => {
    if (!dep.library) {
      return [];
    }
    const currentLib = get(self.libraries, dep.library);
    if (!currentLib) {
      return [];
    }
    return [currentLib, ...getDependencies(self, currentLib)];
  });
};


export default getModule(DesignEditorModule, store);
