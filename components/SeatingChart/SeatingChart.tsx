// SeatingChart.tsx
import React, { useMemo, useState } from "react";
import StadiumSVG from "./StadiumSVG";
import TicketList from "./TicketList";
import Tooltip from "./Tooltip";
import { seatingSections, Section } from "./seatingData";

export default function SeatingChartPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [activeZone, setActiveZone] = useState<string | "All">("All");

  const sectionsMap = useMemo(() => {
    const map = new Map<string, Section>();
    seatingSections.forEach((s) => map.set(s.id, s));
    return map;
  }, []);

  function handleHover(id: string | null, clientX?: number, clientY?: number) {
    setHovered(id);
    if (id && clientX !== undefined && clientY !== undefined) {
      setTooltipPos({ x: clientX, y: clientY });
      setTooltipVisible(true);
    } else {
      setTooltipVisible(false);
    }
  }

  function handleSelect(id: string | null) {
    setSelected(id);
    if (id) {
      const sec = sectionsMap.get(id);
      if (sec) setActiveZone(sec.zone as any);
    }
  }

  const zones = Array.from(new Set(seatingSections.map((s) => s.zone)));
  zones.unshift("All");

  const listSections = seatingSections.filter((s) => activeZone === "All" || s.zone === activeZone);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Production & Stadium View</h1>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <TicketList sections={listSections} onSelect={(id) => handleSelect(id)} selectedId={selected} />
        </div>

        <div className="col-span-2">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Filter by Zone</h3>
            <div className="flex flex-col gap-2">
              {zones.map((z) => (
                <button
                  key={z}
                  onClick={() => setActiveZone(z as any)}
                  className={`text-sm text-left px-3 py-2 rounded ${
                    activeZone === z ? "bg-indigo-50 border-indigo-200" : "hover:bg-gray-50"
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-500">Click a zone to filter ticket list. Click a section on the map to view details.</div>
          </div>
        </div>

        <div className="col-span-6">
          <StadiumSVG
            sections={seatingSections}
            hoveredId={hovered}
            selectedId={selected}
            onHover={handleHover}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <Tooltip x={tooltipPos.x} y={tooltipPos.y} visible={tooltipVisible}>
        {hovered ? (() => {
          const sec = sectionsMap.get(hovered);
          return sec ? (
            <div>
              <div className="font-semibold text-sm">{sec.label}</div>
              <div className="text-xs text-gray-600">Zone: {sec.zone}</div>
              <div className="text-sm mt-1">${sec.price} • {sec.available} left</div>
            </div>
          ) : (
            <div className="text-sm">Section {hovered}</div>
          );
        })() : null}
      </Tooltip>
    </div>
  );
}
