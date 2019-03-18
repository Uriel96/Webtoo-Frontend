import { ComponentData } from './ComponentData';
import { PropertyDefinitionData } from '@/models/PropertyDefinitionData';
import { MethodDefinitionData } from '@/models/MethodDefinitionData';
import { SlotDefinitionData } from './SlotDefinitionData';

export interface ComponentsDefinitionData {
  [key: string]: ComponentDefinitionData;
}
export interface ComponentDefinitionData {
  name: string;
  entryId?: string;
  template?: Template;
  style?: Style;
  contentTemplate?: string;
  globals?: string[];
  properties: Properties;
  slots: Slots;
  data: Data;
  methods: Methods;
  scripts?: ScriptData[];
  links?: LinkData[];
}

export interface Template {
  [name: string]: ComponentData;
}
export interface Style {
  [name: string]: string;
}
export interface Data {
  [name: string]: any;
}
export interface Methods {
  [name: string]: MethodDefinitionData;
}
export interface Properties {
  [name: string]: PropertyDefinitionData;
}
export interface Slots {
  [name: string]: SlotDefinitionData;
}
export interface ScriptData {
  src: string;
  crossOrigin?: string;
}
export interface LinkData {
  href: string;
  integrity?: string;
  crossOrigin?: string;
}
