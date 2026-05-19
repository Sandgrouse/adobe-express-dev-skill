# MCP Setup and Skill Installation

This reference explains how to install the composite skill collection and configure both MCP servers.

## Skill Collection Install

Primary command:
- npx @sandgrouse/adobe-express-skills@latest install

Fallback command:
- npm install -g @sandgrouse/adobe-express-skills && adobe-express-skills install

Local repository fallback:
- node skills/adobe-express-core/scripts/install-skills.mjs install

## Installer Options

- --target <host>: explicit host target. Supported values: copilot, cursor, windsurf, continue, claude, antigravity-global, antigravity-workspace.
- --destination <path>: explicit absolute destination path.
- --dry-run: print changes without writing files.
- --skills <csv>: install only selected skills by folder name.

## MCP Servers

Use both servers:
- Official: @adobe/express-developer-mcp
- Community: community-express-dev-mcp

Official MCP should be used for Adobe Express platform and SDK queries.
Community MCP should be used for Spectrum component discovery and UI API details.

## Guardrails

- Keep MCP setup details in this core reference only.
- Other skills should link here instead of duplicating setup instructions.
- Re-running installer must be idempotent and safe.
