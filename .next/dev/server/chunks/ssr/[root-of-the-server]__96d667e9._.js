module.exports = [
"[project]/data/teams.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "teams",
    ()=>teams
]);
const teams = [
    {
        id: 1,
        name: "Los Angeles Lakers",
        sport: "Basketball",
        logo: "/teams/lakers.png"
    },
    {
        id: 2,
        name: "Golden State Warriors",
        sport: "Basketball",
        logo: "/teams/warriors.png"
    },
    {
        id: 3,
        name: "Dallas Cowboys",
        sport: "Football",
        logo: "/teams/cowboys.png"
    },
    {
        id: 4,
        name: "New York Yankees",
        sport: "Baseball",
        logo: "/teams/yankees.png"
    },
    {
        id: 5,
        name: "Manchester United",
        sport: "Soccer",
        logo: "/teams/manu.png"
    }
];
}),
"[project]/pages/favorites.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FavoritesPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$teams$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/teams.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [ssr] (ecmascript)");
;
;
;
;
function FavoritesPage() {
    const [favorites, setFavorites] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(saved);
    }, []);
    const favoriteTeams = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$teams$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["teams"].filter((team)=>favorites.includes(team.id));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto px-6 pt-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-bold mb-6 text-white",
                children: "My Favorite Teams"
            }, void 0, false, {
                fileName: "[project]/pages/favorites.js",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            favoriteTeams.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-gray-400",
                children: "No favorite teams yet."
            }, void 0, false, {
                fileName: "[project]/pages/favorites.js",
                lineNumber: 20,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8",
                children: favoriteTeams.map((team)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-blue-500/30 transition transform hover:-translate-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: team.logo,
                                alt: team.name,
                                className: "w-24 h-24 object-contain mx-auto"
                            }, void 0, false, {
                                fileName: "[project]/pages/favorites.js",
                                lineNumber: 28,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-xl text-center font-semibold text-white mt-4",
                                children: team.name
                            }, void 0, false, {
                                fileName: "[project]/pages/favorites.js",
                                lineNumber: 34,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-center text-gray-400",
                                children: team.sport
                            }, void 0, false, {
                                fileName: "[project]/pages/favorites.js",
                                lineNumber: 38,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex justify-center mt-4 text-2xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaHeart"], {
                                    className: "text-red-500"
                                }, void 0, false, {
                                    fileName: "[project]/pages/favorites.js",
                                    lineNumber: 41,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/favorites.js",
                                lineNumber: 40,
                                columnNumber: 15
                            }, this)
                        ]
                    }, team.id, true, {
                        fileName: "[project]/pages/favorites.js",
                        lineNumber: 24,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/pages/favorites.js",
                lineNumber: 22,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/favorites.js",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__96d667e9._.js.map