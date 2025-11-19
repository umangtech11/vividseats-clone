module.exports = [
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
async function fetchEvents(keyword = "") {
    const API_KEY = ("TURBOPACK compile-time value", "7r5vXgx9gQlD2IlAUvY86Mbk00uPAAFc");
    const URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${keyword}&size=50`;
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
"[externals]/swiper/react [external] (swiper/react, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("swiper/react");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/swiper [external] (swiper, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("swiper");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchEvents$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/fetchEvents.js [ssr] (ecmascript)");
// Swiper
var __TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/swiper/react [external] (swiper/react, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$swiper__$5b$external$5d$__$28$swiper$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/swiper [external] (swiper, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$swiper__$5b$external$5d$__$28$swiper$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$swiper__$5b$external$5d$__$28$swiper$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
;
;
;
;
;
;
function Home() {
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        loadEvents();
    }, []);
    async function loadEvents() {
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchEvents$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["fetchEvents"])(""); // load trending events
        setEvents(data || []);
    }
    // Search Autocomplete
    async function handleSearchInput(e) {
        const value = e.target.value;
        setSearch(value);
        if (value.length < 2) {
            setSuggestions([]);
            return;
        }
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchEvents$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["fetchEvents"])(value);
        setSuggestions(data.slice(0, 6));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "px-6 md:px-16 pt-10 pb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$29$__["Swiper"], {
                        modules: [
                            __TURBOPACK__imported__module__$5b$externals$5d2f$swiper__$5b$external$5d$__$28$swiper$2c$__esm_import$29$__["Navigation"],
                            __TURBOPACK__imported__module__$5b$externals$5d2f$swiper__$5b$external$5d$__$28$swiper$2c$__esm_import$29$__["Pagination"],
                            __TURBOPACK__imported__module__$5b$externals$5d2f$swiper__$5b$external$5d$__$28$swiper$2c$__esm_import$29$__["Autoplay"]
                        ],
                        autoplay: {
                            delay: 3000
                        },
                        pagination: {
                            clickable: true
                        },
                        navigation: true,
                        className: "rounded-2xl overflow-hidden shadow-2xl",
                        children: events.slice(0, 5).map((ev)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$29$__["SwiperSlide"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "relative h-[400px] md:h-[500px] w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: ev.images?.[0]?.url,
                                            className: "w-full h-full object-cover opacity-80"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 59,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 flex flex-col justify-center items-center bg-black/40",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                                    className: "text-3xl md:text-5xl font-bold text-center",
                                                    children: ev.name
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.js",
                                                    lineNumber: 64,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-300 mt-2 text-center",
                                                    children: [
                                                        ev.dates?.start?.localDate,
                                                        " • ",
                                                        ev._embedded?.venues?.[0]?.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/index.js",
                                                    lineNumber: 67,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 63,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this)
                            }, ev.id, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-10 max-w-3xl mx-auto relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Search for events, teams or venues...",
                                className: "w-full px-6 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none",
                                value: search,
                                onChange: handleSearchInput
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute left-0 right-0 bg-gray-800 border border-gray-700 rounded-xl mt-2 z-20",
                                children: suggestions.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/events/${s.id}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "px-4 py-3 hover:bg-gray-700 cursor-pointer",
                                            children: s.name
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 91,
                                            columnNumber: 19
                                        }, this)
                                    }, s.id, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 90,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "px-6 md:px-16 py-14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold mb-8",
                        children: "Popular Categories"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-4 gap-6",
                        children: [
                            {
                                name: "Sports",
                                img: "/images/sports.jpg"
                            },
                            {
                                name: "Concerts",
                                img: "/images/concerts.jpg"
                            },
                            {
                                name: "Theatre",
                                img: "/images/theatre.jpg"
                            },
                            {
                                name: "Festivals",
                                img: "/images/festival.jpg"
                            }
                        ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative rounded-xl overflow-hidden group cursor-pointer shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: item.img,
                                        width: 400,
                                        height: 300,
                                        alt: item.name,
                                        className: "group-hover:scale-110 transition duration-500"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/40 flex items-center justify-center text-xl font-bold",
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "px-6 md:px-16 py-14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold mb-6",
                        children: "Trending Events"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$29$__["Swiper"], {
                        modules: [
                            __TURBOPACK__imported__module__$5b$externals$5d2f$swiper__$5b$external$5d$__$28$swiper$2c$__esm_import$29$__["Navigation"]
                        ],
                        spaceBetween: 20,
                        slidesPerView: 1.2,
                        navigation: true,
                        breakpoints: {
                            640: {
                                slidesPerView: 2.2
                            },
                            1024: {
                                slidesPerView: 3.2
                            }
                        },
                        children: events.slice(0, 10).map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$swiper$2f$react__$5b$external$5d$__$28$swiper$2f$react$2c$__esm_import$29$__["SwiperSlide"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/events/${event.id}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-800 rounded-xl p-5 shadow-lg hover:scale-105 transition cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: event.images?.[0]?.url,
                                                className: "w-full h-48 object-cover rounded-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 150,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold mt-3",
                                                children: event.name
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 155,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 mt-1",
                                                children: event._embedded?.venues?.[0]?.name
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 156,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400",
                                                children: event.dates?.start?.localDate
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 159,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-green-400 mt-2 font-semibold",
                                                children: [
                                                    "From ₹",
                                                    1200 + event.id.length * 10
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 161,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this)
                            }, event.id, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "px-6 md:px-16 py-16 text-center bg-gray-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-3xl md:text-4xl font-bold",
                        children: "Never Miss an Event Again"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 mt-2",
                        children: "Subscribe for updates on your favorite teams and artists."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg font-medium",
                        children: "Subscribe Now"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 172,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__45d0c0b3._.js.map