import {
  ComponentInfo, PropertyDefinition, DataDefinition, FunctionDefinition,
  PropertyData, SlotData, EventData, StyleInfo, ElementInfo,
} from '@/models';
import { toCamelCase, get } from '@/utilities';
import { DesignEditorModule } from '@/store/modules/editor';
import { types } from '@/configuration/propertyType';

export const generateCode = (editor: DesignEditorModule, component: ComponentInfo) => {
  const templateCode = `<template>\n${addTabs(generateTemplate(editor, component, component.entryId))}\n</template>`;
  const scriptCode = `<script>\n${generateScript(component)}\n</script>`;
  const styleCode = `<style scoped>\n${generateStyles(component)}\n</style>`;
  return `${templateCode}\n\n${scriptCode}\n\n${styleCode}`;
};

export const generateStyles = (component: ComponentInfo) => {
  if (!component.style) {
    return '';
  }
  return component.style.map((x) => generateStyle(x)).join('\n');
};
export const generateStyle = (style: StyleInfo) => {
  const styleCode = addTabs(style.value);
  if (style.type === 'custom') {
    return style.value;
  }
  const type = style.type === 'class' ? '.' : '#';
  return `${type}${style.id} {\n${styleCode}\n}`;
};

export const generateTemplate = (
  editor: DesignEditorModule,
  component: ComponentInfo,
  elementId: string | undefined,
) => {
  if (!component.elements || !elementId) {
    return '';
  }
  const element = get(component.elements, elementId);
  if (!element) {
    return '';
  }
  const content = generateSlots(editor, component, element.slots);
  const newContent = content ? `\n${addTabs(content)}\n` : '';
  const elementComponent = editor.getComponent(element.componentId);
  if (!elementComponent) {
    return '';
  }
  const tagName = elementComponent.tagName;
  const propertiesCode = element.properties.map((x) =>
    generateProperty(editor, component, elementComponent, x),
  ).filter((x) => x !== '');
  const eventsCode = element.events.map((x) =>
    generateEvent(editor, component, element, elementComponent, x),
  ).filter((x) => x !== '');
  const listDefId = element.repeated ? toCamelCase(editor.definition(component.id, element.repeat.listId)!.name) : '';
  const itemDefId = element.repeated ? toCamelCase(element.repeat.item.name) : '';
  const indexDefId = element.repeated ? toCamelCase(element.repeat.index.name) : '';
  const repeatedCode = element.repeated ?
    `v-for="(${itemDefId}, ${indexDefId}) in ${listDefId}" :key="${indexDefId}"`
    : '';
  let contentCode = [repeatedCode, ...propertiesCode, ...eventsCode].filter((x) => !!x).join('\n');
  contentCode = contentCode ? `\n${addTabs(contentCode)}\n` : '';
  const tag = `<${tagName}${contentCode}>${newContent}</${tagName}>`;
  return tag;
};
export const generateSlots = (editor: DesignEditorModule, component: ComponentInfo, slots: SlotData[] | undefined) => {
  if (!slots) {
    return '';
  }
  return slots.map((x) => generateSlot(editor, component, x)).join('\n');
};
export const generateSlot = (editor: DesignEditorModule, component: ComponentInfo, slot: SlotData) => {
  let content = '';
  if (slot.type === 'dynamic') {
    return `{{ ${slot.dynamicId} }}`;
  }
  if (slot.value instanceof Array) {
    content = slot.value.map((x) => generateTemplate(editor, component, x)).join('\n');
  } else {
    content = slot.value;
  }
  const newContent = content ? `\n${addTabs(content)}\n` : '';
  return slot.id !== 'default' ? `<template name="${slot.id}">${newContent}</template>` : content;
};

