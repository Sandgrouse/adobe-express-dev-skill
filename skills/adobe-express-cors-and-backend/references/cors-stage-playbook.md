# CORS Stage Playbook for Adobe Express Add-ons

Use this playbook after identifying the current deployment stage.

## Table of Contents

- Stage 1: Local Development
- Stage 2: Private Listing
- Stage 3: Public Listing
- Preflight Debug Checklist
- Credentials and Wildcard Rules
- Backend Separation Pattern
- Framework Mapping

## Stage 1: Local Development

Goal: unblock rapid iteration.

Minimal Express pattern:

```javascript
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/api/hello", (req, res) => {
  res.json({ ok: true });
});

app.listen(3000);
```

Notes:

- Use wildcard only for development.
- Verify in browser Network tab, not just Postman.

## Stage 2: Private Listing

Goal: allow only known origins.

1. Get your add-on URL from Adobe Express add-on settings.
2. Remove trailing slash when storing origin.
3. Add both local dev origin and hosted add-on origin during transition.

Express allowlist pattern:

```javascript
const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://abc123.wxp.adobe-addons.com",
  "https://localhost:5241"
];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(null, false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    maxAge: 86400
  })
);

app.use(express.json());
```

Notes:

- Place CORS middleware before auth middleware.
- Ensure `OPTIONS` is not blocked by custom middleware.

## Stage 3: Public Listing

Goal: production-safe and reachable by real users.

Keep CORS policy explicit:

- Keep hosted add-on origin in allowlist.
- Keep only trusted origins.
- Remove permissive wildcard defaults.

Operational requirements:

- Deploy backend to public HTTPS host.
- Store secrets in backend environment variables.
- Keep tokens and keys out of add-on bundle.

## Preflight Debug Checklist

Check this order in browser Network tab:

1. Does `OPTIONS` return 2xx?
2. Does preflight include `Access-Control-Allow-Origin`?
3. Does preflight include allowed methods and headers used by actual request?
4. Is auth middleware rejecting preflight with 401 or 403?
5. Does the real request execute right after successful preflight?

If `OPTIONS` fails, fix preflight first. Do not debug application payload yet.

## Credentials and Wildcard Rules

If client sends cookies with `credentials: "include"`:

- Do not use `Access-Control-Allow-Origin: *`.
- Return exact origin.
- Return `Access-Control-Allow-Credentials: true`.

If using bearer tokens in `Authorization` header:

- Ensure `Authorization` is listed in `Access-Control-Allow-Headers`.

## Backend Separation Pattern

Keep add-on UI and backend as separate applications:

- Add-on UI handles user interaction and sends fetch requests.
- Backend handles secrets, external APIs, databases, and business logic.
- Add-on never exposes private keys.

For Adobe Express runtime placement:

- Run network calls in iframe UI runtime.
- Use document sandbox for document operations.

## Framework Mapping

Apply same CORS policy concepts across stacks:

- Express: `cors` middleware
- FastAPI: `CORSMiddleware`
- Flask: `flask-cors`
- AWS Lambda/API Gateway: CORS in gateway config and response headers
- Cloudflare Workers: explicit response headers in worker responses

Core invariant:

Backend must allow the Adobe add-on origin and required methods/headers.
