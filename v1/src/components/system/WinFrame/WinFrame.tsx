import { type ReactNode, useState } from "react";
import { type IAppComponentBaseProps } from "@/const/APPS";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeApp, mizeApp } from "@/store/slices/appsSlice";
import { cn } from "@/lib/utils";
import { WINDOW_SIZES } from "@/const/WINFRAME";

interface WinFrameProps extends IAppComponentBaseProps {
  children: ReactNode;
}

// The WinFrame component
// But this should not be used directly
// Instead, use the withWinFrame HOC defined after this component
const WinFrame = ({ children, runningApp }: WinFrameProps) => {
  const installedApps = useAppSelector((state) => state.apps.installedApps);
  const appInfo = runningApp ? installedApps[runningApp.appId] : undefined;
  const dispatch = useAppDispatch();
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);

  const handleClose = () => {
    console.log(`Close app with run ID: ${runningApp.runId}`);
    setIsClosing(true);
    // dispatch closeApp action after a closing animation
    setTimeout(() => {
      dispatch(closeApp({ runId: runningApp.runId }));
    }, 1000);
  };

  const onMaximize = () => {
    console.log(`Maximize app with run ID: ${runningApp.runId}`);
    // dispatch maximize action
    dispatch(
      mizeApp({ runId: runningApp.runId, windowSize: WINDOW_SIZES.MAXIMIZED })
    );
  };

  const onMinimize = () => {
    console.log(`Minimize app with run ID: ${runningApp.runId}`);

    // give some time for minimizing animation
    setIsMinimizing(true);
    setTimeout(() => {
      dispatch(
        mizeApp({ runId: runningApp.runId, windowSize: WINDOW_SIZES.MINIMIZED })
      );
      setIsMinimizing(false);
    }, 1000);
  };

  // from maximixed to scalable / resizable window
  const makeScalable = () => {
    console.log(`Restore app with run ID: ${runningApp.runId}`);
    dispatch(
      mizeApp({ runId: runningApp.runId, windowSize: WINDOW_SIZES.SCALED })
    );
  };

  const getDynamicStyles = (windowSize: string) => {
    let styles = {};
    if (windowSize === WINDOW_SIZES.SCALED) {
      const { x, y, width, height } = runningApp;
      styles = {
        left: x,
        top: y,
        width,
        height,
      };
    } else if (windowSize === WINDOW_SIZES.MAXIMIZED) {
      styles = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      };
    }
    return styles;
  };

  return (
    <div
      className={cn(
        "winframe fixed-fullscreen bg-background shadow-lg opacity-90 transition-all duration-500 ease-in-out",
        isClosing && "scale-0 opacity-0",
        isMinimizing && "scale-0 origin-bottom"
      )}
      style={getDynamicStyles(runningApp.windowSize)}
    >
      {/* The titlebar */}
      <div className="winframe-titlebar text-sm h-7 bg-blue-600 text-white flex items-center justify-between px-3 select-none">
        <div className="winframe-title">
          {appInfo ? appInfo.name : "My Application"}
        </div>
        <div className="winframe-controls flex space-x-3">
          <button className="winframe-btn minimize" onClick={onMinimize}>
            <i className="fa-solid fa-window-minimize"></i>
          </button>

          {runningApp.windowSize !== WINDOW_SIZES.MAXIMIZED && (
            <button className="winframe-btn maximize" onClick={onMaximize}>
              <i className="fa-solid fa-expand"></i>
            </button>
          )}

          {runningApp.windowSize !== WINDOW_SIZES.SCALED && (
            <button className="winframe-btn scalable" onClick={makeScalable}>
              <i className="fa-solid fa-compress"></i>
            </button>
          )}

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

// HOC to wrap an app component with WinFrame
// Usage: export const MyAppWithFrame = withWinFrame(MyAppComponent);
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
