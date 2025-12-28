import { cn } from "@/lib/utils";

export interface DockedAppProps {
  iconClass: string;
  name: string;
  onClick: () => void;
}
export const DockedApp = ({ iconClass, name, onClick }: DockedAppProps) => {
  return (
    <button
      className="mx-4 flex flex-col items-center justify-center text-blue-800 hover:opacity-70 cursor-pointer"
      title={name}
      onClick={onClick}
    >
      <i className={cn(iconClass, "text-3xl")}></i>
      <span className="text-xs text-black mt-1">{name}</span>
    </button>
  );
};
