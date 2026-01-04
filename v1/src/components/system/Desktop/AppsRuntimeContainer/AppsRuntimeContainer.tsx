import { useAppSelector } from "@/store/hooks";
import { MAP_APP_ID_TO_COMPONENT } from "@/const/MAP_APP_ID_TO_COMPONENT";
import { withWinFrame } from "@/components/system";
import { WINDOW_SIZES } from "@/const/WINFRAME";

// Pre-wrap all components with WinFrame ONCE, outside the component
const WRAPPED_COMPONENTS = Object.fromEntries(
  Object.entries(MAP_APP_ID_TO_COMPONENT).map(([appId, Component]) => [
    appId,
    withWinFrame(Component),
  ])
);

export const AppsRuntimeContainer = () => {
  const runningApps = useAppSelector((state) => state.apps.runningApps);
  return (
    <div id="apps-runtime-container">
      {Object.values(runningApps)
        .filter(
          (runningApp) => runningApp.windowSize !== WINDOW_SIZES.MINIMIZED
        )
        .map((runningApp) => {
          // Get the component for the running app
          // using our mapping
          const AppComponent =
            WRAPPED_COMPONENTS[
              runningApp.appId as keyof typeof MAP_APP_ID_TO_COMPONENT
            ];
          if (!AppComponent) return null;
          return (
            <AppComponent key={runningApp.runId} runningApp={runningApp} />
          );
        })}
    </div>
  );
};
