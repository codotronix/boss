import { Suspense, lazy, useMemo } from "react";
import { MAP_APP_ID_TO_COMPONENT } from "@/const/MAP_APP_ID_TO_COMPONENT";
import { withWinFrame } from "@/components/system";
import type { IAppComponentBaseProps, IInstalledApp } from "@/const/APPS";
import { bootstrapRemote, loadRemoteModule } from "./bootstrapRemotes";

export interface IDynamicAppProps extends IAppComponentBaseProps {
  appId: string;
  installedApp: IInstalledApp;
  [key: string]: any;
}

type TDynamicApp = React.ComponentType<IDynamicAppProps>;

const DynamicAppBase = (props: IDynamicAppProps) => {
  const {
    appId,
    installedApp: { name },
  } = props;
  let AppComponent = MAP_APP_ID_TO_COMPONENT[
    appId as keyof typeof MAP_APP_ID_TO_COMPONENT
  ] as TDynamicApp;

  if (AppComponent) {
    return <AppComponent {...props} />;
  }

  // If we reach here, it means the app is not found locally
  // Check if it's a remote app
  const {
    installedApp: { remoteName, remoteUrl, remoteImportPath },
  } = props;
  if (!remoteName || !remoteUrl || !remoteImportPath) {
    return <div>App with ID "{appId}" not found.</div>;
  }

  // if the appId is not found in the mapping,
  // it must be a remote app
  // Lazy-load the remote app via module federation
  const RemoteApp: TDynamicApp = useMemo(
    () =>
      lazy(async () => {
        await bootstrapRemote({
          remoteName,
          remoteUrl,
          appId,
          name,
          remoteImportPath,
        } as any);
        // Use federation API to load the module instead of static import()
        const Component = await loadRemoteModule(remoteName, remoteImportPath);

        if (!Component) {
          throw new Error(
            `${remoteImportPath} did not return a component. Check the remote's exposes.`
          );
        }

        return { default: Component };
      }),
    [remoteName, remoteUrl, remoteImportPath, appId, name]
  );

  return (
    <Suspense fallback={<div>Loading Remote App: {name}...</div>}>
      <RemoteApp {...props} />
    </Suspense>
  );
};

export const DynamicApp = withWinFrame(DynamicAppBase);
