import { PropertyData, SlotData } from './PropertyData';

export interface ElementInfo {
  id: string;
  name: string;
  componentId: string;
  properties: PropertyData[];
  slots?: SlotData[];
}