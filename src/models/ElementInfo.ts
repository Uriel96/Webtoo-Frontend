import { PropertyData, SlotData, EventData } from './PropertyData';

export interface ElementInfo {
  id: string;
  name: string;
  componentId: string;
  parentId: string | null;
  properties: PropertyData[];
  slots?: SlotData[];
  events: EventData[];
  repeated?: boolean;
  repeat?: any;
}
