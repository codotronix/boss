import { cn } from "@/lib/utils";

export interface DockedAppProps {
  iconClass: string;
  name: string;
  onClick: () => void;
  className?: string;
}
export const DockedApp = ({
  iconClass,
  name,
  onClick,
  className,
}: DockedAppProps) => {
  return (
    <button
      className={cn(
        "mx-4 flex flex-col items-center justify-center text-blue-700 hover:opacity-70 cursor-pointer",
        className
      )}
      title={name}
      onClick={onClick}
    >
      <i className={cn(iconClass, "text-3xl")}></i>
      <span className="text-xs text-black mt-1">{name}</span>
    </button>
  );
};
