// bootstrapRemotes.ts
import {
  __federation_method_setRemote as setRemote,
  __federation_method_getRemote as getRemote,
  __federation_method_unwrapDefault as unwrapModule,
} from "virtual:__federation__";

type ExternalApp = {
  appId: string;
  name: string;
  remoteName: string;
  remoteUrl: string;
  remoteImportPath: string;
  [key: string]: any;
};

const registeredRemotes = new Set<string>();
const moduleCache = new Map<string, Promise<any>>();

export async function bootstrapRemote(app: ExternalApp) {
  try {
    if (registeredRemotes.has(app.remoteName)) {
      return;
    }
    // Register the remote at runtime
    setRemote(app.remoteName, {
      url: () => Promise.resolve(app.remoteUrl),
      format: "esm",
      from: "vite",
    });

    registeredRemotes.add(app.remoteName);
    console.log(`Remote "${app.remoteName}" registered: ${app.remoteUrl}`);
  } catch (err) {
    console.error(`Failed to register remote "${app.remoteName}":`, err);
    throw err;
  }
}

export async function loadRemoteModule(remoteName: string, importPath: string) {
  try {
    const cacheKey = `${remoteName}:${importPath}`;
    if (moduleCache.has(cacheKey)) {
      return moduleCache.get(cacheKey);
    }

    // Use the federation API to load the module from the registered remote
    const loadPromise = (async () => {
      const remoteModule = await getRemote(remoteName, importPath);
      // Unwrap the module to get the actual component
      const Component = unwrapModule(remoteModule);

      console.log(`Loaded module "${importPath}" from remote "${remoteName}"`);
      return Component;
    })();

    moduleCache.set(cacheKey, loadPromise);
    return loadPromise;
  } catch (err) {
    console.error(
      `Failed to load module "${importPath}" from remote "${remoteName}":`,
      err
    );
    throw err;
  }
}
