# IDE Compatibility Guide

This skill follows the **Agent Skills specification** and works with multiple AI coding assistants.

## ✅ Confirmed Compatible IDEs

| IDE | Status | Installation Path | Notes |
|-----|--------|------------------|-------|
| **Cursor** | ✅ Fully Compatible | `~/.cursor/skills/` or `~/.continue/skills/` | Most popular choice |
| **GitHub Copilot** | ✅ Fully Compatible | `~/.copilot/skills/` | VS Code & JetBrains |
| **Windsurf** | ✅ Fully Compatible | `~/.windsurf/skills/` | Codeium-based |
| **Claude Code** | ✅ Fully Compatible | `~/Library/Application Support/Claude/skills/` | Anthropic native |
| **Continue.dev** | ✅ Fully Compatible | `~/.continue/skills/` | Open source |

## Installation by IDE

### Cursor

Cursor uses Continue.dev under the hood, so skills go in the Continue directory:

```bash
mkdir -p ~/.continue/skills
cd ~/.continue/skills
git clone https://github.com/YOUR_USERNAME/adobe-express-dev-skill.git adobe-express-dev
```

**MCP Configuration** (`~/Library/Application Support/Cursor/mcp.json` on macOS):
```json
{
  "mcpServers": {
    "adobe-express": {
      "command": "npx",
      "args": ["-y", "@adobe/aem-mcp-server-adobe-express"]
    }
  }
}
```

### GitHub Copilot (VS Code)

```bash
mkdir -p ~/.copilot/skills
cd ~/.copilot/skills
git clone https://github.com/YOUR_USERNAME/adobe-express-dev-skill.git adobe-express-dev
```

**MCP Configuration** (`.vscode/mcp.json` in your workspace):
```json
{
  "mcpServers": {
    "adobe-express": {
      "command": "npx",
      "args": ["-y", "@adobe/aem-mcp-server-adobe-express"]
    }
  }
}
```

### Windsurf (Codeium)

```bash
mkdir -p ~/.windsurf/skills
cd ~/.windsurf/skills
git clone https://github.com/YOUR_USERNAME/adobe-express-dev-skill.git adobe-express-dev
```

**MCP Configuration** (in Windsurf settings):
```json
{
  "mcpServers": {
    "adobe-express": {
      "command": "npx",
      "args": ["-y", "@adobe/aem-mcp-server-adobe-express"]
    }
  }
}
```

### Claude Code (Anthropic)

```bash
# macOS
mkdir -p ~/Library/Application\ Support/Claude/skills
cd ~/Library/Application\ Support/Claude/skills
git clone https://github.com/YOUR_USERNAME/adobe-express-dev-skill.git adobe-express-dev
```

**MCP Configuration** (`~/Library/Application Support/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "adobe-express": {
      "command": "npx",
      "args": ["-y", "@adobe/aem-mcp-server-adobe-express"]
    }
  }
}
```

### Continue.dev

```bash
mkdir -p ~/.continue/skills
cd ~/.continue/skills
git clone https://github.com/YOUR_USERNAME/adobe-express-dev-skill.git adobe-express-dev
```

**MCP Configuration** (in Continue settings):
```json
{
  "mcpServers": {
    "adobe-express": {
      "command": "npx",
      "args": ["-y", "@adobe/aem-mcp-server-adobe-express"]
    }
  }
}
```

## How to Verify Installation

After installing, test the skill:

1. **Open a new file** with Adobe Express-related code or create one
2. **Ask your AI assistant**: "How do I create text in Adobe Express?"
3. **Look for skill activation** - The assistant should reference:
   - MCP server documentation
   - OAuth patterns from the skill
   - Code samples catalog

## Troubleshooting by IDE

### Cursor

**Issue**: Skill not activating  
**Solution**: 
1. Ensure skill is in `~/.continue/skills/adobe-express-dev/`
2. Check `SKILL.md` has proper YAML frontmatter
3. Restart Cursor
4. Try triggering with: "Using Adobe Express add-on skill, how do I..."

### GitHub Copilot

**Issue**: Skill not found  
**Solution**:
1. Verify path: `~/.copilot/skills/adobe-express-dev/`
2. Check skill name in frontmatter matches folder name
3. Reload VS Code window
4. Enable verbose logging in Copilot settings

### Windsurf

**Issue**: MCP server not connecting  
**Solution**:
1. Check Node.js is installed: `node --version` (need 18+)
2. Test MCP server manually: `npx -y @adobe/aem-mcp-server-adobe-express`
3. Verify Windsurf has permission to execute npx

### Claude Code

**Issue**: Skill not loading  
**Solution**:
1. Check path (macOS): `~/Library/Application Support/Claude/skills/`
2. Verify `claude_desktop_config.json` syntax is valid JSON
3. Restart Claude Desktop app
4. Check logs in Claude settings

## Platform-Specific Paths

### macOS
- Cursor: `~/.continue/skills/`
- GitHub Copilot: `~/.copilot/skills/`
- Windsurf: `~/.windsurf/skills/`
- Claude: `~/Library/Application Support/Claude/skills/`

### Windows
- Cursor: `%USERPROFILE%\.continue\skills\`
- GitHub Copilot: `%USERPROFILE%\.copilot\skills\`
- Windsurf: `%USERPROFILE%\.windsurf\skills\`
- Claude: `%APPDATA%\Claude\skills\`

### Linux
- Cursor: `~/.continue/skills/`
- GitHub Copilot: `~/.copilot/skills/`
- Windsurf: `~/.windsurf/skills/`
- Claude: `~/.config/Claude/skills/`

## MCP Server Requirements

All IDEs need:
1. **Node.js 18+** installed
2. **npx** available in PATH
3. **Internet connection** for first MCP server download
4. **Proper MCP configuration** in IDE settings

## Testing MCP Server Manually

To verify the Adobe Express MCP server works:

```bash
# Install and test
npx -y @adobe/aem-mcp-server-adobe-express

# Should start server and show available tools
```

## Common Issues

### "Skill not found"
- Check folder name matches skill name in YAML frontmatter
- Verify SKILL.md has `---` YAML delimiters
- Ensure skill is in correct directory for your IDE

### "MCP server unavailable"
- Test npx command manually
- Check Node.js version (need 18+)
- Verify IDE has permission to execute commands
- Check IDE MCP configuration syntax

### "Skill not activating"
- Try explicit trigger: "Using adobe-express-dev skill..."
- Check trigger keywords in skill description
- Restart IDE after installation
- Verify no syntax errors in SKILL.md

## Getting Help

**General Issues**:
- Agent Skills spec: https://agentskills.io
- GitHub Issues: https://github.com/YOUR_USERNAME/adobe-express-dev-skill/issues

**IDE-Specific**:
- Cursor: https://forum.cursor.sh
- GitHub Copilot: https://github.com/github/copilot-docs
- Windsurf: https://codeium.com/windsurf
- Claude: https://www.anthropic.com/claude

## Updates

To update the skill in any IDE:

```bash
cd /path/to/adobe-express-dev  # adjust for your IDE
git pull
```

Restart your IDE after updating.

## Contributing Platform Support

If you successfully use this skill on another platform:
1. Test installation and activation
2. Document installation path and configuration
3. Submit a PR to update this guide
4. Include any platform-specific quirks

---

**Bottom line**: This skill works with ANY IDE that supports the Agent Skills specification and MCP. Installation is just a matter of putting it in the right directory and configuring the MCP server. 🚀
