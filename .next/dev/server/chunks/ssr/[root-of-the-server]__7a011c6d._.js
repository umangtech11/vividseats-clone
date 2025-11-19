module.exports = [
"[project]/pages/events/[id].js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchEventDetails",
    ()=>fetchEventDetails,
    "fetchEvents",
    ()=>fetchEvents
]);
async function fetchEvents(keyword = "") {
    const API_KEY = process.env.TICKETMASTER_API_KEY;
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
    const API_KEY = process.env.TICKETMASTER_API_KEY;
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
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7a011c6d._.js.map