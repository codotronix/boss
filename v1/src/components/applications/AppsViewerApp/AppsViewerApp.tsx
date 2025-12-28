// import { withWinFrame } from "@/components/system";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { runApp } from "@/store/slices/appsSlice";

export const AppsViewerApp = () => {
  const installedApps = useAppSelector((state) => state.apps.installedApps);
  const dispatch = useAppDispatch();

  const handleClick = (appId: string) => {
    // Logic to open the application window
    console.log(`Open app with ID: ${appId}`);
    dispatch(runApp({ appId }));
  };

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 p-4">
        {Object.values(installedApps).map((app) => (
          <button
            key={app.appId}
            className="p-4 text-center rounded-lg text-blue-800 hover:bg-blue-200 transition-colors active:scale-95"
            onClick={() => handleClick(app.appId)}
          >
            <i className={`${app.iconClass} text-3xl mr-2`}></i>
            <div className="mt-3">{app.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// export const AppsViewerApp = withWinFrame(AppsViewerAppBase);
