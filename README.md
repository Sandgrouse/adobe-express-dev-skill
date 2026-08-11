# Adobe Express Skills Collection

Modular Adobe Express skill collection for AI coding assistants.

This repository provides modular, task-focused workflow orchestration, guardrails, and implementation patterns for Adobe Express add-on development. It works alongside official and community MCP servers to give AI assistants accurate context and step-by-step guidance.

---

<a id="quick-navigation"></a>

## 📍 Quick Navigation

Jump directly to installation examples and platform setups:

- [Available Skills](#available-skills)
- [Installation Quick Reference](#installation-quick-reference)
- **Platform Copy-Paste Examples & Setup:**

  - <img src="assets/logos/copilot.jpeg" width="16" height="16" /> [GitHub Copilot](#copilot)
  - <img src="assets/logos/cursor.jpeg" width="16" height="16" /> [Cursor](#cursor)
  - <img src="assets/logos/claude.jpeg" width="16" height="16" /> [Claude](#claude)
  - <img src="assets/logos/antigravity.png" width="16" height="16" /> [Antigravity (Workspace-Scoped)](#antigravity-workspace)
  - <img src="assets/logos/antigravity.png" width="16" height="16" /> [Antigravity (Global)](#antigravity-global)
  - <img src="assets/logos/windsurf.jpeg" width="16" height="16" /> [Windsurf](#windsurf)
  - 📁 [Custom Directory](#custom-destination)
  - ⚠️ [Continue (Deprecated)](#continue)
- [MCP Servers Integration](#mcp-servers-integration)
- 📋 [TODOs & Roadmap](#todos-and-roadmap)
- [Development & Adding New Skills](#development--adding-new-skills)

---

<a id="available-skills"></a>

## Available Skills

Use these exact folder names when installing a subset of skills via the `--skills` flag:

| Skill Directory | Description |
| :--- | :--- |
| `adobe-express-core` | Runtime architecture (iframe vs sandbox), MCP setup, project initialization, and manifest config. |
| `adobe-express-cors-and-backend` | CORS error diagnosis, preflight checks, backend origin policies, and network call scoping. |
| `adobe-express-spectrum-ui-ux` | Spectrum UI/UX component selection (SWC, React Spectrum), theme setup, and layout design. |
| `adobe-express-document-manipulation` | Express Document SDK operations, shape/text/media insertion, and sandbox command execution. |
| `adobe-express-oauth-authentication` | OAuth 2.0 flows, token storage, credential management, and cloud service integration. |
| `adobe-express-monetization` | Subscription tier design, checkout integration, webhook verification, and entitlement checks. |

[⬆ Back to Quick Navigation](#quick-navigation)

---

<a id="installation-quick-reference"></a>

## Installation Quick Reference

### Command Syntax

Until the package is published to npm, run commands using the local script from the repository root:

```bash
node install-skills.mjs install [flags]
```

*(Once published to npm, you will also be able to run `npx @sandgrouse/adobe-express-skills@latest install [flags]`)*

### Available Installer Flags

| Flag | Argument | Description | Example |
| :--- | :--- | :--- | :--- |
| `--target` | `<host>` | Host environment (`antigravity-workspace`, `antigravity-global`, `copilot`, `cursor`, `windsurf`, `claude`, `continue`) | `--target antigravity-workspace` |
| `--workspace` | `<path>` | **Required** when using `--target antigravity-workspace`. Base path to project. | `--workspace "/Users/YOUR_USERNAME/Documents/my-express-addon"` |
| `--destination` | `<path>` | Absolute destination path (bypasses `--target` mapping). | `--destination "/Users/YOUR_USERNAME/Documents/custom-skills"` |
| `--skills` | `<csv>` | Comma-separated list of specific skills to install. | `--skills adobe-express-core,adobe-express-spectrum-ui-ux` |
| `--dry-run` | *(none)* | Preview file actions without writing to disk. | `--dry-run` |
| `--help` | *(none)* | Print installer help message. | `--help` |

[⬆ Back to Quick Navigation](#quick-navigation)

---

## Host-Specific Setup & Copy-Paste Code Examples

Select your AI platform below for target-specific copy-paste commands and target destination details.

---

<a id="antigravity-workspace"></a>

### 1. <img src="assets/logos/antigravity.png" width="22" height="22" /> Google Antigravity (Project-Scoped)

- **Target Identifier:** `antigravity-workspace`
- **Destination Path:** `<workspace_path>/.agent/skills/`
- **Description:** Installs skills directly into your specific local project directory. Required flag: `--workspace <path>`.

#### Copy-Paste Examples

##### A. Install ALL Skills to Your Workspace

```bash
node install-skills.mjs install --target antigravity-workspace --workspace "/Users/YOUR_USERNAME/Documents/my-express-addon"
```

*(npm version once published: `npx @sandgrouse/adobe-express-skills@latest install --target antigravity-workspace --workspace "/Users/YOUR_USERNAME/Documents/my-express-addon"`)*

##### B. Selective Skill Install (e.g. Core & UI/UX only)

```bash
node install-skills.mjs install --target antigravity-workspace --workspace "/Users/YOUR_USERNAME/Documents/my-express-addon" --skills adobe-express-core,adobe-express-spectrum-ui-ux
```

##### C. Dry-Run Preview (No files written)

```bash
node install-skills.mjs install --target antigravity-workspace --workspace "/Users/YOUR_USERNAME/Documents/my-express-addon" --dry-run
```

[⬆ Back to Quick Navigation](#quick-navigation)

---

<a id="antigravity-global"></a>

### 2. <img src="assets/logos/antigravity.png" width="22" height="22" /> Google Antigravity (Global)

- **Target Identifier:** `antigravity-global`
- **Destination Path:** `~/.gemini/antigravity/global_skills/`
- **Description:** Installs skills globally so they are available across all Antigravity workspace projects.

#### Copy-Paste Examples

##### A. Install ALL Skills Globally

```bash
node install-skills.mjs install --target antigravity-global
```

##### B. Selective Skill Install (e.g. Document Manipulation & OAuth)

```bash
node install-skills.mjs install --target antigravity-global --skills adobe-express-document-manipulation,adobe-express-oauth-authentication
```

##### C. Dry-Run Preview

```bash
node install-skills.mjs install --target antigravity-global --dry-run
```

[⬆ Back to Quick Navigation](#quick-navigation)

---

<a id="copilot"></a>

### 3. <img src="assets/logos/copilot.jpeg" width="22" height="22" /> GitHub Copilot

- **Target Identifier:** `copilot` *(Default target if `--target` is omitted)*
- **Destination Path:** `~/.copilot/skills/`
- **Description:** Installs skills into GitHub Copilot's user skill folder.

#### Copy-Paste Examples

##### A. Install ALL Skills

```bash
node install-skills.mjs install --target copilot
```

##### B. Selective Skill Install

```bash
node install-skills.mjs install --target copilot --skills adobe-express-core,adobe-express-cors-and-backend
```

##### C. Dry-Run Preview

```bash
node install-skills.mjs install --target copilot --dry-run
```

[⬆ Back to Quick Navigation](#quick-navigation)

---

<a id="cursor"></a>

### 4. <img src="assets/logos/cursor.jpeg" width="22" height="22" /> Cursor

- **Target Identifier:** `cursor`
- **Destination Path:** `~/.cursor/skills/`
- **Description:** Installs skills into Cursor's central skill directory.

#### Copy-Paste Examples

##### A. Install ALL Skills

```bash
node install-skills.mjs install --target cursor
```

##### B. Selective Skill Install

```bash
node install-skills.mjs install --target cursor --skills adobe-express-core,adobe-express-monetization
```

##### C. Dry-Run Preview

```bash
node install-skills.mjs install --target cursor --dry-run
```

[⬆ Back to Quick Navigation](#quick-navigation)

---

<a id="windsurf"></a>

### 5. <img src="assets/logos/windsurf.jpeg" width="22" height="22" /> Windsurf

- **Target Identifier:** `windsurf`
- **Destination Path:** `~/.windsurf/skills/`
- **Description:** Installs skills into Windsurf IDE skill storage.

#### Copy-Paste Examples

##### A. Install ALL Skills

```bash
node install-skills.mjs install --target windsurf
```

##### B. Selective Skill Install

```bash
node install-skills.mjs install --target windsurf --skills adobe-express-core,adobe-express-spectrum-ui-ux
```

##### C. Dry-Run Preview

```bash
node install-skills.mjs install --target windsurf --dry-run
```

[⬆ Back to Quick Navigation](#quick-navigation)

---

<a id="claude"></a>

### 6. <img src="assets/logos/claude.jpeg" width="22" height="22" /> Claude

- **Target Identifier:** `claude`
- **Destination Path:** `~/Library/Application Support/Claude/skills/`
- **Description:** Installs skills into Claude's local desktop application storage.

#### Copy-Paste Examples

##### A. Install ALL Skills

```bash
node install-skills.mjs install --target claude
```

##### B. Selective Skill Install

```bash
node install-skills.mjs install --target claude --skills adobe-express-core,adobe-express-document-manipulation
```

##### C. Dry-Run Preview

```bash
node install-skills.mjs install --target claude --dry-run
```

[⬆ Back to Quick Navigation](#quick-navigation)

---

<a id="custom-destination"></a>

### 7. 📁 Custom Destination Directory

- **Flag Used:** `--destination <absolute-path>`
- **Description:** Installs skills directly into any folder of your choice, overriding default host target mapping.

#### Copy-Paste Examples

##### A. Install ALL Skills to Custom Path

```bash
node install-skills.mjs install --destination "/Users/YOUR_USERNAME/Documents/my-custom-skills-folder"
```

##### B. Selective Skill Install to Custom Path

```bash
node install-skills.mjs install --destination "/Users/YOUR_USERNAME/Documents/my-custom-skills-folder" --skills adobe-express-core,adobe-express-spectrum-ui-ux
```

##### C. Custom Path Dry-Run Preview

```bash
node install-skills.mjs install --destination "/Users/YOUR_USERNAME/Documents/my-custom-skills-folder" --dry-run
```

[⬆ Back to Quick Navigation](#quick-navigation)

---

<a id="continue"></a>

### 8. <img src="assets/logos/continue.svg" width="22" height="22" /> Continue.dev *(Deprecated)*

> [!WARNING]
> **Deprecation Notice:** Continue.dev support is deprecated and scheduled for removal from `install-skills.mjs` in a future release.

- **Target Identifier:** `continue`
- **Destination Path:** `~/.continue/skills/`
- **Description:** Installs skills into Continue.dev skill storage.

#### Copy-Paste Examples

##### A. Install ALL Skills

```bash
node install-skills.mjs install --target continue
```

##### B. Selective Skill Install

```bash
node install-skills.mjs install --target continue --skills adobe-express-core,adobe-express-oauth-authentication
```

##### C. Dry-Run Preview

```bash
node install-skills.mjs install --target continue --dry-run
```

[⬆ Back to Quick Navigation](#quick-navigation)

---

<a id="mcp-servers-integration"></a>

## MCP Servers Integration

Skills complement MCP servers for full IDE capabilities. Use both servers:

1. **Official Adobe Express MCP Server:** Provides official API definitions, SDK contracts, and reference docs.
   - Package: `@adobe/express-developer-mcp@latest`
2. **Community Spectrum MCP Server:** Component schemas, Spectrum Web Components guidelines, and UI patterns.

Detailed MCP setup guide: [skills/adobe-express-core/references/mcp-setup-and-install.md](skills/adobe-express-core/references/mcp-setup-and-install.md)

[⬆ Back to Quick Navigation](#quick-navigation)

---

<a id="todos-and-roadmap"></a>

## 📋 TODOs & Roadmap

- [ ] **Deprecate Continue.dev Target:** Remove `continue` target mapping (`~/.continue/skills`) and CLI flags from `install-skills.mjs`.
- [ ] **Clean Up References:** Remove Continue.dev setup documentation and references across all modular skill documentation once deprecated.

[⬆ Back to Quick Navigation](#quick-navigation)

---

<a id="development--adding-new-skills"></a>

## Development & Adding New Skills

To add a new skill to this collection:

1. Create a directory under `skills/` containing a `SKILL.md` file.
2. Structure the skill with frontmatter (`name` and `description`).
3. Add optional supporting directories if required: `references/`, `scripts/`, or `assets/`.
4. Register the new folder name in `install-skills.mjs` (`SKILL_FOLDERS` array).
5. Update [Available Skills](#available-skills) in this README and in [skills/README.md](skills/README.md).

[⬆ Back to Quick Navigation](#quick-navigation)

---

## Related Resources

- [Adobe Express Add-ons Developer Docs](https://developer.adobe.com/express/add-ons/)
- [Official Adobe Express Add-on Samples Repository](https://github.com/AdobeDocs/express-add-on-samples)
- [Spectrum Web Components Documentation](https://opensource.adobe.com/spectrum-web-components/)
- [Adobe Express Developer MCP Server](https://www.npmjs.com/package/@adobe/express-developer-mcp)

---

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

**Geoffrey Nwachukwu**  
Created for the Adobe Express developer community.
