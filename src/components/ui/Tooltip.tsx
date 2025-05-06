import React from "react"

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>
}

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <div className="cursor-pointer">{children}</div>
}

export function TooltipContent({
    children,
    side = "top",       // Default to "top"
    sideOffset = 8,     // Default to 8px offset
    className,          // Allow additional classes for customization
  }: {
    children: React.ReactNode
    side?: "top" | "right" | "bottom" | "left"   // Can customize positions
    sideOffset?: number  // Allow offset for distance from trigger
    className?: string
  }) {
    // Conditional styles for positioning
    let positionStyles = {}
  
    if (side === "top") {
      positionStyles = { top: `-calc(100% + ${sideOffset}px)` }
    } else if (side === "bottom") {
      positionStyles = { bottom: `-calc(100% + ${sideOffset}px)` }
    } else if (side === "left") {
      positionStyles = { left: `-calc(100% + ${sideOffset}px)` }
    } else if (side === "right") {
      positionStyles = { right: `-calc(100% + ${sideOffset}px)` }
    }
  
    return (
      <div
        className={`absolute z-10 p-2 bg-black text-white text-sm rounded shadow-md ${className}`}
        style={positionStyles}
      >
        {children}
      </div>
    )
}
