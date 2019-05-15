export interface PropertyData {
  id: string;
  type: TypeData;
  value: any;
  dynamicId?: string | null;
  filter?: string;
}

export interface SlotData {
  id: string;
  type: TypeData;
  value: any;
  dynamicId?: string | null;
  filter?: string;
}

export interface EventData {
  id: string;
  type: TypeData;
  dynamicId?: string | null;
  arguments: ArgumentData[];
}
export interface ArgumentData {
  id: string;
  type: TypeData | 'event';
  dynamicId?: string | null;
}

export type TypeData = 'dynamic' | 'static';
