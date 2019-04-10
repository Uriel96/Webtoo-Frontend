import { defaultLayoutStructure } from '@/configuration/editorLayout';
import {
  ElementInfo, ComponentInfo, Pane, DropPayload, PropertyData, LibraryInfo, TreeStructure, Definition,
} from '@/models';
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators';
import { temporalComponentsInfo, libraries } from '../temporal_data/data';
import store from '@/store';
import { createUID, get, reduceEntries } from '@/utilities';

@Module({
  namespaced: true,
  name: 'editor',
  store,
  dynamic: true,
})
export class DesignEditorModule extends VuexModule {
  public structure: Pane = defaultLayoutStructure;
  public currentTab = '';
  public components = temporalComponentsInfo;
  public currentComponentId: string = 'user1/pack1/HelloExample';
  public selectedElementId: string | undefined = 'button-1';
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
  public setSelectedComponent(componentId: string) {
    this.selectedElementId = componentId;
  }
  @Mutation
  public switchComponent(payload: DropPayload) {
    const { draggedId, droppedId, slotId, removedIndex, addedIndex } = payload;
    const draggedElement = getElement(this, this.currentComponentId, draggedId);
    const droppedElement = getElement(this, this.currentComponentId, droppedId);
    const componentInfo = currentComponent(this);
    if (!componentInfo) {
      return;
    }
    const { elements } = componentInfo;
    if (!elements || !draggedElement || !droppedElement) {
      return;
    }
    if (droppedElement.slots) {
      const currentSlot = get(droppedElement.slots, slotId);
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
    const draggedComponentInfo = get(this.components, draggedId);
    if (!draggedComponentInfo) {
      return;
    }
    const properties = draggedComponentInfo.dynamicDefinitions.properties
      .map((property) =>
        ({ id: property.id, type: 'static', value: property.defaultValue } as PropertyData),
      );
    const slots = draggedComponentInfo.slots
      .map((slot) =>
        ({ id: slot.id, type: 'static', value: slot.defaultValue } as PropertyData),
      );
    const newId = `${draggedId}-${createUID()}`;
    const temp: ElementInfo = {
      id: newId,
      name: draggedComponentInfo.name + '-1',
      componentId: draggedId,
      properties,
      slots,
    };
    const componentInfo = currentComponent(this);
    if (!componentInfo) {
      return;
    }
    const { elements } = componentInfo;
    if (!elements) {
      return;
    }
    elements.push(temp);
    const doppedElement = getElement(this, this.currentComponentId, droppedId);
    if (!doppedElement || !doppedElement.slots) {
      return;
    }
    const droppedSlot = get(doppedElement.slots, slotId);
    if (!droppedSlot) {
      return;
    }
    droppedSlot.value.splice(addedIndex, 0, newId);
  }
  @Mutation
  public initializeProperties() {
    const componentInfo = currentComponent(this);
    if (!componentInfo) {
      return;
    }
    const { elements } = componentInfo;
    if (!elements) {
      return;
    }
    for (const element of elements) {
      const elementComponent = getComponent(this, element.componentId);
      if (elementComponent) {
        for (const propertyDef of elementComponent.dynamicDefinitions.properties) {
          const propertyData = get(element.properties, propertyDef.id);
          if (!propertyData) {
            const newProperty = {
              id: propertyDef.id,
              type: 'static', value: propertyDef.defaultValue,
              dynamicId: null,
            } as PropertyData;
            element.properties.push(newProperty);
          }
        }
      }
    }
  }

  get getLibrary() {
    return (libraryId: string) => {
      return get(this.libraries, libraryId);
    };
  }
  get getDependencies() {
    return (libraryId: string) => {
      const library = get(this.libraries, libraryId);
      return getDependencies(this, library);
    };
  }
  get getElement() {
    return (componentId: string | undefined, elementId: string | undefined) => {
      return getElement(this, componentId, elementId);
    };
  }
  get getComponent() {
    return (componentId: string) => {
      return getComponent(this, componentId);
    };
  }
  get selectedPropertyData() {
    return (propertyId: string) => {
      if (!this.selectedElement) {
        return;
      }
      return get(this.selectedElement.properties, propertyId);
    };
  }
  get selectedSlotData() {
    return (slotId: string) => {
      if (!this.selectedElement || !this.selectedElement.slots) {
        return;
      }
      return get(this.selectedElement.slots, slotId);
    };
  }
  get getStaticSlots() {
    return (componentId?: string | undefined, elementId?: string | undefined) => {
      return getStaticSlots(this, componentId, elementId);
    };
  }
  get getStaticProperties() {
    return (componentId: string | undefined, elementId: string | undefined) => {
      return getStaticProperties(this, componentId, elementId);
    };
  }
  get getDynamicDummyProperties() {
    return (componentId: string | undefined, elementId: string | undefined) => {
      return getDynamicDummyProperties(this, componentId, elementId);
    };
  }
  get getComponentStyles() {
    return (componentId: string | undefined, elementId: string | undefined) => {
      return getComponentStyles(this, componentId, elementId);
    };
  }
  get getStructure() {
    return (componentId: string | undefined, elementId: string | undefined) => {
      return getStructure(this, componentId, elementId);
    };
  }

  get currentComponent() {
    return currentComponent(this);
  }
  get selectedElement() {
    return selectedElement(this);
  }
  get selectedComponent() {
    return selectedComponent(this);
  }
}

const currentComponent = (self: DesignEditorModule) => {
  return get(self.components, self.currentComponentId);
};
const getElement = (self: DesignEditorModule, componentId: string | undefined, elementId: string | undefined) => {
  if (!componentId || !elementId) {
    return;
  }
  const componentInfo = getComponent(self, componentId);
  if (!componentInfo) {
    return;
  }
  const { elements } = componentInfo;
  if (!elements) {
    return;
  }
  return get(elements, elementId);
};
const selectedElement = (self: DesignEditorModule): ElementInfo | undefined => {
  if (!self.selectedElementId) {
    return;
  }
  return getElement(self, self.currentComponentId, self.selectedElementId);
};
const selectedComponent = (self: DesignEditorModule): ComponentInfo | undefined => {
  const selectedComp = selectedElement(self);
  if (!selectedComp) {
    return;
  }
  return get(self.components, selectedComp.componentId);
};
const getComponent = (self: DesignEditorModule, componentId: string | undefined) => {
  return get(self.components, componentId);
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
const getStaticSlots = (self: DesignEditorModule, componentId: string | undefined, elementId: string | undefined) => {
  const componentInfo = getComponent(self, componentId);
  const elementInfo = getElement(self, componentId, elementId);
  if (!componentInfo || !elementInfo) {
    return [];
  }
  const { slots } = elementInfo;
  if (!slots) {
    return [];
  }
  return slots
    .filter((slot) => slot.type === 'static');
};
const getStaticProperties = (
  self: DesignEditorModule,
  componentId: string | undefined,
  elementId: string | undefined,
) => {
  const componentInfo = getComponent(self, componentId);
  const elementInfo = getElement(self, componentId, elementId);
  if (!componentInfo || !elementInfo) {
    return {};
  }
  const { properties } = elementInfo;
  return reduceEntries(properties
    .filter((property) => property.type === 'static')
    .map<[string, any]>((property) => {
      const elementComponent = getComponent(self, elementInfo.componentId);
      if (!elementComponent) {
        return [property.id, undefined];
      }
      const propertyDefinition = get(elementComponent.dynamicDefinitions.properties, property.id);
      if (!propertyDefinition) {
        return [property.id, undefined];
      }
      if (propertyDefinition.type === 'boolean-property') {
        return [property.id, property.value === 'true'];
      } else {
        return [property.id, property.value];
      }
    }));
};
const getDynamicDummyProperties = (
  self: DesignEditorModule,
  componentId: string | undefined,
  elementId: string | undefined,
) => {
  const componentInfo = getComponent(self, componentId);
  const elementInfo = getElement(self, componentId, elementId);
  if (!componentInfo || !elementInfo) {
    return {};
  }
  const { properties } = elementInfo;
  return reduceEntries(properties
    .filter((property) => property.type === 'dynamic' && property.dynamicId)
    .map<[string, any]>((property) => {
      if (!property.dynamicId) {
        return [property.id, undefined];
      }
      let definition: Definition | undefined = get(componentInfo.dynamicDefinitions.properties, property.dynamicId);
      if (!definition) {
        definition = get(componentInfo.dynamicDefinitions.data, property.dynamicId);
      }
      if (!definition) {
        return [property.id, undefined];
      }
      if (definition.type === 'boolean-property') {
        return [property.id, definition.dummy === 'true'];
      } else {
        return [property.id, definition.dummy];
      }
    }));
};
const getComponentStyles = (
  self: DesignEditorModule,
  componentId: string | undefined,
  elementId: string | undefined,
) => {
  const componentInfo = getComponent(self, componentId);
  const elementInfo = getElement(self, componentId, elementId);
  if (!componentInfo || !elementInfo) {
    return '';
  }
  const classInfo = get(elementInfo.properties, 'class');
  if (!classInfo) {
    return '';
  }
  const { style } = componentInfo;
  if (!style) {
    return '';
  }
  const styleClasses = classInfo.value as string[];
  return styleClasses.map((styleClass) => {
    const currentStyle = get(style, styleClass);
    if (!currentStyle) {
      return '';
    }
    return currentStyle.value || '';
  }).join(' ');
};
const getStructure = (
  self: DesignEditorModule,
  componentId: string | undefined,
  elementId: string | undefined,
): TreeStructure[] => {
  if (!componentId || !elementId) {
    return [];
  }
  const elementInfo = getElement(self, componentId, elementId);
  if (!elementInfo || !elementInfo.slots) {
    return [];
  }
  const slots = elementInfo.slots.map((slot) => {
    let children = slot.value;
    if (children instanceof Array) {
      children = slot.value
        .map((childElementId: string) => getStructure(self, componentId, childElementId))
        .flat(1);
    }
    return { id: elementId, title: slot.id, children };
  });
  return [{ id: elementId, title: elementInfo.name, children: slots }];
};


export default getModule(DesignEditorModule, store);
