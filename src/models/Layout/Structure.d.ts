import { PaneStructure } from './PaneStructure';
import { ComponentStructure } from './ComponentStructure';

export interface Structure {
  [key: string]: PaneStructure | ComponentStructure;
}
