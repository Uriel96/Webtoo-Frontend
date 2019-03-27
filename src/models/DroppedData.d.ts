import { ComponentInfo } from './ComponentInfo';

export interface DroppedResult {
  payload: DroppedPayload;
  removedIndex: number;
  addedIndex: number;
}
export interface DroppedPayload {
  component: ComponentInfo;
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
