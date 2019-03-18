import { Pane } from '@/models';
import { ComponentDefinitionData } from './ComponentDefinitionData';

export interface DesignEditorState {
  structure: Pane;
  currentTab: string;
  componentsDefinitionData: { [key: string]: ComponentDefinitionData };
  currentComponentId: string;
  selectedComponentId: string | undefined;
}

export interface StoreState {
  designEditor: DesignEditorState;
}
