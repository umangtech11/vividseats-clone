// Tooltip.tsx
import React from "react";

type Props = { x: number; y: number; visible: boolean; children?: React.ReactNode };

export default function Tooltip({ x, y, visible, children }: Props) {
  if (!visible) return null;
  return (
    <div
      className="pointer-events-none fixed z-50 transform -translate-y-full bg-white border rounded-md shadow-md px-3 py-2 text-sm"
      style={{ left: x + 12, top: y - 8, minWidth: 140 }}
    >
      {children}
    </div>
  );
}
