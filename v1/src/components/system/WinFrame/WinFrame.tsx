import { type ReactNode, useState } from "react";
import { type IAppComponentBaseProps } from "@/const/APPS";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeApp } from "@/store/slices/appsSlice";
import { cn } from "@/lib/utils";
interface WinFrameProps extends IAppComponentBaseProps {
  children: ReactNode;
}
const WinFrame = ({ children, runningApp }: WinFrameProps) => {
  const installedApps = useAppSelector((state) => state.apps.installedApps);
  const appInfo = runningApp ? installedApps[runningApp.appId] : undefined;
  const dispatch = useAppDispatch();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    console.log(`Close app with run ID: ${runningApp.runId}`);
    setIsClosing(true);
    // dispatch closeApp action after a closing animation
    setTimeout(() => {
      dispatch(closeApp({ runId: runningApp.runId }));
    }, 1000);
  };

  return (
    <div
      className={cn(
        "winframe fixed-fullscreen bg-background shadow-lg opacity-90",
        isClosing && "scale-0 transition-all opacity-0 duration-500 ease-in-out"
      )}
    >
      {/* The titlebar */}
      <div className="winframe-titlebar text-sm h-7 bg-blue-600 text-white flex items-center justify-between px-3 select-none">
        <div className="winframe-title">
          {appInfo ? appInfo.name : "My Application"}
        </div>
        <div className="winframe-controls flex space-x-3">
          <button className="winframe-btn minimize">
            <i className="fa-solid fa-window-minimize"></i>
          </button>
          <button className="winframe-btn maximize">
            <i className="fa-solid fa-expand"></i>
          </button>
          <button
            className="winframe-btn close active:scale-95"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      {/* menubar */}
      <div className="winframe-menubar h-6 text-sm bg-blue-500 text-white flex items-center px-3 select-none">
        <div className="winframe-menu-item mr-4 cursor-pointer">File</div>
        <div className="winframe-menu-item mr-4 cursor-pointer">Edit</div>
        <div className="winframe-menu-item mr-4 cursor-pointer">View</div>
        <div className="winframe-menu-item mr-4 cursor-pointer">Help</div>
      </div>

      <div className="winframe-content">{children}</div>
    </div>
  );
};

export function withWinFrame(
  WrappedComponent: React.ComponentType<IAppComponentBaseProps>
) {
  return (props: React.ComponentProps<typeof WrappedComponent>) => {
    return (
      <WinFrame {...props}>
        <WrappedComponent {...props} />
      </WinFrame>
    );
  };
}
