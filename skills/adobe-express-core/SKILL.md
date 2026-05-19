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

## MCP Usage Guide (Primary Value of This Skill)

Use MCP as your first source for Adobe Express facts, APIs, examples, and type definitions. Avoid duplicating long documentation in this skill.

### When to Use MCP

- Before implementing any Adobe Express feature
- When you need current API behavior or schema details
- When generating code for Document API, UI components, OAuth, or manifest entries
- When debugging SDK usage, config, or add-on behavior

### MCP Tools and When to Call Them

- **`mcp_adobe-express_get_relevant_documentations`**: Use for official docs, guides, concepts, and implementation steps.
- **`mcp_adobe-express_get_typedefinitions`**: Use for exact TypeScript API signatures.
   - `express-document-sdk`: document operations
   - `add-on-sdk-document-sandbox`: iframe/sandbox communication
   - `iframe-ui`: panel-side UI/runtime APIs

### How to Use MCP in Prompts

Use explicit instructions so your agent calls MCP instead of guessing.

- "Use `mcp_adobe-express_get_relevant_documentations` for Adobe Express guidance before coding."
- "Use `mcp_adobe-express_get_typedefinitions` with `api_type=express-document-sdk`, then generate TypeScript code."
- "Cite official Adobe documentation returned by MCP in the response."

If your host supports tool tags, you can also call with hash-style hints:

- `#mcp_adobe-express_get_relevant_documentations Find how to add text to the document`
- `#mcp_adobe-express_get_typedefinitions api_type=iframe-ui`

### Prompt Templates

- **Feature build**: "Retrieve official docs for <feature> with MCP, retrieve type definitions, then implement in <framework>."
- **Debugging**: "Use MCP docs and type definitions to diagnose this error: <error>. Propose the smallest safe fix."
- **Manifest**: "Use MCP documentation to validate manifest entries for <capability>."

## Adobe Express Is Different from Web Development

Adobe Express add-ons run in a controlled host environment, not a normal web page. This creates architectural rules that directly affect how you design and debug features.

### Key Differences

- **Split runtime model**: UI runs in an iframe runtime while document edits run in a sandbox runtime.
- **Capability separation**: iframe is best for UI, OAuth, network access, and state; sandbox is best for Document API operations.
- **No direct cross-runtime calls**: iframe and sandbox exchange messages through the SDK boundary.
- **Host-controlled permissions**: capabilities are declared in `manifest.json` and enforced by Express.
- **Security-first constraints**: sandbox intentionally has limited browser-style APIs.

### Practical Implications

- Put external API calls and auth in iframe, then pass structured data to sandbox for document updates.
- Keep message contracts explicit (input shape, output shape, error shape) to avoid runtime mismatch.
- Treat `manifest.json` as source of truth for enabled features and permissions.
- When behavior is unclear, query MCP first for current API guidance before changing implementation.

### Common Pitfalls

- Trying to mutate the document directly from iframe code.
- Assuming sandbox has full browser APIs like a regular web app.
- Debugging only one runtime while the issue is actually in cross-runtime messaging.
- Implementing features before validating manifest and API support via MCP.

For runtime implementation details, query MCP first, then use adobe-express-document-manipulation skill.

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

## Skill Routing Guide

Once you understand the architecture, route specific tasks to specialized skills:

| Task Type | Route To | When |
|-----------|----------|------|
| UI components, panel layout, UX patterns | adobe-express-spectrum-ui-ux | Designing interfaces or reviewing UX |
| Insert shapes, text, images, audio, video | adobe-express-document-manipulation | Creating or modifying document content |
| OAuth login, token storage, cloud provider setup | adobe-express-oauth-authentication | Connecting to external services |
| Subscriptions, checkout flows, entitlements | adobe-express-monetization | Monetizing features or billing |
| Architecture decisions, manifest, MCP setup | adobe-express-core (this skill) | Planning overall add-on structure |

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
