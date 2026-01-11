import { useState, useRef } from "react";
import { debounce } from "lodash";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  closeApp,
  mizeApp,
  bringAppToFront,
  updateRunningApp,
} from "@/store/slices/appsSlice";
import { WINDOW_SIZES } from "@/const/WINFRAME";
import { type IRunningApp } from "@/const/APPS";

export const useWFInternal = (runningApp: IRunningApp) => {
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

  return {
    appInfo,
    winFrameRef,
    position,
    size,
    isClosing,
    isMinimizing,
    handleClose,
    onMaximize,
    onMinimize,
    makeScalable,
    handleFocus,
    getDynamicStyles,
    handleDrag,
    handleResize,
    handleDragStop,
  };
};
