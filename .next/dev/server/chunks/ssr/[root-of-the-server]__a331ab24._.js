module.exports = [
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
"[project]/pages/events.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventsPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchEvents$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/fetchEvents.js [ssr] (ecmascript)");
"use client";
;
;
;
;
function EventsPage() {
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [showDropdown, setShowDropdown] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        loadEvents();
    }, []);
    async function loadEvents(keyword = "") {
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchEvents$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["fetchEvents"])(keyword);
        setEvents(data || []);
    }
    // Autocomplete search
    async function handleSearchInput(value) {
        setSearch(value);
        if (!value.trim()) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchEvents$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["fetchEvents"])(value);
        setSuggestions(result.slice(0, 5));
        setShowDropdown(true);
    }
    function handleSelectSuggestion(name) {
        setSearch(name);
        loadEvents(name);
        setShowDropdown(false);
    }
    // Category Filters
    const categories = [
        "Sports",
        "Concert",
        "Comedy",
        "Arts & Theatre",
        "Family",
        "Music"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-900 text-white px-6 py-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-bold text-center mb-8",
                children: "Events"
            }, void 0, false, {
                fileName: "[project]/pages/events.js",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap justify-center gap-3 mb-6",
                children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>loadEvents(cat),
                        className: "px-4 py-2 bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-full text-sm transition",
                        children: cat
                    }, cat, false, {
                        fileName: "[project]/pages/events.js",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/pages/events.js",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-xl mx-auto relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Search events...",
                        value: search,
                        onChange: (e)=>handleSearchInput(e.target.value),
                        className: "w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
                    }, void 0, false, {
                        fileName: "[project]/pages/events.js",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    showDropdown && suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                        className: "absolute w-full bg-gray-800 border border-gray-700 mt-2 rounded-xl shadow-xl z-50",
                        children: suggestions.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                onClick: ()=>handleSelectSuggestion(event.name),
                                className: "p-3 hover:bg-gray-700 cursor-pointer",
                                children: event.name
                            }, event.id, false, {
                                fileName: "[project]/pages/events.js",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/events.js",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/events.js",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10",
                children: Array.isArray(events) && events.length > 0 ? events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800 p-4 rounded-xl shadow hover:shadow-blue-500/30 transition",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: event.images?.[0]?.url,
                                className: "w-full h-48 object-cover rounded-lg",
                                alt: event.name
                            }, void 0, false, {
                                fileName: "[project]/pages/events.js",
                                lineNumber: 105,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold mt-4",
                                children: event.name
                            }, void 0, false, {
                                fileName: "[project]/pages/events.js",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 mt-1",
                                children: event.dates?.start?.localDate || "No date available"
                            }, void 0, false, {
                                fileName: "[project]/pages/events.js",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 mt-2 text-yellow-400",
                                children: [
                                    "⭐⭐⭐⭐☆ ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-gray-300 ml-1 text-sm",
                                        children: "(4.2)"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/events.js",
                                        lineNumber: 121,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/events.js",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-green-400 font-semibold text-lg",
                                children: [
                                    "Starting from ₹",
                                    Math.floor(Math.random() * (4500 - 800) + 800)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/events.js",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-sm mt-1",
                                children: (()=>{
                                    const r = Math.random();
                                    if (r < 0.33) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-green-400",
                                        children: "● Available"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/events.js",
                                        lineNumber: 134,
                                        columnNumber: 28
                                    }, this);
                                    if (r < 0.66) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-yellow-400",
                                        children: "● Limited Seats"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/events.js",
                                        lineNumber: 136,
                                        columnNumber: 28
                                    }, this);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-red-400",
                                        children: "● Sold Out"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/events.js",
                                        lineNumber: 137,
                                        columnNumber: 26
                                    }, this);
                                })()
                            }, void 0, false, {
                                fileName: "[project]/pages/events.js",
                                lineNumber: 130,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/events/${event.id}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: "mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg",
                                    children: "View Details"
                                }, void 0, false, {
                                    fileName: "[project]/pages/events.js",
                                    lineNumber: 143,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/events.js",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this)
                        ]
                    }, event.id, true, {
                        fileName: "[project]/pages/events.js",
                        lineNumber: 100,
                        columnNumber: 13
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "col-span-full text-gray-400 text-center",
                    children: "No events found."
                }, void 0, false, {
                    fileName: "[project]/pages/events.js",
                    lineNumber: 150,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/events.js",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/events.js",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a331ab24._.js.map