import { Pane } from '@/models';
import { ComponentInfo } from './ComponentInfo';

export interface DesignEditorState {
  structure: Pane;
  currentTab: string;
  components: { [key: string]: ComponentInfo };
  currentComponentId: string;
  selectedComponentId: string | undefined;
}

export interface StoreState {
  designEditor: DesignEditorState;
}
