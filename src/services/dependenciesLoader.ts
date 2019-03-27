import { LinkData, ScriptData, ComponentInfo, LibraryInfo } from '@/models';

export const loadScripts = (libraries: LibraryInfo[], container: Element) => {
  const scripts = libraries.flatMap((lib) => lib.scripts);
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
export const loadLinks = (libraries: LibraryInfo[], container: Element) => {
  const links = libraries.flatMap((lib) => lib.links);
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
export const loadDependencies = (libraries: LibraryInfo[]) => {
  return new Promise((resolve, reject) => {
    loadLinks(libraries, document.head).then(() => {
      const scriptsContainer = document.getElementById('scripts-container');
      if (scriptsContainer) {
        loadScripts(libraries, scriptsContainer)
          .then(() => {
            resolve();
          }).catch((error) => reject(error));
      }
    }).catch((error) => reject(error));
  });
};
