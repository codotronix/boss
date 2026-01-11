// import { withWinFrame } from "@/components/system";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { runApp } from "@/store/slices/appsSlice";

export const AppsViewerApp = () => {
  const installedApps = useAppSelector((state) => state.apps.installedApps);
  const dispatch = useAppDispatch();

  // Handle double-click or Enter/Space key to open app
  const handleDoubleClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
    appId: string
  ) => {
    e.stopPropagation();
    // if key event, ensure it's Enter or Space
    if (
      "key" in e &&
      e.type === "keyup" &&
      e.key !== "Enter" &&
      e.key !== " "
    ) {
      return;
    }
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
            onDoubleClick={(e) => handleDoubleClick(e, app.appId)}
            onKeyUp={(e) => handleDoubleClick(e, app.appId)}
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
