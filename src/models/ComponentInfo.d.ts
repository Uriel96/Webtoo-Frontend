import { ElementInfo } from './ElementInfo';
import { PropertyDefinition } from '@/models/PropertyDefinitionData';
import { FunctionDefinition } from '@/models/FunctionDefinition';
import { SlotDefinition } from './SlotDefinitionData';

export interface LibraryInfo {
  id: string;
  name: string;
  scripts: ScriptData[];
  links: LinkData[];
  components: string[];
  globals: Global[];
  contentTemplate?: string;
  dependencies: Dependency[];
}

export interface Dependency {
  library?: string;
}

export interface ComponentInfo {
  id: string;
  libraryId: string;
  tagName: string;
  name: string;
  isHTMLTag?: boolean;
  entryId?: string;
  elements?: ElementInfo[];
  style?: StyleInfo[];
  contentTemplate?: string;
  dynamicDefinitions: DynamicDefinitions;
  slots: SlotDefinition[];
}

export interface DynamicDefinitions {
  properties: PropertyDefinition[];
  data: DataDefinition[];
  functions: FunctionDefinition[];
  events: EventDefinition[];
}

export interface EventDefinition {
  id: string;
  name: string;
  type: string;
  defaultValue: any;
  dummy?: any;
  data?: any;
}

export interface Definition {
  id: string;
  type: string;
  dummy?: any;
}

export interface DataDefinition extends Definition {
  initialValue: any;
}

export interface Global {
  name: string;
}

export interface StyleInfo {
  id: string;
  value: string;
  name: string;
  type: StyleType;
}
type StyleType = 'class' | 'id' | 'custom';

export interface Definition {
  id: string;
  name: string;
  type: string;
  dummy?: any;
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
