import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "group relative flex w-[3px] items-center justify-center bg-border/60 transition-all duration-150 hover:bg-primary/40 hover:w-[4px] active:bg-primary/60 active:w-[5px] cursor-col-resize",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2",
      "data-[panel-group-direction=vertical]:h-[3px] data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:cursor-row-resize data-[panel-group-direction=vertical]:hover:h-[4px] data-[panel-group-direction=vertical]:active:h-[5px] data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-4 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-8 w-[3px] rounded-full bg-border/80 group-hover:bg-primary/50 group-active:bg-primary/70 transition-colors duration-150 data-[panel-group-direction=vertical]:h-[3px] data-[panel-group-direction=vertical]:w-8" />
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
