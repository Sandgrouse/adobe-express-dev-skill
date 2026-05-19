---
name: adobe-express-core
description: Adobe Express environment essentials, two-runtime architecture, project setup, and MCP server configuration. Use when starting add-on development, understanding iframe vs sandbox boundaries, configuring MCP servers, setting up local projects, or validating manifest configuration.
---

# Adobe Express Core Skill

This skill explains the Adobe Express development environment, the two-runtime architecture that makes it different from web development, and how to set up your development tools including the essential MCP servers.

## When to Use This Skill

- Starting your first Adobe Express add-on project
- Understanding why the iframe and document sandbox runtimes are separate
- Choosing your project setup path (Official Adobe CLI or Bolt Express)
- Configuring the official Adobe Express MCP server
- Planning runtime communication between UI and document manipulation
- Validating manifest.json configuration
- Routing tasks to specialized skills (Spectrum UI, document manipulation, OAuth, monetization)

## MCP Server Setup (Required First Step)

To enable AI-powered documentation, code completion, and manifest validation, you must connect your IDE to the official Adobe Express MCP server.

**Agent instruction:** Run the setup script directly. Do not stop at instructions-only output.

### Workflow

1. **Run the setup script:**  
   In your project root, run:
   ```bash
   node skills/adobe-express-core/scripts/setup-mcp-servers.mjs --target <your-ide>
   ```
   Replace `<your-ide>` with one of: `copilot`, `cursor`, `windsurf`, `continue`, `claude`, `vscode`, `antigravity`, or `all` (for all supported IDEs).

   - The script will detect your IDE and update the correct MCP config file (e.g., `.copilot/mcp.json`, `.cursor/mcp.json`, etc.) with the official Adobe Express MCP server entry.

2. **Restart your IDE:**  
   This ensures the MCP server connection is detected.

3. **Verify connection:**  
   - Look for an MCP status indicator in your IDE (if available).
   - Ask your LLM: “List MCP tools” or “What is the Adobe Express MCP status?”

### Manual Setup (Advanced)

If you prefer to configure your IDE manually, see [MCP Setup and Installation](references/mcp-setup-and-install.md) for step-by-step instructions on editing your IDE’s config files and adding the MCP server entry by hand.

### Available Scripts

- **`skills/adobe-express-core/scripts/setup-mcp-servers.mjs`** — Automates MCP server configuration for all supported IDEs.
- **`install-skills.mjs`** — Installs all skill folders (or selected skills) from the repository root into your host skill directory.

## Adobe Express Is Different from Web Development

Add-ons run inside Adobe Express as isolated panels with restrictions:

- **No direct DOM access to Express**: Your add-on cannot manipulate the main Express interface
- **Two separate runtimes**: The UI (iframe) and document operations (sandbox) cannot directly call each other—they communicate via message passing
- **Limited Web APIs in sandbox**: Security restriction—the document manipulation environment has minimal browser APIs available
- **Manifest-driven architecture**: Every add-on requires a `manifest.json` file declaring permissions, entry points, and capabilities upfront
- **Spectrum design system is mandatory**: All add-ons must follow Adobe's design language for consistency with the Express interface

This is not traditional web development. It's a highly controlled, security-first environment.

## Two-Runtime Architecture Explained

The iframe and sandbox separation is the core concept:

### Iframe Runtime (UI/Panel Layer)

- **What it can do**: Full Web APIs (fetch, localStorage, WebSockets), user interactions, OAuth flows, external API calls, Client Storage
- **What it cannot do**: Manipulate the document, access document structure, create shapes/text/media
- **Purpose**: All UI, authentication, user input, external integrations

### Document Sandbox (Document Manipulation Layer)

- **What it can do**: Full Document API (create shapes, text, images, audio, video), access document tree, real-time rendering
- **What it cannot do**: Use Web APIs (no fetch, no localStorage, no DOM), render UI, access iframe directly
- **Purpose**: Document operations only

### Communication Pattern

The two runtimes communicate via Document Sandbox SDK using message passing. The iframe calls methods in the sandbox, and the sandbox calls methods back in the iframe. This message-based pattern ensures security and isolation.

