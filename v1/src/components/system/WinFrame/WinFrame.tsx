import { type ReactNode, useState, useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { debounce } from "lodash";
import { type IAppComponentBaseProps } from "@/const/APPS";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  closeApp,
  mizeApp,
  bringAppToFront,
  updateRunningApp,
} from "@/store/slices/appsSlice";
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
  const [position, setPosition] = useState({
    x: runningApp.x,
    y: runningApp.y,
  });
  const [size, setSize] = useState({
    width: runningApp.width,
    height: runningApp.height,
  });
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  // const { x, y, width, height } = runningApp;
  const dispatch = useAppDispatch();
  const winFrameRef = useRef(null);
  // const prevPosition = useRef(position);

  // Checking mounting and unmounting for debugging
  // useEffect(() => {
  //   console.log(`WinFrame mounted for runId: ${runningApp.runId}`);
  //   return () => {
  //     console.log(`WinFrame unmounted for runId: ${runningApp.runId}`);
  //   };
  // }, []);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log(`Close app with run ID: ${runningApp.runId}`);
    setIsClosing(true);
    // dispatch closeApp action after a closing animation
    setTimeout(() => {
      dispatch(closeApp({ runId: runningApp.runId }));
    }, 700);
  };

  const onMaximize = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log(`Maximize app with run ID: ${runningApp.runId}`);
    // dispatch maximize action
    dispatch(
      mizeApp({ runId: runningApp.runId, windowSize: WINDOW_SIZES.MAXIMIZED })
    );
  };

  const onMinimize = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log(`Minimize app with run ID: ${runningApp.runId}`);

    // give some time for minimizing animation
    setIsMinimizing(true);

    // dispatch everything after the animation
    setTimeout(() => {
      // update the size and position back to the runningApp in redux
      // so that when we restore, it comes back to the same position and size
      dispatch(
        updateRunningApp({
          runId: runningApp.runId,
          updates: {
            x: position.x,
            y: position.y,
            width: size.width,
            height: size.height,
          },
        })
      );

      // dispatch minimize action
      dispatch(
        mizeApp({
          runId: runningApp.runId,
          windowSize: WINDOW_SIZES.MINIMIZED,
        })
      );
    }, 700);
  };

  // from maximixed to scalable / resizable window
  const makeScalable = () => {
    console.log(`Restore app with run ID: ${runningApp.runId}`);
    dispatch(
      mizeApp({ runId: runningApp.runId, windowSize: WINDOW_SIZES.SCALED })
    );
  };

  // bring to front
  const handleFocus = () => {
    console.log(`Bring app to front with run ID: ${runningApp.runId}`);
    dispatch(bringAppToFront({ runId: runningApp.runId }));
  };

  const getDynamicStyles = (windowSize: string) => {
    let styles: React.CSSProperties = { zIndex: runningApp.zIndex };
    // const { x, y } = position;
    const { width, height } = size;
    if (windowSize === WINDOW_SIZES.SCALED) {
      styles = {
        ...styles,
        // transform: `translate(${x}px, ${y}px)`,
        width,
        height,
      };
    } else if (windowSize === WINDOW_SIZES.MAXIMIZED) {
      styles = {
        ...styles,
        transform: `none !important`,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      };
    }
    console.log("Dynamic styles:", styles);
    return styles;
  };

  const handleDrag = (_event: any, data: any) => {
    console.log(
      `Dragging app with run ID: ${runningApp.runId} to x: ${data.x}, y: ${data.y}`
    );
    setPosition({ x: data.x, y: data.y });
  };

  const handleResize = (_event: any, data: any) => {
    // only allow resizing in scaled window
    if (runningApp.windowSize !== WINDOW_SIZES.SCALED) {
      return;
    }
    console.log(
      `Resizing app with run ID: ${runningApp.runId} to width: ${data.size.width}, height: ${data.size.height}`
    );
    setSize({ width: data.size.width, height: data.size.height });
  };

  const handleDragStop = debounce((_event: any, data: any) => {
    console.log(
      `Drag stopped for app with run ID: ${runningApp.runId} at x: ${data.x}, y: ${data.y}`
    );
    setPosition({ x: data.x, y: data.y });
    // update the position in the redux store
    dispatch(
      updateRunningApp({
        runId: runningApp.runId,
        updates: { x: data.x, y: data.y },
      })
    );
  }, 200);

  return (
    <Draggable
      nodeRef={winFrameRef}
      handle=".winframe-titlebar"
      // position={position}
      disabled={runningApp.windowSize !== WINDOW_SIZES.SCALED}
      defaultPosition={{ x: position.x, y: position.y }}
      onDrag={handleDrag}
      onStop={handleDragStop}
    >
      <Resizable
        height={size.height}
        width={size.width}
        onResize={handleResize}
        className="fixed"
      >
        <div
          className={cn(
            "winframe fixed! bg-background shadow-lg opacity-95 transition-all duration-300 ease-in-out left-0 top-0 origin-bottom",
            isClosing && "scale-0 opacity-0",
            isMinimizing && "scale-0! opacity-0! display-none!",
            runningApp.windowSize,
            runningApp.windowSize === WINDOW_SIZES.MAXIMIZED &&
              "transform-none!"
          )}
          style={getDynamicStyles(runningApp.windowSize)}
          // onMouseDown={handleFocus}
          onClick={handleFocus}
          ref={winFrameRef}
        >
          {/* The titlebar */}
          <div className="winframe-titlebar text-sm h-7 bg-blue-600 text-white flex items-center justify-between px-3 select-none">
            <div className="winframe-title">
              {appInfo ? appInfo.name : "My Application"}
            </div>
            <div className="winframe-controls flex space-x-1">
              <button
                className="winframe-btn minimize hover:bg-white/10 h-7 w-8"
                onClick={onMinimize}
              >
                <i className="fa-solid fa-window-minimize"></i>
              </button>

              {runningApp.windowSize !== WINDOW_SIZES.MAXIMIZED && (
                <button
                  className="winframe-btn maximize hover:bg-white/10 h-7 w-8"
                  onClick={onMaximize}
                >
                  <i className="fa-solid fa-expand"></i>
                </button>
              )}

              {runningApp.windowSize !== WINDOW_SIZES.SCALED && (
                <button
                  className="winframe-btn scalable hover:bg-white/10 h-7 w-8"
                  onClick={makeScalable}
                >
                  <i className="fa-solid fa-compress"></i>
                </button>
              )}

              <button
                className="winframe-btn close active:scale-95 hover:bg-white/10 h-7 w-8"
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
      </Resizable>
    </Draggable>
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
