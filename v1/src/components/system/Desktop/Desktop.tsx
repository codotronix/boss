import { Dock } from "./Dock";
import { AppsRuntimeContainer } from "./AppsRuntimeContainer";

export const Desktop = () => {
  return (
    <div className="fixed-fullscreen bg-default">
      <Dock />
      <AppsRuntimeContainer />
    </div>
  );
};
