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

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute z-10 mt-2 p-2 bg-black text-white text-sm rounded shadow-md">
      {children}
    </div>
  )
}
