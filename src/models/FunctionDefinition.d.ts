import { Definition } from './ComponentInfo';

export interface FunctionDefinition extends Definition {
  parameters: string[];
  code: string;
}
