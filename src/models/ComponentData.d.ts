import { PropertyData, SlotData } from './PropertyData';

export interface ComponentData {
  name: string;
  element?: string;
  component?: string;
  path?: string;
  globalId?: string;
  properties: PropertiesData;
  slots?: SlotsData;
}

export interface PropertiesData {
  [name: string]: PropertyData;
}

export interface SlotsData {
  [name: string]: SlotData;
}
