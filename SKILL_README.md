# Adobe Express Development Skill

Expert guidance for Adobe Express add-on development with MCP server integration and comprehensive code samples.

## Skill Structure

```
adobe-express-dev/
├── SKILL.md                              # Main skill instructions
├── README.md                             # This file
└── references/
    ├── oauth-implementation.md           # Complete OAuth 2.0 guide
    └── code-samples.md                   # 13 official samples catalog
```

## What's Included

### Main Skill (SKILL.md)
- **8 step-by-step workflows** for common development tasks
- **MCP server integration** for accessing latest Adobe Express documentation
- **Import patterns** and SDK usage guides
- **Two-runtime architecture** explanation
- **Best practices** for add-on development
- **Troubleshooting** common issues

### OAuth Implementation Guide (references/oauth-implementation.md)
- Complete **PKCE flow** implementation
- **OAuthUtils.js** helper module documentation
- Provider configurations for:
  - Dropbox
  - OneDrive (Microsoft)
  - Google Drive
  - Box
- **Token storage** patterns with Client Storage API
- **Login/logout** UI examples
- **Error handling** patterns
- Production-ready code examples

### Code Samples Catalog (references/code-samples.md)
Comprehensive guide to 13 official Adobe Express samples:

**Featured Samples**:
- ⭐ **import-images-using-oauth** - OAuth + cloud storage (includes OAuthUtils.js helper!)
- **use-client-storage** - Data persistence with IndexedDB
- **export-sample** - Export renditions (JPEG, PNG, PDF, MP4)
- **audio-recording-addon** - Media recording and insertion
- **pix** - Advanced canvas-based pixel editor
- Plus 8 more covering React, Vue, Spectrum, and more

**Quick reference by**:
- Feature (OAuth, Import/Export, Drag-and-drop, Storage, UI, Media)
- Framework (React, Vue, Vanilla JS)
- Difficulty level (Beginner, Intermediate, Advanced)

## When This Skill Activates

GitHub Copilot will use this skill when you:
- Mention "Adobe Express", "add-on", "express-document-sdk"
- Work with document sandbox or iframe runtime
- Implement OAuth authentication
- Use Spectrum Web Components
- Ask about Adobe Express APIs or development patterns
- Need to access Adobe Express documentation

## Key Features

✅ **MCP Server Integration** - Uses Adobe Express MCP server for latest docs  
✅ **OAuth Ready** - Complete OAuth 2.0 implementation guide  
✅ **13 Code Samples** - Official examples with detailed descriptions  
✅ **OAuthUtils.js** - Reusable OAuth helper module reference  
✅ **Production Patterns** - Real-world implementation examples  
✅ **Multi-Provider** - Dropbox, OneDrive, Google Drive, Box configs  
✅ **Framework Support** - React, Vue, vanilla JavaScript examples  

## Quick Start

### To implement OAuth:
1. Read `references/oauth-implementation.md`
2. Copy OAuthUtils.js from [import-images-using-oauth sample](https://github.com/AdobeDocs/express-add-on-samples/blob/main/samples/import-images-using-oauth/src/utils/OAuthUtils.js)
3. Follow provider setup instructions
4. Use code examples for your provider (Dropbox, OneDrive, etc.)

### To find code examples:
1. Read `references/code-samples.md`
2. Identify relevant sample by feature or framework
3. Clone: `git clone https://github.com/AdobeDocs/express-add-on-samples.git`
4. Navigate to sample and run: `npm install && npm run build && npm run start`

### To access latest API docs:
Ask the AI agent - it will use the MCP server to fetch current documentation.

## Essential External Resources

- **Samples Repository**: https://github.com/AdobeDocs/express-add-on-samples
- **OAuthUtils.js**: https://github.com/AdobeDocs/express-add-on-samples/blob/main/samples/import-images-using-oauth/src/utils/OAuthUtils.js
- **Adobe Express Docs**: https://developer.adobe.com/express/add-ons/
- **Spectrum Web Components**: https://opensource.adobe.com/spectrum-web-components/

## Updates

This skill uses the Adobe Express MCP server, which provides up-to-date documentation. The reference files include stable patterns and official code samples that are maintained by Adobe.

**Last Updated**: February 2026
