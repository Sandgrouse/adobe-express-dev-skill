# MCP Server Setup Guide

This reference explains how to configure the Adobe Express MCP servers in your development environment.

## What is MCP?

Model Context Protocol (MCP) acts as a bridge between your LLM (AI assistant) and Adobe Express documentation. It enables your AI coding assistant to search for relevant guides, access TypeScript definitions, and generate accurate code—all without leaving your editor.

## Setup Steps

### Step 1: Configure MCP Server (Manual Setup)

Use the official MCP package in your IDE config:

- Package: `@adobe/express-developer-mcp@latest`
- Command: `npx`
- Args: `[@adobe/express-developer-mcp@latest, --yes]`

#### Cursor

Edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "adobe-express-developer": {
      "command": "npx",
      "args": ["@adobe/express-developer-mcp@latest", "--yes"]
    }
  }
}
```

#### Claude Desktop

Edit `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "adobe-express-developer": {
      "command": "npx",
      "args": ["@adobe/express-developer-mcp@latest", "--yes"]
    }
  }
}
```

#### VS Code

Edit `~/.vscode/mcp.json`:

```json
{
  "servers": {
    "adobe-express-developer": {
      "command": "npx",
      "args": ["@adobe/express-developer-mcp@latest", "--yes"]
    }
  }
}
```

### Step 2: Optional Scripted Setup

If you prefer automation, run the setup script:

For agent workflows, execute this script directly instead of only describing the steps.

```bash
# Configure one IDE
node skills/adobe-express-core/scripts/setup-mcp-servers.mjs --target cursor

# Configure all supported IDEs
node skills/adobe-express-core/scripts/setup-mcp-servers.mjs --target all
```

Supported script targets: `copilot`, `cursor`, `windsurf`, `continue`, `claude`, `vscode`, `antigravity`, `all`

### Step 3: Restart Your IDE

After running the setup script, fully restart your IDE. The MCP server will connect automatically.

### Step 4: Verify the Connection

1. Look for a green indicator in your IDE showing MCP is connected (e.g., bottom-right corner in Cursor)
2. Ask your LLM: "_List MCP tools_" to confirm the Adobe Express MCP is available
3. Test with a query: "_How do I create text in Adobe Express_?" and watch the MCP tool call execute

## Official Adobe Express MCP Server

**Package**: `@adobe/express-developer-mcp@latest`

This MCP server provides:
- **Semantic documentation search**: Find relevant Adobe Express guides and examples
- **TypeScript definitions**: Get accurate code completions and reduce AI hallucinations
- **API references**: Access SDK documentation, manifest schema, and best practices
- **Official sources only**: Avoids outdated or incorrect information

### Prerequisites

- Node.js 18+
- MCP-compatible IDE: Cursor, Claude Desktop, VS Code, Windsurf, Continue, or GitHub Copilot
- Internet connection (to download MCP via npx)

## Usage: Effective MCP Queries

Once connected, your LLM automatically invokes MCP tools based on your questions.

### Documentation & Learning

- "How do I create and style text in Adobe Express?"
- "What are the steps for implementing drag-and-drop functionality?"
- "Show me examples of using the color picker component?"
- "Retrieve the official documentation for the Document API"

### Code Generation & Implementation

- "Implement a color picker in my add-on"
- "Generate code to create a text element with custom styling"
- "Build a drag-and-drop interface for uploading images"
- "Create a button that adds a rectangle to the canvas"

### Debugging & Troubleshooting

- "Why isn't my add-on loading in Adobe Express?"
- "Debug this error when trying to add an image to the document (error: ...)"
- "How do I troubleshoot OAuth callback failures?"

## Best Practices

- **Be specific**: "_Add stroke to a rectangle_" vs "_Style shapes_"
- **Include context**: "_I'm building a text editor add-on_"
- **Use technical terms**: "_text styling_" vs "_make it look good_"
- **Ask for examples**: "_Show me code examples for..._"
- **Ask for sources**: "_Retrieve official Adobe documentation for..._"

## Spectrum Web Components (UI Components)

Spectrum Web Components documentation is included in the official MCP. Ask for specific component details:

- "What are the props for sp-button?"
- "How do I make a dropdown accessible?"
- "Show me keyboard navigation patterns in Spectrum"
- "What's the difference between sp-button and sp-icon-button?"

No separate installation is needed—the official MCP covers UI components.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **MCP server won't connect** | Verify Node.js 18+, restart IDE, check for green indicator |
| **Config file errors** | Check JSON syntax with `node skills/adobe-express-core/scripts/setup-mcp-servers.mjs --target <host> --dry-run` |
| **No documentation results** | Use specific terms, include "Adobe Express" context, try broader queries first |
| **Connection lost after IDE restart** | Re-run setup script for your IDE and restart again |
| **Multiple IDEs, unsure which to configure** | Run with `--target all` to setup all supported IDEs |

## CLI Reference

### Setup MCP Servers

```
node skills/adobe-express-core/scripts/setup-mcp-servers.mjs [--target <host>] [--dry-run]

Targets: copilot | cursor | windsurf | continue | claude | vscode | all

Examples:
  node skills/adobe-express-core/scripts/setup-mcp-servers.mjs --target cursor
  node skills/adobe-express-core/scripts/setup-mcp-servers.mjs --target all
  node skills/adobe-express-core/scripts/setup-mcp-servers.mjs --target copilot --dry-run
```

**Flags**:
- `--target`: IDE to configure (required)
- `--dry-run`: Show changes without writing to config files
- `--help`: Show help

## Learn More

- [Official Adobe Express MCP Documentation](https://developer.adobe.com/express/add-ons/docs/guides/getting-started/local-development/mcp-server)
- [Adobe Express Add-on Documentation](https://developer.adobe.com/express/add-ons/docs/)
- [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/)
- [Adobe Express Community Discord](https://discord.com/invite/nc3QDyFeb4)
