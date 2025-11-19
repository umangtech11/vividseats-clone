(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/components/SeatingChart/StadiumSVG.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// StadiumSVG.tsx
__turbopack_context__.s([
    "default",
    ()=>StadiumSVG
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function StadiumSVG({ sections, hoveredId, selectedId, onHover, onSelect }) {
    _s();
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [viewBox, setViewBox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        w: 1200,
        h: 760
    });
    const [isPanning, setIsPanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const panStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StadiumSVG.useEffect": ()=>{
            const el = svgRef.current;
            if (!el) return;
            const onWheel = {
                "StadiumSVG.useEffect.onWheel": (e)=>{
                    e.preventDefault();
                    const scale = e.deltaY > 0 ? 1.12 : 0.92;
                    setViewBox({
                        "StadiumSVG.useEffect.onWheel": (vb)=>{
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
                        }
                    }["StadiumSVG.useEffect.onWheel"]);
                }
            }["StadiumSVG.useEffect.onWheel"];
            el.addEventListener("wheel", onWheel, {
                passive: false
            });
            return ({
                "StadiumSVG.useEffect": ()=>el.removeEventListener("wheel", onWheel)
            })["StadiumSVG.useEffect"];
        }
    }["StadiumSVG.useEffect"], []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg p-3 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-gray-600 mb-2",
                children: "Drag to pan • Mouse wheel to zoom • Click a section to select"
            }, void 0, false, {
                fileName: "[project]/components/SeatingChart/StadiumSVG.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
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
_s(StadiumSVG, "p6wYlaTgdpJa2URJPGPvxOsMgcU=");
_c = StadiumSVG;
var _c;
__turbopack_context__.k.register(_c, "StadiumSVG");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SeatingChart/TicketList.ts [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/components/SeatingChart/TicketList.ts'\n\nExpected '>', got 'className'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/components/SeatingChart/Tooltip.ts [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/components/SeatingChart/Tooltip.ts'\n\nExpected '>', got 'className'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/components/SeatingChart/seatingData.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SeatingChart/SeatingChart.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SeatingChart.tsx
__turbopack_context__.s([
    "default",
    ()=>SeatingChartPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$StadiumSVG$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SeatingChart/StadiumSVG.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$TicketList$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SeatingChart/TicketList.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$Tooltip$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SeatingChart/Tooltip.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$seatingData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SeatingChart/seatingData.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function SeatingChartPage() {
    _s();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tooltipPos, setTooltipPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [tooltipVisible, setTooltipVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeZone, setActiveZone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const sectionsMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SeatingChartPage.useMemo[sectionsMap]": ()=>{
            const map = new Map();
            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$seatingData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["seatingSections"].forEach({
                "SeatingChartPage.useMemo[sectionsMap]": (s)=>map.set(s.id, s)
            }["SeatingChartPage.useMemo[sectionsMap]"]);
            return map;
        }
    }["SeatingChartPage.useMemo[sectionsMap]"], []);
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
    const zones = Array.from(new Set(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$seatingData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["seatingSections"].map((s)=>s.zone)));
    zones.unshift("All");
    const listSections = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$seatingData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["seatingSections"].filter((s)=>activeZone === "All" || s.zone === activeZone);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold",
                children: "Production & Stadium View"
            }, void 0, false, {
                fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-12 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$TicketList$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg p-4 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold mb-3",
                                    children: "Filter by Zone"
                                }, void 0, false, {
                                    fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2",
                                    children: zones.map((z)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$StadiumSVG$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            sections: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$seatingData$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["seatingSections"],
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$Tooltip$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                x: tooltipPos.x,
                y: tooltipPos.y,
                visible: tooltipVisible,
                children: hovered ? (()=>{
                    const sec = sectionsMap.get(hovered);
                    return sec ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-sm",
                                children: sec.label
                            }, void 0, false, {
                                fileName: "[project]/components/SeatingChart/SeatingChart.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(SeatingChartPage, "IJdrGOMC2MdIT2bSr1h3oVXNZJM=");
_c = SeatingChartPage;
var _c;
__turbopack_context__.k.register(_c, "SeatingChartPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/stadium.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/stadium.tsx
__turbopack_context__.s([
    "default",
    ()=>Stadium
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$SeatingChart$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SeatingChart/SeatingChart.tsx [client] (ecmascript)");
;
;
function Stadium() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SeatingChart$2f$SeatingChart$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/pages/stadium.tsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
_c = Stadium;
var _c;
__turbopack_context__.k.register(_c, "Stadium");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/stadium.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/stadium";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/stadium.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/stadium\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/stadium.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__d7f2b360._.js.map