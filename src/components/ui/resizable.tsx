import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive.PanelGroup>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.PanelGroup>
>(({ className, ...props }, ref) => (
  <ResizablePrimitive.PanelGroup
    ref={ref}
    className={cn("flex h-full w-full min-h-0 min-w-0 overflow-hidden data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
));
ResizablePanelGroup.displayName = ResizablePrimitive.PanelGroup.displayName;

const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive.Panel>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.Panel>
>(({ className, ...props }, ref) => (
  <ResizablePrimitive.Panel ref={ref} className={cn("min-h-0 min-w-0 overflow-hidden", className)} {...props} />
));
ResizablePanel.displayName = ResizablePrimitive.Panel.displayName;

const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive.PanelResizeHandle>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean;
  }
>(({ withHandle, className, ...props }, ref) => (
  <ResizablePrimitive.PanelResizeHandle
    ref={ref}
    className={cn(
      "group/handle relative flex shrink-0 items-center justify-center select-none bg-transparent",
      "w-[4px] cursor-col-resize after:absolute after:inset-y-0 after:left-1/2 after:w-5 after:-translate-x-1/2",
      "data-[panel-group-direction=vertical]:h-[4px] data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:cursor-row-resize",
      "data-[panel-group-direction=vertical]:after:inset-x-0 data-[panel-group-direction=vertical]:after:inset-y-auto data-[panel-group-direction=vertical]:after:top-1/2 data-[panel-group-direction=vertical]:after:h-5 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "[&[data-panel-group-direction=vertical]>div]:h-[3px] [&[data-panel-group-direction=vertical]>div]:w-10",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="pointer-events-none z-10 h-10 w-[3px] rounded-full bg-border/70 transition-colors duration-150 group-hover/handle:bg-primary/40 group-active/handle:bg-primary/60" />
    )}
  </ResizablePrimitive.PanelResizeHandle>
));
ResizableHandle.displayName = ResizablePrimitive.PanelResizeHandle.displayName;

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
