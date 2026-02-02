# Adobe Express Development Skill for GitHub Copilot

**Expert guidance for Adobe Express add-on development** with MCP server integration, OAuth patterns, and comprehensive code samples catalog.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Copilot](https://img.shields.io/badge/GitHub-Copilot-blue)](https://github.com/features/copilot)
[![Adobe Express](https://img.shields.io/badge/Adobe-Express-FF0000)](https://developer.adobe.com/express/add-ons/)

## What is This?

A **GitHub Copilot Agent Skill** that provides expert knowledge and tooling for developing Adobe Express add-ons. When you're working on Adobe Express projects, this skill automatically activates to help you with:

- 📚 Accessing latest Adobe Express API documentation via MCP server
- 🔐 Implementing OAuth 2.0 authentication (PKCE flow)
- 🎨 Building UIs with Spectrum Web Components
- 📦 Understanding project structure and architecture
- 💾 Data persistence and storage patterns
- 🖼️ Document manipulation (shapes, text, images, audio, video)
- 🔄 Communication between iframe runtime and document sandbox
- 🛠️ Troubleshooting common issues

## Features

✅ **MCP Server Integration** - Uses Adobe Express MCP server for up-to-date documentation  
✅ **OAuth 2.0 Guide** - Complete PKCE implementation with 4 cloud providers  
✅ **13 Code Samples Catalog** - Official Adobe samples with detailed descriptions  
✅ **OAuthUtils.js Reference** - Reusable OAuth helper module  
✅ **8 Step-by-Step Workflows** - Common development tasks  
✅ **Production Patterns** - Real-world implementation examples  
✅ **Best Practices** - Security, performance, and UX guidelines  

## Installation

### 1. Clone this repository

```bash
cd ~/.copilot/skills/
git clone https://github.com/YOUR_USERNAME/adobe-express-dev-skill.git adobe-express-dev
```

### 2. Configure Adobe Express MCP Server

Add to your `.vscode/mcp.json` or IDE MCP configuration:

```json
{
  "mcpServers": {
    "adobe-express": {
      "command": "npx",
      "args": [
        "-y",
        "@adobe/aem-mcp-server-adobe-express"
      ]
    }
  }
}
```

### 3. Restart GitHub Copilot

The skill will automatically activate when you work on Adobe Express add-on projects.

## What's Included

### Main Skill (`SKILL.md`)
- **When to Use**: Trigger keywords and scenarios
- **Key Concepts**: Two-runtime architecture, import patterns, SDK usage
- **8 Workflows**: API docs access, project structure, document content, UI building, OAuth, communication, samples, debugging
- **Best Practices**: Security, performance, testing
- **Troubleshooting**: Common issues and solutions

### OAuth Implementation Guide (`references/oauth-implementation.md`)
- PKCE flow step-by-step with code examples
- OAuthUtils.js helper module documentation
- Provider configurations: Dropbox, OneDrive, Google Drive, Box
- Token storage with Client Storage API
- Login/logout UI patterns
- Error handling examples
- Production-ready code snippets

### Code Samples Catalog (`references/code-samples.md`)
Comprehensive guide to 13 official Adobe Express samples:
- **import-images-using-oauth** ⭐ - Complete OAuth + cloud storage
- **use-client-storage** - Data persistence patterns
- **export-sample** - Export renditions (JPEG, PNG, PDF, MP4)
- **audio-recording-addon** - Media handling
- **pix** - Advanced canvas-based editor
- Plus 8 more covering React, Vue, Spectrum, and more

## Quick Start Examples

### Access Latest API Documentation
```
Ask: "How do I create text in Adobe Express?"
→ Skill uses MCP server to fetch current documentation
```

### Implement OAuth for Dropbox
```
Ask: "How do I implement OAuth for Dropbox?"
→ Skill references oauth-implementation.md
→ Provides PKCE flow code + OAuthUtils.js link
```

### Find Code Samples
```
Ask: "Show me Adobe Express samples for drag and drop"
→ Skill references code-samples.md
→ Returns relevant samples with GitHub links
```

## File Structure

```
adobe-express-dev/
├── SKILL.md                              # Main skill instructions
├── README.md                             # This file
├── LICENSE                               # MIT License
└── references/
    ├── oauth-implementation.md           # OAuth 2.0 complete guide
    └── code-samples.md                   # 13 official samples catalog
```

## When This Skill Activates

GitHub Copilot automatically uses this skill when you:
- Mention "Adobe Express", "add-on", "express-document-sdk"
- Work with document sandbox or iframe runtime
- Implement OAuth authentication
- Use Spectrum Web Components
- Ask about Adobe Express APIs or development patterns

## Prerequisites

- **GitHub Copilot** subscription (Individual, Business, or Enterprise)
- **Adobe Express MCP Server** configured in your IDE
- **Node.js 18+** for local add-on development
- **Adobe Express account** for testing add-ons

## How It Works

1. **You ask a question** about Adobe Express development
2. **Skill detects** relevant keywords (add-on, OAuth, document sandbox, etc.)
3. **Skill activates** and provides:
   - References to bundled guides (OAuth, samples)
   - MCP server queries for latest API docs
   - Code examples and patterns
   - Links to official resources
4. **You get accurate, actionable guidance** without leaving your IDE

## What This Skill Does NOT Do

❌ Does not duplicate entire code samples (provides links instead)  
❌ Does not replace the MCP server (complements it)  
❌ Does not include full OAuthUtils.js file (links to source)  
❌ Does not copy all API documentation (uses MCP for latest)  

**Instead**: Provides curated guides, patterns, and pointers to authoritative sources.

## Examples of Skill in Action

### Example 1: OAuth Implementation
**You**: "How do I add Google Drive OAuth to my add-on?"

**Skill Response**:
- References `oauth-implementation.md`
- Provides Google Drive OAuth config
- Shows PKCE flow code
- Links to OAuthUtils.js helper
- Explains manifest.json updates

### Example 2: Code Samples
**You**: "I need an example of client storage"

**Skill Response**:
- References `code-samples.md`
- Points to `use-client-storage` sample
- Describes what it demonstrates
- Provides GitHub clone command
- Explains how to run the sample

### Example 3: Latest API
**You**: "What parameters does addAudio() take?"

**Skill Response**:
- Queries MCP server for latest docs
- Returns API signature
- Notes that `title` is MANDATORY
- Provides code example

## Contributing

Contributions welcome! If you have improvements, additional patterns, or updated samples:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure:
- No duplication of full sample code (link instead)
- Patterns are production-tested
- Documentation is clear and concise

## Related Resources

- **Adobe Express Add-ons**: https://developer.adobe.com/express/add-ons/
- **Official Samples**: https://github.com/AdobeDocs/express-add-on-samples
- **OAuthUtils.js**: https://github.com/AdobeDocs/express-add-on-samples/blob/main/samples/import-images-using-oauth/src/utils/OAuthUtils.js
- **Spectrum Web Components**: https://opensource.adobe.com/spectrum-web-components/
- **Adobe Express MCP Server**: https://www.npmjs.com/package/@adobe/aem-mcp-server-adobe-express

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

**Geoffrey Nwachukwu**  
Created for the Adobe Express developer community.

## Acknowledgments

- Adobe Express team for the excellent documentation and MCP server
- Adobe Express add-on samples repository contributors
- GitHub Copilot Agent Skills community

---

**Made with ❤️ for Adobe Express developers**

If this skill helps you, please ⭐ star the repository and share with other developers!
