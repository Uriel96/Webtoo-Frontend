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

export type TypeData = 'dynamic' | 'static';
