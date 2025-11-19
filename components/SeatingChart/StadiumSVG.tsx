// StadiumSVG.tsx
import React, { useRef, useEffect, useState } from "react";
import type { Section } from "./seatingData";

type Props = {
  sections: Section[];
  hoveredId: string | null;
  selectedId: string | null;
  onHover: (id: string | null, clientX?: number, clientY?: number) => void;
  onSelect: (id: string | null) => void;
};

export default function StadiumSVG({ sections, hoveredId, selectedId, onHover, onSelect }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 1200, h: 760 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scale = e.deltaY > 0 ? 1.12 : 0.92;
      setViewBox((vb) => {
        const nx = vb.x + (vb.w - vb.w * scale) / 2;
        const ny = vb.y + (vb.h - vb.h * scale) / 2;
        const nw = vb.w * scale;
        const nh = vb.h * scale;
        return { x: nx, y: ny, w: nw, h: nh };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  function onMouseDown(e: React.MouseEvent) {
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY };
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isPanning || !panStart.current || !svgRef.current) return;
    const dx = ((e.clientX - panStart.current.x) / svgRef.current.clientWidth) * viewBox.w;
    const dy = ((e.clientY - panStart.current.y) / svgRef.current.clientHeight) * viewBox.h;
    setViewBox((vb) => ({ x: vb.x - dx, y: vb.y - dy, w: vb.w, h: vb.h }));
    panStart.current = { x: e.clientX, y: e.clientY };
  }
  function onMouseUp() {
    setIsPanning(false);
    panStart.current = null;
  }

  // Build ring geometry (approximate, but looks like the screenshot)
  const cx = 600;
  const cy = 380;
  const rings = [
    { rOuter: 330, rInner: 260, count: 54, zone: "Upper" }, // 500s
    { rOuter: 250, rInner: 190, count: 36, zone: "Mid" },   // 400s
    { rOuter: 180, rInner: 120, count: 28, zone: "Lower" }, // 200s
    { rOuter: 110, rInner: 48, count: 24, zone: "Club" },   // 100s
  ];

  function arcPath(cx: number, cy: number, startDeg: number, endDeg: number, outerR: number, innerR: number) {
    const a1 = (Math.PI / 180) * startDeg;
    const a2 = (Math.PI / 180) * endDeg;
    const x1 = cx + outerR * Math.cos(a1);
    const y1 = cy + outerR * Math.sin(a1);
    const x2 = cx + outerR * Math.cos(a2);
    const y2 = cy + outerR * Math.sin(a2);
    const x3 = cx + innerR * Math.cos(a2);
    const y3 = cy + innerR * Math.sin(a2);
    const x4 = cx + innerR * Math.cos(a1);
    const y4 = cy + innerR * Math.sin(a1);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${large} 0 ${x4} ${y4} Z`;
  }

  // Create shapes mapping to sections array order
  const shapes: { id: string; d: string; zone: string }[] = [];
  let secIndex = 0;
  for (let ri = 0; ri < rings.length; ri++) {
    const ring = rings[ri];
    const degPer = 360 / ring.count;
    const offset = -90 - degPer / 2;
    for (let s = 0; s < ring.count; s++) {
      const start = s * degPer + offset;
      const end = start + degPer - 1;
      const d = arcPath(cx, cy, start, end, ring.rOuter, ring.rInner);
      const section = sections[secIndex];
      const id = section ? section.id : `X${ri}-${s}`;
      shapes.push({ id, d, zone: ring.zone });
      secIndex++;
    }
  }

  function colorByZone(zone: string, id: string) {
    if (selectedId === id) return "#111827"; // dark
    if (hoveredId === id) return "#0f172a"; // darker
    switch (zone) {
      case "Upper":
        return "#BEE6FF";
      case "Mid":
        return "#CFF3E0";
      case "Lower":
        return "#FFF1C7";
      case "Club":
        return "#FFD7F0";
      default:
        return "#E5E7EB";
    }
  }

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <div className="text-sm text-gray-600 mb-2">Drag to pan • Mouse wheel to zoom • Click a section to select</div>

      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        width="100%"
        height="680"
        onMouseDown={onMouseDown}
        onMouseMove={(e) => {
          onMouseMove(e);
        }}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="select-none"
      >
        <rect x="0" y="0" width="1200" height="760" rx="6" fill="#f7fbfe" />

        {/* center field */}
        <rect x={cx - 160} y={cy - 80} width={320} height={160} rx="8" fill="#cfead6" stroke="#a9d0b8" strokeWidth={2} />

        {/* shapes */}
        {shapes.map((s, idx) => {
          const sec = sections.find((x) => x.id === s.id);
          const fill = colorByZone(s.zone, s.id);
          const stroke = sec && sec.available === 0 ? "#e5e7eb" : "#fff";
          return (
            <path
              key={s.id + idx}
              d={s.d}
              fill={fill}
              stroke={stroke}
              strokeWidth={0.8}
              style={{ transition: "all 120ms ease", pointerEvents: "auto" }}
              onMouseEnter={(ev) => onHover(s.id, ev.clientX, ev.clientY)}
              onMouseMove={(ev) => onHover(s.id, ev.clientX, ev.clientY)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(s.id)}
            />
          );
        })}

        {/* numeric labels (show only some to avoid clutter) */}
        {shapes.map((s, idx) => {
          if (idx % 6 !== 0) return null;
          // find ring index by comparing cumulative counts
          let cum = 0;
          let ringIndex = 0;
          for (let r = 0; r < rings.length; r++) {
            cum += rings[r].count;
            if (idx < cum) {
              ringIndex = r;
              break;
            }
          }
          const ring = rings[ringIndex];
          const slices = ring.count;
          const localIndex = idx - (cum - slices);
          const degPer = 360 / slices;
          const angle = -90 + localIndex * degPer + degPer / 2;
          const rad = (Math.PI / 180) * angle;
          const rpos = (ring.rOuter + ring.rInner) / 2;
          const lx = cx + rpos * Math.cos(rad);
          const ly = cy + rpos * Math.sin(rad);
          return (
            <text
              key={`t-${s.id}`}
              x={lx}
              y={ly}
              fontSize={12}
              textAnchor="middle"
              fill="#0f172a"
              pointerEvents="none"
              style={{ userSelect: "none" }}
            >
              {s.id.replace(/^S/, "")}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
