import { KeyBindings, PerformAction, Action } from '@/models';
import { reduceEntries } from '@/utilities';

export const bindKeysTo = (
  bindings: KeyBindings,
  doAction: PerformAction,
) => {
  return reduceEntries(
    Object.entries(bindings)
      .map<[string, any]>(([key, action]) => [key, doAction(key, action)]),
  );
};

export const keyBindings: KeyBindings = {
  'shift+alt+c': {
    name: 'toggleTab',
    parameters: ['components-tab'],
  },
  'shift+alt+p': {
    name: 'toggleTab',
    parameters: ['properties-tab'],
  },
  'shift+alt+x': {
    name: 'toggleTab',
    parameters: ['code-tab'],
  },
  'shift+alt+s': {
    name: 'toggleTab',
    parameters: ['structure-tab'],
  },
};
