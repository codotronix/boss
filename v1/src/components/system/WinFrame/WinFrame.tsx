import { useState, type ReactNode } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { type IAppComponentBaseProps, type IRunningApp } from "@/const/APPS";
import { cn } from "@/lib/utils";
import { WINDOW_SIZES } from "@/const/WINFRAME";
import { useWFInternal } from "./useWFInternal";
import { type MenuConfig } from "./types.d";

interface WinFrameProps extends IAppComponentBaseProps {
  children: ReactNode;
}

// The WinFrame component
// But this should not be used directly
// Instead, use the withWinFrame HOC defined after this component
const WinFrame = ({ children, runningApp, menuConfig }: WinFrameProps) => {
  const {
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
  } = useWFInternal(runningApp);

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
            {Object.values(menuConfig).map((menuItem) => (
              <div
                key={menuItem.label}
                className="winframe-menu-item mr-4 cursor-pointer group"
                onClick={menuItem.onClick}
              >
                {menuItem.label}
                {/* Submenu can be implemented here if needed */}
                <div className="winframe-submenu absolute bg-white text-black shadow-lg rounded hidden group-hover:block">
                  {menuItem.subMenu?.map((subItem) => (
                    <div
                      key={subItem.label}
                      className="winframe-submenu-item min-w-30 px-4 py-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                      onClick={subItem.onClick}
                    >
                      {subItem.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
    const menuConfigDefault: MenuConfig = {
      file: {
        label: "file",
        subMenu: [
          {
            label: "new",
            onClick: () => {
              console.log("New action triggered");
            },
          },
          {
            label: "quit",
            onClick: () => {
              console.log("Quit action triggered");
            },
          },
        ],
      },
      help: {
        label: "help",
        subMenu: [
          {
            label: "documentation",
            onClick: () => {
              console.log("Documentation action triggered");
            },
          },
        ],
      },
    };

    const [menuConfig, setMenuConfig] = useState<MenuConfig>(menuConfigDefault);

    const configMenu = (menuConfig: MenuConfig) => {
      setMenuConfig(menuConfig);
    };

    return (
      <WinFrame {...props} menuConfig={menuConfig} configMenu={configMenu}>
        <WrappedComponent
          {...props}
          menuConfig={menuConfig}
          configMenu={configMenu}
        />
      </WinFrame>
    );
  };
}
