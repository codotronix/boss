import { useAppSelector } from "@/store/hooks";
import { MAP_APP_ID_TO_COMPONENT } from "@/const/MAP_APP_ID_TO_COMPONENT";
import { withWinFrame } from "@/components/system";

export const AppsRuntimeContainer = () => {
  const runningApps = useAppSelector((state) => state.apps.runningApps);
  return (
    <div>
      {Object.values(runningApps).map((runningApp) => {
        // Get the component for the running app
        // using our mapping
        const AppComponentBase =
          MAP_APP_ID_TO_COMPONENT[
            runningApp.appId as keyof typeof MAP_APP_ID_TO_COMPONENT
          ];
        if (!AppComponentBase) return null;
        // Wrap the component with WinFrame HOC
        const AppComponent = withWinFrame(AppComponentBase);
        return <AppComponent key={runningApp.runId} runningApp={runningApp} />;
      })}
    </div>
  );
};