**For detailed examples and implementation patterns, see adobe-express-document-manipulation skill.**

## Project Setup Options

Two proven paths exist for setting up your first add-on project:

### Official Adobe CLI (`@adobe/create-ccweb-add-on`)

Official tool from Adobe with multiple templates to choose from:
- JavaScript (vanilla), React, Vue, Svelte templates available
- Full build pipeline and local dev server included
- Official support and documentation

See [Project Setup Guide](references/project-setup.md) for detailed instructions and template comparison.

### Bolt Express (Community Tool)

Community-built boilerplate with enhanced developer experience:
- **Lightning-fast hot reloading** for rapid iteration
- **TypeScript definitions** built-in for frontend, backend, and manifest
- **Framework choice**: Svelte, React, or Vue
- **Type-safe messaging** between UI and sandbox automatically
- **GitHub Actions** ready for releases
- MIT licensed, free and open source

**Why consider Bolt Express?** If you want faster development cycles with hot reloading, built-in TypeScript support, and less configuration overhead, Bolt Express is worth evaluating.

See [Project Setup Guide](references/project-setup.md) for Bolt Express quick start and feature comparison.

## Project Structure: Three Essential Layers

Every add-on has these three components:

1. **manifest.json** — Declares the add-on's metadata and permissions
   - Specifies OAuth providers, sandbox capabilities, entry points
   - Generated automatically by both official CLI and Bolt Express
   - Ask MCP for current manifest schema and best practices

2. **Frontend UI** — User interface in your chosen framework
   - React, Vue, Svelte, or vanilla JavaScript
   - Must use Spectrum Web Components for consistency
   - Handles user interactions and state
   - See adobe-express-spectrum-ui-ux skill for UI guidance

3. **Backend Code (Sandbox)** — Document manipulation layer
   - Runs in isolated sandbox with Document API access
   - Communicates with UI via message passing
   - Only needed if your add-on modifies the document
   - See adobe-express-document-manipulation skill for operations

## Skill Routing Guide

Once you understand the architecture, route specific tasks to specialized skills:

| Task Type | Route To | When |
|-----------|----------|------|
| UI components, panel layout, UX patterns | adobe-express-spectrum-ui-ux | Designing interfaces or reviewing UX |
| Insert shapes, text, images, audio, video | adobe-express-document-manipulation | Creating or modifying document content |
| OAuth login, token storage, cloud provider setup | adobe-express-oauth-authentication | Connecting to external services |
| Subscriptions, checkout flows, entitlements | adobe-express-monetization | Monetizing features or billing |
| Architecture decisions, manifest, MCP setup | adobe-express-core (this skill) | Planning overall add-on structure |

## Common Architecture Questions

**Q: Does my add-on need a document sandbox?**
A: Only if it creates or modifies document content (shapes, text, media). UI-only add-ons use iframe only.

**Q: Why can't the UI code call document methods directly?**
A: Security and stability. The sandbox is isolated to prevent malicious or buggy UI code from corrupting the document.

**Q: Where do I fetch data from APIs?**
A: In the iframe (full Web API access). Pass data to the sandbox via message passing if needed for document operations.

**Q: How do I store user preferences?**
A: Use Client Storage in iframe: Ask your MCP for current `clientStorage` API details.

## References

**Setup**:
- [MCP Setup and Installation](references/mcp-setup-and-install.md) — Configure the official Adobe Express MCP (required first step)
- [Project Setup Guide](references/project-setup.md) — Compare Adobe CLI vs Bolt Express, choose your path

**External Resources**:
- [Adobe Express Developer Docs](https://developer.adobe.com/express/add-ons/docs/)
- [Manifest Schema Reference](https://developer.adobe.com/express/add-ons/docs/references/manifest/)
- [Code Samples Repository](https://github.com/AdobeDocs/express-add-on-samples)
- [Bolt Express GitHub](https://github.com/hyperbrew/bolt-express) (community tool)
- [Bolt Express Discord Community](https://discord.gg/PC3EvvuRbc)

**Next Steps**: Configure MCP → Choose project setup path → Use specialized skills for specific tasks
