self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/_error": [
    "static/chunks/pages/_error.js"
  ],
  "/events": [
    "static/chunks/pages/events.js"
  ],
  "/events/[id]": [
    "static/chunks/pages/events/[id].js"
  ],
  "/stadium": [
    "static/chunks/pages/stadium.js"
  ],
  "/team/[id]": [
    "static/chunks/pages/team/[id].js"
  ],
  "/teams": [
    "static/chunks/pages/teams.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/api/events",
    "/api/search",
    "/categories/[category]",
    "/events",
    "/events/[id]",
    "/events/[id]/seating",
    "/favorites",
    "/stadium",
    "/team/[id]",
    "/teams"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()