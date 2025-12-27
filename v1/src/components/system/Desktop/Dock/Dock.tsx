import { cn } from "@/lib/utils";

export const Dock = () => {
  const windowWidth = window.innerWidth;
  return (
    <div
      className={cn(
        "absolute left-1/4 right-1/4 bottom-1 h-16 bg-white opacity-50 flex items-center justify-center border rounded-lg",
        windowWidth < 768 && "left-5 right-5"
      )}
    >
      Dock Component
    </div>
  );
};
