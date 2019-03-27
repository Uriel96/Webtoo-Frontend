import { Pane } from '@/models';
import { ComponentInfo } from './ComponentInfo';

export interface DesignEditorState {
  structure: Pane;
  currentTab: string;
  componentsDefinitionData: { [key: string]: ComponentInfo };
  currentComponentId: string;
  selectedComponentId: string | undefined;
}

export interface StoreState {
  designEditor: DesignEditorState;
}
