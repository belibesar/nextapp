export function Progress({ value, className = "" }: { value: number; className?: string }) {
    return (
      <div className={`relative w-full bg-gray-200 rounded overflow-hidden h-2 ${className}`}>
        <div
          className="absolute top-0 left-0 h-full bg-blue-600"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    )
  }
  