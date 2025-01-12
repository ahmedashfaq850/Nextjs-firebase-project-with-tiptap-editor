import React, { FC } from "react";
import { cn } from "@/lib/utils";

type ToolbarButtonProps = {
  isActive?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  title?: string;
};

const ToolbarButton: FC<ToolbarButtonProps> = ({
  isActive = false,
  disabled = false,
  onClick = () => {}, // Default empty function
  children,
  title = "",
}) => (
  <button
    type="button"
    title={title}
    onMouseDown={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    disabled={disabled}
    className={cn(
      "h-9 w-9 border border-transparent p-2 text-zinc-300 hover:bg-violet-500/20 hover:text-violet-200",
      isActive && "bg-violet-500/20 text-violet-200 border-violet-500/50",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    {children}
  </button>
);

export default ToolbarButton;
