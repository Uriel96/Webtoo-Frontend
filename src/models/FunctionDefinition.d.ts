import { Definition } from './ComponentInfo';

export interface FunctionDefinition extends Definition {
  parameters: ParameterDefinition[];
  code: string;
}
export interface ParameterDefinition extends Definition {
  name: string;
}