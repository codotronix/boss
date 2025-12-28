import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { runApp } from "@/store/slices/appsSlice";
import { DockedApp } from "./DockedApp";
import { WINDOW_SIZES } from "@/const/WINFRAME";

export const Dock = () => {
  const windowWidth = window.innerWidth;
  const dispatch = useAppDispatch();
  const installedApps = useAppSelector((state) => state.apps.installedApps);
  const runningApps = useAppSelector((state) => state.apps.runningApps);

  // Get the list of docked apps
  const dockedApps = Object.values(installedApps).filter((app) => app.isDocked);

  const minimizedApps = Object.values(runningApps).filter(
    (app) => app.windowSize === WINDOW_SIZES.MINIMIZED
  );

  // Handle click on a docked app
  const handleClick = (appId: string) => {
    // Logic to open the application window
    console.log(`Open app with ID: ${appId}`);
    dispatch(runApp({ appId }));
  };

  return (
    <div
      className={cn(
        "absolute left-1/4 right-1/4 bottom-1 h-16 bg-white opacity-50 flex items-center justify-center border rounded-lg",
        windowWidth < 768 && "left-5 right-5"
      )}
    >
      {/* Docked Apps */}
      <div className="flex absolute left-2.5 right-26 overflow-auto">
        <div className="flex flex-row items-center justify-center">
          {dockedApps.map((app) => (
            <DockedApp
              key={app.appId}
              iconClass={app.iconClass}
              name={app.name}
              onClick={() => handleClick(app.appId)}
            />
          ))}
        </div>
      </div>

      {/* Minimized Apps */}
      <div className="absolute right-0 top-1.5 border-l border-l-black">
        <button className="absolute left-0 right-0 -top-1 text-center text-xl text-blue-500 font-bold select-none">
          {minimizedApps.length}
        </button>
        <DockedApp
          iconClass="fas fa-window-minimize"
          name="Minimized"
          onClick={() => console.log("Minimized clicked")}
        />
      </div>
    </div>
  );
};
