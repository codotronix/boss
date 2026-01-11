import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
// import { MAP_APP_ID_TO_COMPONENT } from "@/const/MAP_APP_ID_TO_COMPONENT";
// import { withWinFrame } from "@/components/system";
import { WINDOW_SIZES } from "@/const/WINFRAME";
import { DynamicApp } from "./DynamicApp";
// Pre-wrap all components with WinFrame ONCE, outside the component
// function getWrappedComponents() {}
// const WRAPPED_COMPONENTS = Object.fromEntries(
//   Object.entries(MAP_APP_ID_TO_COMPONENT).map(([appId, Component]) => [
//     appId,
//     withWinFrame(Component),
//   ])
// );

export const AppsRuntimeContainer = () => {
  const runningApps = useAppSelector((state) => state.apps.runningApps);
  const installedApps = useAppSelector((state) => state.apps.installedApps);

  const appsRepository = useMemo(() => {
    return Object.entries(installedApps).reduce((acc, [appId, app]) => {
      acc[appId] = (props: any) => (
        <DynamicApp {...props} appId={appId} installedApp={app} />
      );
      return acc;
    }, {} as { [appId: string]: React.ComponentType<any> });
  }, [installedApps]);

  return (
    <div id="apps-runtime-container">
      {Object.values(runningApps)
        .filter(
          (runningApp) => runningApp.windowSize !== WINDOW_SIZES.MINIMIZED
        )
        .map((runningApp) => {
          // Get the component for the running app
          // using our mapping
          const AppComponent = appsRepository[runningApp.appId];
          if (!AppComponent) return null;
          return (
            <AppComponent key={runningApp.runId} runningApp={runningApp} />
          );
        })}
    </div>
  );
};
