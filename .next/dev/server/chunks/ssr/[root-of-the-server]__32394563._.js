module.exports = [
"[project]/components/SeatingChart/StadiumSVG.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// StadiumSVG.tsx
__turbopack_context__.s([
    "default",
    ()=>StadiumSVG
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function StadiumSVG({ sections, hoveredId, selectedId, onHover, onSelect }) {
    const svgRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [viewBox, setViewBox] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        x: 0,
        y: 0,
        w: 1200,
        h: 760
    });
    const [isPanning, setIsPanning] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const panStart = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const el = svgRef.current;
        if (!el) return;
        const onWheel = (e)=>{
            e.preventDefault();
            const scale = e.deltaY > 0 ? 1.12 : 0.92;
            setViewBox((vb)=>{
                const nx = vb.x + (vb.w - vb.w * scale) / 2;
                const ny = vb.y + (vb.h - vb.h * scale) / 2;
                const nw = vb.w * scale;
                const nh = vb.h * scale;
                return {
                    x: nx,
                    y: ny,
                    w: nw,
                    h: nh
                };
            });
        };
        el.addEventListener("wheel", onWheel, {
            passive: false
        });
        return ()=>el.removeEventListener("wheel", onWheel);
    }, []);
    function onMouseDown(e) {
        setIsPanning(true);
        panStart.current = {
            x: e.clientX,
            y: e.clientY
        };
    }
    function onMouseMove(e) {
        if (!isPanning || !panStart.current || !svgRef.current) return;
        const dx = (e.clientX - panStart.current.x) / svgRef.current.clientWidth * viewBox.w;
        const dy = (e.clientY - panStart.current.y) / svgRef.current.clientHeight * viewBox.h;
        setViewBox((vb)=>({
                x: vb.x - dx,
                y: vb.y - dy,
                w: vb.w,
                h: vb.h
            }));
        panStart.current = {
            x: e.clientX,
            y: e.clientY
        };
    }
    function onMouseUp() {
        setIsPanning(false);
        panStart.current = null;
    }
    // Build ring geometry (approximate, but looks like the screenshot)
    const cx = 600;
    const cy = 380;
    const rings = [
        {
            rOuter: 330,
            rInner: 260,
            count: 54,
            zone: "Upper"
        },
        {
            rOuter: 250,
            rInner: 190,
            count: 36,
            zone: "Mid"
        },
        {
            rOuter: 180,
            rInner: 120,
            count: 28,
            zone: "Lower"
        },
        {
            rOuter: 110,
            rInner: 48,
            count: 24,
            zone: "Club"
        }
    ];
    function arcPath(cx, cy, startDeg, endDeg, outerR, innerR) {
        const a1 = Math.PI / 180 * startDeg;
        const a2 = Math.PI / 180 * endDeg;
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
    const shapes = [];
    let secIndex = 0;
    for(let ri = 0; ri < rings.length; ri++){
        const ring = rings[ri];
        const degPer = 360 / ring.count;
        const offset = -90 - degPer / 2;
        for(let s = 0; s < ring.count; s++){
            const start = s * degPer + offset;
            const end = start + degPer - 1;
            const d = arcPath(cx, cy, start, end, ring.rOuter, ring.rInner);
            const section = sections[secIndex];
            const id = section ? section.id : `X${ri}-${s}`;
            shapes.push({
                id,
                d,
                zone: ring.zone
            });
            secIndex++;
        }
    }
    function colorByZone(zone, id) {
        if (selectedId === id) return "#111827"; // dark
        if (hoveredId === id) return "#0f172a"; // darker
        switch(zone){
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg p-3 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-sm text-gray-600 mb-2",
                children: "Drag to pan • Mouse wheel to zoom • Click a section to select"
            }, void 0, false, {
                fileName: "[project]/components/SeatingChart/StadiumSVG.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                ref: svgRef,
                viewBox: `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`,
                width: "100%",
                height: "680",
                onMouseDown: onMouseDown,
                onMouseMove: (e)=>{
                    onMouseMove(e);
                },
                onMouseUp: onMouseUp,
                onMouseLeave: onMouseUp,
                className: "select-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("rect", {
                        x: "0",
                        y: "0",
                        width: "1200",
                        height: "760",
                        rx: "6",
                        fill: "#f7fbfe"
                    }, void 0, false, {
                        fileName: "[project]/components/SeatingChart/StadiumSVG.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("rect", {
                        x: cx - 160,
                        y: cy - 80,
                        width: 320,
                        height: 160,
                        rx: "8",
                        fill: "#cfead6",
                        stroke: "#a9d0b8",
                        strokeWidth: 2
                    }, void 0, false, {
                        fileName: "[project]/components/SeatingChart/StadiumSVG.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    shapes.map((s, idx)=>{
                        const sec = sections.find((x)=>x.id === s.id);
                        const fill = colorByZone(s.zone, s.id);
                        const stroke = sec && sec.available === 0 ? "#e5e7eb" : "#fff";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                            d: s.d,
                            fill: fill,
                            stroke: stroke,
                            strokeWidth: 0.8,
                            style: {
                                transition: "all 120ms ease",
                                pointerEvents: "auto"
                            },
                            onMouseEnter: (ev)=>onHover(s.id, ev.clientX, ev.clientY),
                            onMouseMove: (ev)=>onHover(s.id, ev.clientX, ev.clientY),
                            onMouseLeave: ()=>onHover(null),
                            onClick: ()=>onSelect(s.id)
                        }, s.id + idx, false, {
                            fileName: "[project]/components/SeatingChart/StadiumSVG.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this);
                    }),
                    shapes.map((s, idx)=>{
                        if (idx % 6 !== 0) return null;
                        // find ring index by comparing cumulative counts
                        let cum = 0;
                        let ringIndex = 0;
                        for(let r = 0; r < rings.length; r++){
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
                        const rad = Math.PI / 180 * angle;
                        const rpos = (ring.rOuter + ring.rInner) / 2;
                        const lx = cx + rpos * Math.cos(rad);
                        const ly = cy + rpos * Math.sin(rad);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("text", {
                            x: lx,
                            y: ly,
                            fontSize: 12,
                            textAnchor: "middle",
                            fill: "#0f172a",
                            pointerEvents: "none",
                            style: {
                                userSelect: "none"
                            },
                            children: s.id.replace(/^S/, "")
                        }, `t-${s.id}`, false, {
                            fileName: "[project]/components/SeatingChart/StadiumSVG.tsx",
                            lineNumber: 179,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/components/SeatingChart/StadiumSVG.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SeatingChart/StadiumSVG.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/SeatingChart/TicketList.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// TicketList.tsx
__turbopack_context__.s([
    "default",
    ()=>TicketList
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function TicketList({ sections, onSelect, selectedId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-white p-4 rounded-lg shadow-sm max-h-[680px] overflow-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold mb-3",
                children: "Available Tickets"
            }, void 0, false, {
                fileName: "[project]/components/SeatingChart/TicketList.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            sections.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-gray-500",
                children: "No tickets found for this zone."
            }, void 0, false, {
                fileName: "[project]/components/SeatingChart/TicketList.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                className: "space-y-3",
                children: sections.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                        onClick: ()=>onSelect(s.id),
                        className: `flex items-center justify-between p-3 border rounded cursor-pointer ${selectedId === s.id ? "border-indigo-400 bg-indigo-50 shadow-sm" : "border-gray-100"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "font-medium",
                                        children: [
                                            s.label,
                                            " — ",
                                            s.zone
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SeatingChart/TicketList.tsx",
                                        lineNumber: 25,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            s.available,
                                            " tickets"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SeatingChart/TicketList.tsx",
                                        lineNumber: 26,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SeatingChart/TicketList.tsx",
                                lineNumber: 24,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "font-semibold",
                                        children: [
                                            "$",
                                            s.price
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SeatingChart/TicketList.tsx",
                                        lineNumber: 29,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `text-xs ${s.available > 0 ? "text-green-600" : "text-red-500"}`,
                                        children: s.available > 0 ? "Available" : "Sold out"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SeatingChart/TicketList.tsx",
                                        lineNumber: 30,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SeatingChart/TicketList.tsx",
                                lineNumber: 28,
                                columnNumber: 15
                            }, this)
                        ]
                    }, s.id, true, {
                        fileName: "[project]/components/SeatingChart/TicketList.tsx",
                        lineNumber: 17,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/SeatingChart/TicketList.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SeatingChart/TicketList.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/SeatingChart/Tooltip.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Tooltip.tsx
__turbopack_context__.s([
    "default",
    ()=>Tooltip
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function Tooltip({ x, y, visible, children }) {
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "pointer-events-none fixed z-50 transform -translate-y-full bg-white border rounded-md shadow-md px-3 py-2 text-sm",
        style: {
            left: x + 12,
            top: y - 8,
            minWidth: 140
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/SeatingChart/Tooltip.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/SeatingChart/seatingData.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// seatingData.ts
__turbopack_context__.s([
    "seatingSections",
    ()=>seatingSections
]);
function priceForZone(zone) {
    switch(zone){
        case "Club":
            return 295;
        case "Lower":
            return 175;
        case "Mid":
            return 125;
        case "Upper":
            return 115;
        default:
            return 100;
    }
}
const seatingSections = (()=>{
    const out = [];
    // Outer 500s (54)
    for(let i = 501; i <= 554; i++){
        out.push({
            id: `S${i}`,
            label: `${i}`,
            zone: "Upper",
            price: priceForZone("Upper"),
            available: Math.floor(Math.random() * 12)
        });
    }
    // 400s (36)
    for(let i = 401; i <= 436; i++){
        out.push({
            id: `S${i}`,
            label: `${i}`,
            zone: "Mid",
            price: priceForZone("Mid"),
            available: Math.floor(Math.random() * 14)
        });
    }
    // 200s (28)
    for(let i = 201; i <= 228; i++){
        out.push({
            id: `S${i}`,
            label: `${i}`,
            zone: "Lower",
            price: priceForZone("Lower"),
            available: Math.floor(Math.random() * 10)
        });
    }
    // 100s (inner, 24)
    for(let i = 101; i <= 124; i++){
        out.push({
            id: `S${i}`,
            label: `${i}`,
            zone: "Club",
            price: priceForZone("Club"),
            available: Math.floor(Math.random() * 6)
        });
    }
    return out;
})();
}),
"[project]/components/SeatingChart/SeatingChart.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SeatingChart.tsx
__turbopack_context__.s([
    "default",
    ()=>SeatingChartPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$StadiumSVG$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SeatingChart/StadiumSVG.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$TicketList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SeatingChart/TicketList.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$Tooltip$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SeatingChart/Tooltip.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$seatingData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SeatingChart/seatingData.ts [ssr] (ecmascript)");
;
;
;
;
;
;
function SeatingChartPage() {
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [tooltipPos, setTooltipPos] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [tooltipVisible, setTooltipVisible] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [activeZone, setActiveZone] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("All");
    const sectionsMap = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const map = new Map();
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$seatingData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["seatingSections"].forEach((s)=>map.set(s.id, s));
        return map;
    }, []);
    function handleHover(id, clientX, clientY) {
        setHovered(id);
        if (id && clientX !== undefined && clientY !== undefined) {
            setTooltipPos({
                x: clientX,
                y: clientY
            });
            setTooltipVisible(true);
        } else {
            setTooltipVisible(false);
        }
    }
    function handleSelect(id) {
        setSelected(id);
        if (id) {
            const sec = sectionsMap.get(id);
            if (sec) setActiveZone(sec.zone);
        }
    }
    const zones = Array.from(new Set(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$seatingData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["seatingSections"].map((s)=>s.zone)));
    zones.unshift("All");
    const listSections = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$seatingData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["seatingSections"].filter((s)=>activeZone === "All" || s.zone === activeZone);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "p-6 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold",
                children: "Production & Stadium View"
            }, void 0, false, {
                fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-12 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-span-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$TicketList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            sections: listSections,
                            onSelect: (id)=>handleSelect(id),
                            selectedId: selected
                        }, void 0, false, {
                            fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg p-4 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold mb-3",
                                    children: "Filter by Zone"
                                }, void 0, false, {
                                    fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2",
                                    children: zones.map((z)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveZone(z),
                                            className: `text-sm text-left px-3 py-2 rounded ${activeZone === z ? "bg-indigo-50 border-indigo-200" : "hover:bg-gray-50"}`,
                                            children: z
                                        }, z, false, {
                                            fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                                            lineNumber: 58,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "mt-4 text-xs text-gray-500",
                                    children: "Click a zone to filter ticket list. Click a section on the map to view details."
                                }, void 0, false, {
                                    fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "col-span-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$StadiumSVG$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            sections: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$seatingData$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["seatingSections"],
                            hoveredId: hovered,
                            selectedId: selected,
                            onHover: handleHover,
                            onSelect: handleSelect
                        }, void 0, false, {
                            fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$Tooltip$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                x: tooltipPos.x,
                y: tooltipPos.y,
                visible: tooltipVisible,
                children: hovered ? (()=>{
                    const sec = sectionsMap.get(hovered);
                    return sec ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-sm",
                                children: sec.label
                            }, void 0, false, {
                                fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600",
                                children: [
                                    "Zone: ",
                                    sec.zone
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-sm mt-1",
                                children: [
                                    "$",
                                    sec.price,
                                    " • ",
                                    sec.available,
                                    " left"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                        lineNumber: 88,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-sm",
                        children: [
                            "Section ",
                            hovered
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                        lineNumber: 94,
                        columnNumber: 13
                    }, this);
                })() : null
            }, void 0, false, {
                fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
}),
"[project]/pages/stadium.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/stadium.tsx
__turbopack_context__.s([
    "default",
    ()=>Stadium
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$SeatingChart$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SeatingChart/SeatingChart.tsx [ssr] (ecmascript)");
;
;
function Stadium() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$SeatingChart$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/pages/stadium.tsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__32394563._.js.map