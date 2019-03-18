import { ComponentDefinitionData } from './ComponentDefinitionData';

export interface DroppedResult {
  payload: DroppedPayload;
  removedIndex: number;
  addedIndex: number;
}
export interface DroppedPayload {
  component: ComponentDefinitionData;
  componentId: string;
  type: DroppedPayloadType;
}
export type DroppedPayloadType = 'component-definition' | undefined;

export interface DropPayload {
  draggedId: string;
  droppedId: string;
  slotId: string;
  removedIndex: number;
  addedIndex: number;
}