export const generateProperty = (
  editor: DesignEditorModule,
  component: ComponentInfo,
  elementComponent: ComponentInfo,
  property: PropertyData,
) => {
  if (property.type === 'dynamic' && property.dynamicId) {
    const defId = toCamelCase(editor.definition(component.id, property.dynamicId)!.name);
    return `:${property.id}="${defId}"`;
  }
  const propertyDef = get(elementComponent.dynamicDefinitions.properties, property.id);
  if (!propertyDef) {
    return ``;
  }
  if (propertyDef.defaultValue === property.value) {
    return ``;
  }
  if (propertyDef.type === 'boolean') {
    if (property.value === 'true') {
      return property.id;
    } else {
      return `:${property.id}="false"`;
    }
  }
  if (propertyDef.type === 'style') {
    return `${property.id}="${property.value.join(' ')}"`;
  }
  return `${property.id}="${property.value}"`;
};
export const convertValue = (value: string, type: string): any => {
  if (type === 'boolean') {
    return value === 'true' ? true : false;
  }
  return value;
};

export const generateEvent = (
  editor: DesignEditorModule,
  component: ComponentInfo,
  element: ElementInfo,
  elementComponent: ComponentInfo,
  event: EventData,
) => {
  if (!event.dynamicId) {
    return `@${event.id}="() => {}"`;
  }
  const params = event.arguments.map((x) => {
    const externalDefs = editor.getExternalDefinitions(component.id, element.id);
    const externalDef = externalDefs.map((y) => {
      if (y.items && y.items.id === x.dynamicId) {
        return y.items;
      } else if (y.index && y.index.id === x.dynamicId) {
        return y.index;
      } else {
        return null;
      }
    }).find((y) => y && y.id === x.dynamicId);
    if (x.type === 'event') {
      return '$event';
    } else if (editor.definition(component.id, x.dynamicId!)) {
      return toCamelCase(editor.definition(component.id, x.dynamicId!)!.name);
    } else if (externalDef) {
      return toCamelCase(externalDef.name);
    } else {
      return x.dynamicId;
    }
  }).join(', ');
  const defId = toCamelCase(editor.definition(component.id, event.dynamicId)!.name);
  return `@${event.id}="${defId}(${params})"`;
};

export const generateScript = (component: ComponentInfo) => {
  const { properties, data, functions } = component.dynamicDefinitions;
  const propsCode = `props: {\n${addTabs(generateProps(properties))}\n}`;
  const returnDataCode = `return {\n${addTabs(generateData(data))}\n};`;
  const dataCode = `data() {\n${addTabs(returnDataCode)}\n}`;
  const functionsCode = `methods: {\n${addTabs(generateFunctions(functions))}\n}`;
  const definitions = addTabs([propsCode, dataCode, functionsCode].join(',\n'));
  const windowCode = `window['UrielS/MyPack/SemanticExample'] = Component;`;
  const exportCode = `export default Component;`;
  return `const Component = {\n${definitions} \n};\n\n${windowCode}\n${exportCode}`;
};

export const generateProps = (properties: PropertyDefinition[]) => {
  return properties.map((prop) => generateProp(prop)).join(',\n');
};
export const generateProp = (property: PropertyDefinition) => {
  const realType = types.find((x) => x.value === property.type)!.realType;
  const typeCode = `type: ${realType.name}`;
  const requiredCode = `required: true`;
  const defaultCode = `default: ${JSON.stringify(convertValue(property.defaultValue, property.type))}`;
  const propInfo = [addTabs(typeCode), addTabs(requiredCode), addTabs(defaultCode)].join(',\n');
  return `${toCamelCase(property.name)}: {\n${propInfo}\n}`;
};

export const generateData = (data: DataDefinition[]) => {
  return data.map((x) => generateDat(x)).join(',\n');
};
export const generateDat = (data: DataDefinition) => {
  return `${toCamelCase(data.name)}: ${JSON.stringify(convertValue(data.initialValue, data.type))}`;
};
export const generateFunctions = (functions: FunctionDefinition[]) => {
  return functions.map((func) => generateFunction(func)).join(',\n');
};
export const generateFunction = (func: FunctionDefinition) => {
  const parametersCode = func.parameters.map((x) => toCamelCase(x.name)).join(', ');
  return `${toCamelCase(func.name)}(${parametersCode}) {\n${func.code}\n}`;
};

export const addTabs = (text: string) => {
  return text
    .split('\n')
    .map((line) => `  ${line}`)
    .join('\n');
};
