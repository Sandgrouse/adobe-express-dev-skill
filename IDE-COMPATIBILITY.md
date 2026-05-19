# IDE Compatibility Guide

This repository uses a modular composite skill layout and supports common skill-capable hosts.

## Supported Hosts

- GitHub Copilot (VS Code and compatible setups)
- Cursor
- Windsurf
- Continue
- Claude Desktop
- Google Antigravity (global and workspace modes)

## Recommended Install Path

Use the collection installer instead of manual copy:

- `npx @sandgrouse/adobe-express-skills@latest install`

Optional routing:

- `--target copilot`
- `--target cursor`
- `--target windsurf`
- `--target continue`
- `--target claude`
- `--target antigravity-global`
- `--target antigravity-workspace --workspace <path>`

For details, see:

- `skills/adobe-express-core/references/mcp-setup-and-install.md`

## MCP Compatibility

Use both MCP servers:

- Official Adobe Express MCP for platform and SDK docs.
- Community MCP for Spectrum UI docs.

Core setup reference:

- `skills/adobe-express-core/references/mcp-setup-and-install.md`

## Verification

1. Run installer with `--dry-run` first.
2. Run installer without `--dry-run` for target host.
3. Confirm skill folders appear in host skill directory.
4. Verify MCP servers are configured in host settings.

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
npx -y @adobe/express-developer-mcp@latest

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
