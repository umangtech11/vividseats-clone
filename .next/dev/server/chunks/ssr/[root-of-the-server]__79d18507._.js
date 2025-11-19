module.exports = [
"[project]/pages/events.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

// pages/events.js (snippet)
/*#__PURE__*/ const { jsxDEV: _jsxDEV } = __turbopack_context__.r("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
_jsxDEV("div", {
    className: "grid sm:grid-cols-2 md:grid-cols-3 gap-8",
    children: Array.isArray(events) && events.length > 0 ? events.map((event)=>/*#__PURE__*/ _jsxDEV("div", {
            className: "bg-gray-800 p-4 rounded-xl shadow hover:shadow-blue-500/30 transition",
            children: [
                /*#__PURE__*/ _jsxDEV("img", {
                    src: event.images?.[0]?.url || "/images/placeholder.jpg",
                    className: "w-full h-48 object-cover rounded-lg",
                    alt: event.name || "Event"
                }, void 0, false, {
                    fileName: "[project]/pages/events.js",
                    lineNumber: 6,
                    columnNumber: 9
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("h2", {
                    className: "text-xl font-semibold mt-4",
                    children: event.name
                }, void 0, false, {
                    fileName: "[project]/pages/events.js",
                    lineNumber: 11,
                    columnNumber: 9
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("p", {
                    className: "text-gray-400 mt-1",
                    children: event.dates?.start?.localDate || "Date not available"
                }, void 0, false, {
                    fileName: "[project]/pages/events.js",
                    lineNumber: 12,
                    columnNumber: 9
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV(Link, {
                    href: `/events/${event.id}`,
                    children: /*#__PURE__*/ _jsxDEV("button", {
                        className: "mt-4 w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-500 transition",
                        children: "View Details"
                    }, void 0, false, {
                        fileName: "[project]/pages/events.js",
                        lineNumber: 16,
                        columnNumber: 11
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                }, void 0, false, {
                    fileName: "[project]/pages/events.js",
                    lineNumber: 15,
                    columnNumber: 9
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
            ]
        }, event.id, true, {
            fileName: "[project]/pages/events.js",
            lineNumber: 5,
            columnNumber: 7
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)) : /*#__PURE__*/ _jsxDEV("div", {
        className: "col-span-full text-gray-400",
        children: "No events found. Try a different search or check server logs."
    }, void 0, false, {
        fileName: "[project]/pages/events.js",
        lineNumber: 23,
        columnNumber: 5
    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
}, void 0, false, {
    fileName: "[project]/pages/events.js",
    lineNumber: 2,
    columnNumber: 1
}, /*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__79d18507._.js.map