import { LinkData, ScriptData, ComponentDefinitionData } from '@/models';

export const loadScripts = (scripts: ScriptData[], container: Element) => {
  return Promise.all(scripts.map((script) => loadScript(script, container)));
};
export const loadScript = (script: ScriptData, container: Element) => {
  return new Promise((resolve, reject) => {
    const newScript = document.createElement('script');
    newScript.src = script.src;
    if (script.crossOrigin) {
      newScript.crossOrigin = script.crossOrigin;
    }
    newScript.type = 'text/javascript';
    newScript.onload = () => resolve();
    newScript.onerror = (event) => reject(`${(event as any).target.src} failed to load.`);
    container.appendChild(newScript);
  });
};
export const loadLinks = (links: LinkData[], container: Element) => {
  return Promise.all(links.map((link) => loadLink(link, container)));
};
export const loadLink = (link: LinkData, container: Element) => {
  return new Promise((resolve, reject) => {
    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    if (link.href) {
      newLink.href = link.href;
    }
    if (link.integrity) {
      newLink.integrity = link.integrity;
    }
    if (link.crossOrigin) {
      newLink.crossOrigin = link.crossOrigin;
    }
    newLink.onload = () => resolve();
    newLink.onerror = (event) => reject(`${(event as any).target.src} failed to load.`);
    container.appendChild(newLink);
  });
};
export const loadDependencies = (componentDefinition: ComponentDefinitionData) => {
  return new Promise((resolve, reject) => {
    const { scripts, links } = componentDefinition;
    if (links) {
      loadLinks(links, document.head).then(() => {
        if (scripts) {
          const scriptsContainer = document.getElementById('scripts-container');
          if (scriptsContainer) {
            loadScripts(scripts, scriptsContainer)
              .then(() => {
                resolve();
              }).catch((error) => reject(error));
          }
        }
      }).catch((error) => reject(error));
    }
  });
};
