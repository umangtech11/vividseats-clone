// TicketList.tsx
import React from "react";
import type { Section } from "./seatingData";

type Props = { sections: Section[]; onSelect: (id: string) => void; selectedId: string | null };

export default function TicketList({ sections, onSelect, selectedId }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm max-h-[680px] overflow-auto">
      <h3 className="text-lg font-semibold mb-3">Available Tickets</h3>

      {sections.length === 0 ? (
        <div className="text-gray-500">No tickets found for this zone.</div>
      ) : (
        <ul className="space-y-3">
          {sections.map((s) => (
            <li
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`flex items-center justify-between p-3 border rounded cursor-pointer ${
                selectedId === s.id ? "border-indigo-400 bg-indigo-50 shadow-sm" : "border-gray-100"
              }`}
            >
              <div>
                <div className="font-medium">{s.label} — {s.zone}</div>
                <div className="text-xs text-gray-500">{s.available} tickets</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${s.price}</div>
                <div className={`text-xs ${s.available > 0 ? "text-green-600" : "text-red-500"}`}>
                  {s.available > 0 ? "Available" : "Sold out"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
