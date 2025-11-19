module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/events.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
async function handler(req, res) {
    const { keyword = "" } = req.query;
    const API_KEY = process.env.TICKETMASTER_API_KEY;
    const URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${keyword}&size=50`;
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return res.status(200).json(data._embedded?.events || []);
    } catch (error) {
        return res.status(500).json({
            error: "Failed to fetch events",
            details: error.toString()
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bf961b9b._.js.map