import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  closeApp,
  runApp,
  mizeApp,
  getHighestZIndex,
} from "@/store/slices/appsSlice";
import { DockedApp } from "./DockedApp";
import { WINDOW_SIZES } from "@/const/WINFRAME";

export const Dock = () => {
  const windowWidth = window.innerWidth;
  const [isMinimizedListVisible, setIsMinimizedListVisible] = useState(false);
  const [dockZindex, setDockZIndex] = useState(1);
  const dispatch = useAppDispatch();
  const installedApps = useAppSelector((state) => state.apps.installedApps);
  const runningApps = useAppSelector((state) => state.apps.runningApps);

  // Get the list of docked apps
  const dockedApps = Object.values(installedApps).filter((app) => app.isDocked);

  const minimizedApps = Object.values(runningApps).filter(
    (app) => app.windowSize === WINDOW_SIZES.MINIMIZED
  );

  // Handle click on a docked app
  const handleClickToLaunchApp = (appId: string) => {
    // Logic to open the application window
    console.log(`Open app with ID: ${appId}`);
    dispatch(runApp({ appId }));
  };

  const handleCloseApp = (runId: string) => {
    console.log(`Close app with run ID: ${runId}`);
    dispatch(closeApp({ runId }));
  };

  const handleRestoreMinimizedApp = (runId: string) => {
    console.log(`Restore app with run ID: ${runId}`);
    dispatch(mizeApp({ runId, windowSize: WINDOW_SIZES.RESTORE }));
    setIsMinimizedListVisible(false);
  };

  const toggleMinimizedList = () => {
    setIsMinimizedListVisible((v) => {
      if (!v) {
        // Bring dock to front when opening minimized apps list
        const highestZIndex = getHighestZIndex(runningApps);
        setDockZIndex(highestZIndex + 1);
      }
      return !v;
    });
  };

  return (
    <div
      className={cn(
        "absolute left-1/4 right-1/4 bottom-1 h-16 bg-blue-500 flex items-center justify-center border rounded-lg shadow-lg",
        windowWidth < 768 && "left-5 right-5"
      )}
      style={{ zIndex: dockZindex }}
    >
      {/* Docked Apps */}
      <div className="flex justify-center absolute left-2.5 right-26 overflow-auto">
        <div className="flex flex-row items-center justify-center">
          {dockedApps.map((app) => (
            <DockedApp
              key={app.appId}
              iconClass={app.iconClass}
              name={app.name}
              onClick={() => handleClickToLaunchApp(app.appId)}
            />
          ))}
        </div>
      </div>

      {/* Minimized Apps */}
      <div className="absolute right-0 top-1.5 border-l border-l-black group">
        <button className="absolute left-0 right-0 -top-1 text-center text-xl font-bold select-none text-blue-100 group-hover:text-blue-300">
          {minimizedApps.length}
        </button>
        <DockedApp
          iconClass="fas fa-window-minimize"
          name="Minimized"
          onClick={toggleMinimizedList}
          className="group-hover:opacity-70"
        />
      </div>

      {/* Minimized Apps List */}
      <div
        className={cn(
          "absolute right-0 bottom-15 mb-2 min-w-40 bg-blue-500 text-blue-100 border rounded-lg shadow-lg overflow-hidden py-2 transition-all scale-y-0 origin-bottom opacity-0",
          isMinimizedListVisible && "translate-y-0 scale-y-100 opacity-100"
        )}
      >
        {minimizedApps.length === 0 ? (
          <div className="p-2">No minimized apps</div>
        ) : (
          minimizedApps.map((app) => {
            const appInfo = installedApps[app.appId];
            return (
              <div
                key={app.runId}
                className="flex items-center rounded cursor-pointer select-none"
              >
                <button
                  className="hover:bg-blue-100/30 h-8 text-left px-3 flex-1"
                  onClick={() => handleRestoreMinimizedApp(app.runId)}
                >
                  <i className={`${appInfo.iconClass} text-lg mr-2`}></i>
                  <span className="text-sm">{appInfo.name}</span>
                </button>
                <button
                  className="w-10 h-8 hover:bg-red-100/10 text-red-100 flex items-center justify-center"
                  onClick={() => handleCloseApp(app.runId)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
