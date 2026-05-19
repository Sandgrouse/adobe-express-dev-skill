# Adobe Express Skills Collection

Modular Adobe Express skill collection for AI coding assistants.

This repository is a composite of focused skills.
It complements MCP servers instead of duplicating platform documentation.

## Why This Exists

- MCP is excellent at retrieving current documentation.
- Skills are excellent at workflow orchestration, guardrails, and task routing.
- This collection separates concerns so each skill is shorter,
  clearer, and easier to evaluate.

## Install the Skill Collection

From the repository root, you can install all skills at once
or select specific skills.

What works right now (local repository):

- `node install-skills.mjs install`

Dry-run example (recommended first):

- `node install-skills.mjs install --target copilot --dry-run`

Optional flags:

- `--target <host>` where host is one of `copilot`, `cursor`, `windsurf`,
  `continue`, `claude`, `antigravity-global`, `antigravity-workspace`
- `--workspace <path>` required only for `antigravity-workspace`
- `--destination <absolute-path>` to bypass target mapping
- `--skills <csv>` to install selected skills only
- `--dry-run` to preview changes

Planned npm commands (only after package is published):

- `npx @sandgrouse/adobe-express-skills@latest install`
- `npm install -g @sandgrouse/adobe-express-skills &&`
  `adobe-express-skills install`

Current status:

- `@sandgrouse/adobe-express-skills` is defined in `package.json`
  but is not yet published to npm.
- Until publish, use the local `node install-skills.mjs install` command.

Installer source:

- `install-skills.mjs`

## MCP Servers

Use both servers for best results:

- Official Adobe MCP: Adobe Express platform and SDK documentation.
- Community MCP: Spectrum component and UI documentation.

Core MCP setup guidance:

- `skills/adobe-express-core/references/mcp-setup-and-install.md`

## Skills Directory

- `skills/adobe-express-core`: runtime architecture, MCP routing,
  installation strategy.
- `skills/adobe-express-cors-and-backend`: CORS diagnosis and backend policy
  across local, private, and public deployment stages.
- `skills/adobe-express-spectrum-ui-ux`: Spectrum UI and UX patterns.
- `skills/adobe-express-document-manipulation`: document sandbox
  operation planning.
- `skills/adobe-express-oauth-authentication`: OAuth and token lifecycle.
- `skills/adobe-express-monetization`: checkout, webhook,
  entitlement architecture.

Directory index:

- `skills/README.md`

## Shared References

- `references/code-samples.md`
- `references/oauth-implementation.md`
- `references/README.md`

Rule:

- Skill docs should link to references and official Adobe docs
  instead of embedding long implementation code blocks.

## Monolith Migration Note

- The old top-level monolithic `SKILL.md` is being replaced by modular skills
  in `skills/`.
- Consumers should reference individual skill folders directly.

## Add a New Skill

1. Add a folder under `skills/` with `SKILL.md`.
2. Add optional bundled resources only when needed:
   `references/`, `scripts/`, or `assets/`.
3. Add cross-skill handoff notes in the new skill.
4. Link the new folder in this README and in `skills/README.md`.

## Compatibility

Works with skill-capable hosts including GitHub Copilot, Cursor, Windsurf,
Continue, Claude Desktop, and Google Antigravity setups.

Contributions welcome!
If you have improvements, additional patterns, or updated samples:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure:

- No duplication of full sample code (link instead)
- Patterns are production-tested
- Documentation is clear and concise

<!-- markdownlint-disable MD013 -->
## Related Resources

- [Adobe Express Add-ons](https://developer.adobe.com/express/add-ons/)
- [Official Samples](https://github.com/AdobeDocs/express-add-on-samples)
- [OAuthUtils.js](https://github.com/AdobeDocs/express-add-on-samples/blob/main/samples/import-images-using-oauth/src/utils/OAuthUtils.js)
- [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/)
- [Adobe Express MCP Server](https://www.npmjs.com/package/@adobe/express-developer-mcp@latest)
<!-- markdownlint-enable MD013 -->

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

**Geoffrey Nwachukwu**  
Created for the Adobe Express developer community.

## Acknowledgments

- Adobe Express team for the excellent documentation and MCP server
- Adobe Express add-on samples repository contributors
- Anthropic for creating the Agent Skills specification
- Agent Skills community (Cursor, GitHub Copilot, Windsurf, Claude,
  Continue.dev, Google Antigravity users)

---

Made with love for Adobe Express developers.

If this skill helps you, please ⭐ star the repository
and share with other developers.
