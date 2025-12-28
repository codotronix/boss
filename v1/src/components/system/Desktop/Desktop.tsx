import { Dock } from "./Dock";
export const Desktop = () => {
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 bg-default">
      <Dock />
    </div>
  );
};
