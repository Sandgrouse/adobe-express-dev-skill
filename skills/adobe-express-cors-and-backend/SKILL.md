---
name: adobe-express-cors-and-backend
description: Diagnose and fix CORS errors between Adobe Express add-on UI and backend APIs across local development, private listing, and public listing stages. Use when browser requests fail with preflight, Access-Control-Allow-Origin, Access-Control-Allow-Headers, or OPTIONS issues; when moving from localhost to hosted add-on URL; when deciding where network calls belong (iframe vs sandbox); or when hardening backend origin policy for production.
---

# Adobe Express CORS and Backend Skill

Use this skill to resolve cross-origin failures quickly and safely while keeping secrets off the client.

## Core Rule

Treat CORS as a backend response policy problem, not an add-on UI bug.

- Browser enforces CORS.
- Postman and curl can pass even when browser fails.
- Most fixes happen in server middleware order and response headers.

## Fast Workflow

1. Identify stage: local development, private listing, or public listing.
2. Confirm request origin and endpoint from browser Network tab.
3. Ensure network calls run in iframe UI runtime, not document sandbox runtime.
4. Apply stage-specific backend CORS policy from `references/cors-stage-playbook.md`.
5. Validate OPTIONS preflight first, then validate the real request.
6. Harden policy for production (explicit origins, no leaked secrets).

## MCP-First Guidance

Call MCP before changing architecture assumptions or API behavior.

- Use `mcp_adobe-express_get_relevant_documentations` for official architecture, runtime, distribution, and security guidance.
- Use `mcp_adobe-express_get_typedefinitions` when validating Adobe Express runtime APIs.

Prompt examples:

- "Use `mcp_adobe-express_get_relevant_documentations` to verify Adobe Express runtime boundaries for fetch calls."
- "Use `mcp_adobe-express_get_relevant_documentations` to confirm private vs public distribution behavior before CORS changes."

If tool-tag syntax is supported by your host:

- `#mcp_adobe-express_get_relevant_documentations Adobe Express runtime context and security for network requests`

## CORS Debug Sequence

Run this order every time:

1. Open DevTools Network tab and find the failing request pair.
2. Inspect `OPTIONS` request:
   - Must return 2xx.
   - Must include `Access-Control-Allow-Origin`.
   - Must include allowed methods and allowed headers for the real request.
3. Inspect actual request (`GET`/`POST`/etc.) after preflight.
4. If preflight is blocked by auth middleware, move CORS middleware earlier.
5. Re-test after each backend change.

## Non-Negotiable Production Rules

- Do not use wildcard origins for public traffic unless explicitly intended and safe.
- Keep API keys and secrets on backend only.
- Use explicit allowlist origins, including your Adobe add-on URL.
- Confirm backend is deployed over HTTPS for private/public distribution.

## Framework Notes

Express examples are in the references file. For non-Express backends, apply the same policy model with framework-specific CORS configuration.

See `references/cors-stage-playbook.md` for:

- Stage-specific policy (local, private, public)
- Express config patterns
- Preflight failure playbook
- Credentials and wildcard caveats
- Framework mapping (FastAPI, Flask, Lambda/API Gateway, Workers)

## Skill Handoffs

- UI request wiring and UX errors: `adobe-express-spectrum-ui-ux`
- Document operations after API response: `adobe-express-document-manipulation`
- OAuth token flow and storage: `adobe-express-oauth-authentication`
- MCP setup and core architecture routing: `adobe-express-core`
