export interface PropertyData {
  type: TypeData;
  value: any;
  dynamicId?: string | null;
  filter?: string;
}

export interface SlotData {
  type: TypeData;
  value: any;
  dynamicId?: string | null;
  filter?: string;
}

export type TypeData = 'dynamic' | 'static';