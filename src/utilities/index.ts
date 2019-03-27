import { ComponentInfo, LibraryInfo } from '@/models';
import ShortUniqueId from 'short-unique-id';
import { VueConstructor } from 'vue';
const uid = new ShortUniqueId();

export const reduceEntries = <T>(arr: (Array<[string, T]>)): { [key: string]: T } => {
  return Object.assign({}, ...arr.map(([k, v]) => ({ [k]: v })));
};
export const filterEntries = <T>(
  obj: { [key: string]: T },
  predicate: ([]) => boolean,
): { [key: string]: T } => {
  return obj ? reduceEntries(Object.entries(obj).filter(predicate)) : {};
};

export const entries = <T, M>(
  obj: { [key: string]: T },
  operation: (entities: Array<[string, T]>) => Array<[string, M]>,
): { [key: string]: M } => {
  if (!obj) {
    return {};
  }
  const ent = Object.entries(obj);
  const result = operation(ent);
  return reduceEntries(result);
};

const defaultWaitTime = 100;

const internalWaitFor = (expr: () => boolean, callback: (result: boolean) => void, waitTime = defaultWaitTime) => {
  if (expr()) {
    callback(expr());
  } else {
    setTimeout(() => {
      internalWaitFor(expr, callback);
    }, waitTime);
  }
};
export const waitFor = (expr: () => boolean, waitTime = defaultWaitTime) => {
  return new Promise((resolve, reject) => {
    internalWaitFor(expr, (result) => {
      resolve(result);
    }, waitTime);
  });
};
export const waitForGlobal = (key: string, waitTime = defaultWaitTime) => {
  return waitFor(() => !!(window as any)[key], waitTime);
};
export const InternalVue = () => {
  return (window as any).Vue as VueConstructor & { options: { components: { [key: string]: VueConstructor } } };
};
export const setInternalVueConfiguration = () => {
  InternalVue().config.devtools = false;
  InternalVue().config.productionTip = false;
  InternalVue().config.silent = true;
};
export const setInternalVueGlobals = (libraries: LibraryInfo[]) => {
  const globals = libraries.flatMap((lib) => lib.globals);
  for (const global of globals || []) {
    InternalVue().use((window as any)[global.name]);
  }
};
export const defaultTemplate = `<div><design-entry /></div>`;

export const createUID = () => {
  return uid.randomUUID(6);
};

export const get = <T extends { id: string }>(elements: T[], id: string): T | undefined => {
  return elements.find((x) => x.id === id);
};
