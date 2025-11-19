module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/lib/fetchEvents.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchEventDetails",
    ()=>fetchEventDetails,
    "fetchEvents",
    ()=>fetchEvents
]);
async function fetchEvents(keyword = "", city = "", sort = "", page = 0) {
    const API_KEY = ("TURBOPACK compile-time value", "7r5vXgx9gQlD2IlAUvY86Mbk00uPAAFc");
    const URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}` + `&keyword=${keyword}` + `&city=${city}` + `&sort=${sort}` + `&page=${page}` + `&size=20`;
    console.log("Requesting:", URL); // debug
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            console.error("Event list API error:", res.status);
            return [];
        }
        const data = await res.json();
        return data._embedded?.events || [];
    } catch (err) {
        console.error("fetchEvents error:", err);
        return [];
    }
}
async function fetchEventDetails(id) {
    const API_KEY = ("TURBOPACK compile-time value", "7r5vXgx9gQlD2IlAUvY86Mbk00uPAAFc");
    const URL = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`;
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            console.error("Event details API error:", res.status);
            return null;
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("fetchEventDetails error:", err);
        return null;
    }
}
}),
"[project]/pages/categories/[category].js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategoryPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchEvents$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/fetchEvents.js [ssr] (ecmascript)");
"use client";
;
;
;
;
;
function CategoryPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { category } = router.query;
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!category) return;
        loadEventsByCategory();
    }, [
        category
    ]);
    async function loadEventsByCategory() {
        const keyword = category; // sports / concerts / etc.
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchEvents$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["fetchEvents"])(keyword);
        setEvents(data || []);
    }
    if (!category) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-900 text-white px-6 md:px-16 py-14",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-3xl md:text-4xl font-bold mb-8 capitalize",
                children: [
                    category,
                    " Events"
                ]
            }, void 0, true, {
                fileName: "[project]/pages/categories/[category].js",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            events.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-gray-400",
                children: "No events found."
            }, void 0, false, {
                fileName: "[project]/pages/categories/[category].js",
                lineNumber: 36,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid sm:grid-cols-2 md:grid-cols-3 gap-8",
                children: events.map((ev)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/events/${ev.id}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "bg-gray-800 p-5 rounded-xl shadow hover:scale-105 transition cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: ev.images?.[0]?.url,
                                    className: "w-full h-48 object-cover rounded-xl"
                                }, void 0, false, {
                                    fileName: "[project]/pages/categories/[category].js",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold mt-3",
                                    children: ev.name
                                }, void 0, false, {
                                    fileName: "[project]/pages/categories/[category].js",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400",
                                    children: ev.dates?.start?.localDate
                                }, void 0, false, {
                                    fileName: "[project]/pages/categories/[category].js",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-sm",
                                    children: ev._embedded?.venues?.[0]?.name
                                }, void 0, false, {
                                    fileName: "[project]/pages/categories/[category].js",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/categories/[category].js",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this)
                    }, ev.id, false, {
                        fileName: "[project]/pages/categories/[category].js",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/pages/categories/[category].js",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/categories/[category].js",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1546623d._.js.map