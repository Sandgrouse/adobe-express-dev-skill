---
name: adobe-express-core
description: Adobe Express add-on architecture decisions, runtime boundaries, and composite skill installation. Use when planning add-on structure, deciding between iframe and document sandbox, routing MCP queries, managing manifest permissions, and installing the skill collection.
---

# Adobe Express Core Skill

This skill helps you make foundational architecture decisions for Adobe Express add-ons, manage the composite skill collection, and route development tasks to appropriate specialized skills.

## When to Use This Skill

- Deciding whether a feature belongs in the iframe runtime or document sandbox
- Planning manifest permissions and entry points
- Querying official MCP for add-on platform APIs, SDK method signatures, and manifest requirements; querying community MCP only for Spectrum Web Components UI details
- Installing the Adobe Express skills collection
- Validating runtime architecture and cross-skill task handoffs

## Quick Start

### Install the Skill Collection

```bash
# Primary command (after npm package publish)
npx @sandgrouse/adobe-express-skills@latest install

# Local repository fallback
node skills/adobe-express-core/scripts/install-skills.mjs install
```

Optional flags: `--target <host>`, `--skills <csv>`, `--dry-run`

See `skills/adobe-express-core/references/mcp-setup-and-install.md` for details.

### Troubleshooting Installation

If installation fails:

1. Verify Node.js >= 18: `node --version`
2. Check that destination folder exists or is creatable
3. Confirm npm/yarn/bun is installed: `npm --version`
4. Review installer flags: `node skills/adobe-express-core/scripts/install-skills.mjs --help`
5. Run in `--dry-run` mode first to test: `--dry-run`
6. Check filesystem permissions for destination path

For persistent issues, see `references/mcp-setup-and-install.md` for host-specific destination paths.

### Understand Two-Runtime Architecture

**Iframe Runtime**: UI code (HTML, CSS, JS), user interactions, OAuth flows, data imports/exports.
**Document Sandbox**: Document manipulation (shapes, text, media), limited Web APIs for security.

**Communication**: Use Document Sandbox SDK (`runtime.exposeApi()`, `runtime.apiProxy()`) to bridge between runtimes.

### MCP Routing Strategy

**Use Official Adobe Express MCP for:**
- Add-on platform APIs (e.g., `addOnUISdk`, document SDK methods)
- SDK documentation and type signatures
- Manifest structure and permission requirements
- Runtime behavior and capabilities

**Use Community MCP only for:**
- Spectrum Web Components API details (sp-button, sp-textfield, etc.)
- Component state, events, and accessibility patterns
- Spectrum theming and styling

If your query involves both add-on APIs and UI components, start with official MCP first, then ask community MCP for UI details.

## Skill Routing Guide

Use this table to route tasks to the correct skill:

| Task Type | Route To | When |
|-----------|----------|------|
| Component selection, panel layout, UX patterns | adobe-express-spectrum-ui-ux | Designing UI or reviewing for UX issues |
| Insert shapes, text, images, audio, video | adobe-express-document-manipulation | Creating or modifying document content |
| OAuth login, token storage, provider setup | adobe-express-oauth-authentication | Connecting to cloud providers |
| Subscriptions, checkout flows, entitlements | adobe-express-monetization | Monetizing features or managing billing |
| Architecture validation, manifest, MCP routing | adobe-express-core (this skill) | Planning overall add-on structure |

If a task spans multiple domains (e.g., "add OAuth login button"), start with the primary skill above, then hand off to secondary skills as needed.

## Common Tasks

### Plan Add-on Architecture

1. Identify features that modify documents (document sandbox needed) vs UI-only features (iframe only)
2. Check manifest requirements for feature scope
3. Plan MCP queries: official for platform, community for UI
4. Define entrypoints and permissions

### Validate Manifest Permissions

- Popup permissions needed? Check manifest `permissions.sandbox` for `allow-popups`
- OAuth providers? List them in `permissions.oauth`
- Document sandbox required? Include `documentSandbox` path

## References

- [MCP Setup and Installation](references/mcp-setup-and-install.md)
- [Official Adobe Express Docs](https://developer.adobe.com/express/add-ons/docs/)
- [Code Samples Catalog](../../references/code-samples.md)
