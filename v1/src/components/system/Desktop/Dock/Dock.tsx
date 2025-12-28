import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { DockedApp } from "./DockedApp";

export const Dock = () => {
  const windowWidth = window.innerWidth;
  const installedApps = useAppSelector((state) => state.apps.installedApps);
  const dockedApps = Object.values(installedApps).filter((app) => app.isDocked);

  const handleClick = (appId: string) => {
    // Logic to open the application window
    console.log(`Open app with ID: ${appId}`);
  };

  return (
    <div
      className={cn(
        "absolute left-1/4 right-1/4 bottom-1 h-16 bg-white opacity-50 flex items-center justify-center border rounded-lg",
        windowWidth < 768 && "left-5 right-5"
      )}
    >
      {/* Docked Apps */}
      <div className="absolute left-2.5 right-26 overflow-auto">
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
        <DockedApp
          iconClass="fas fa-window-minimize"
          name="Minimized"
          onClick={() => console.log("Minimized clicked")}
        />
      </div>
    </div>
  );
};
