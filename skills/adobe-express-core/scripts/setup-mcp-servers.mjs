#!/usr/bin/env node
import fs from "fs";
import os from "os";
import path from "path";

const MCP_SERVERS = {
  "adobe-express-developer": {
    command: "npx",
    args: ["@adobe/express-developer-mcp@latest", "--yes"]
  }
};

const CONFIG_PATHS = {
  copilot: path.join(os.homedir(), ".copilot", "mcp.json"),
  cursor: path.join(os.homedir(), ".cursor", "mcp.json"),
  windsurf: path.join(os.homedir(), ".windsurf", "mcp.json"),
  continue: path.join(os.homedir(), ".continue", "config.json"),
  claude: path.join(os.homedir(), "Library", "Application Support", "Claude", "claude_desktop_config.json"),
  vscode: path.join(os.homedir(), ".vscode", "mcp.json")
};

function parseArgs(argv) {
  const args = {
    target: null,
    dryRun: false,
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
      if (key === "target") args.target = String(value);
      else if (key === "dry-run") args.dryRun = true;
      else if (key === "help") args.help = true;
    }
  }

  return args;
}

function printHelp() {
  const lines = [
    "Adobe Express MCP Server Setup",
    "",
    "Usage:",
    "  setup-mcp-servers [--target <host>] [--dry-run]",
    "",
    "Targets:",
    "  copilot | cursor | windsurf | continue | claude | vscode | all",
    "",
    "Examples:",
    "  setup-mcp-servers --target copilot",
    "  setup-mcp-servers --target all",
    "  setup-mcp-servers --target cursor --dry-run"
  ];
  console.log(lines.join("\n"));
}

function readConfig(configPath, dryRun) {
  if (dryRun || !fs.existsSync(configPath)) return {};
  try {
    const content = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function writeConfig(configPath, config, dryRun) {
  if (dryRun) return;
  const dir = path.dirname(configPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
}

function setupMcp(configPath, target, dryRun) {
  let config = readConfig(configPath, dryRun);

  // Handle different config formats per IDE
  let mcpServersKey = "mcpServers";
  if (target === "continue") {
    mcpServersKey = "mcpServers";
  } else if (target === "claude") {
    mcpServersKey = "mcpServers";
  } else if (target === "vscode") {
    mcpServersKey = "servers";
  }

  // Ensure structure exists
  if (!config[mcpServersKey]) {
    config[mcpServersKey] = {};
  }

  // Add Adobe Express Developer MCP
  config[mcpServersKey]["adobe-express-developer"] = MCP_SERVERS["adobe-express-developer"];

  if (!dryRun) {
    writeConfig(configPath, config, false);
  }

  return config;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const targets = args.target === "all" ? Object.keys(CONFIG_PATHS) : [args.target || "copilot"];
  const unknown = targets.filter((t) => !CONFIG_PATHS[t]);

  if (unknown.length > 0) {
    console.error(`Unknown targets: ${unknown.join(", ")}`);
    process.exit(1);
  }

  const results = [];
  for (const target of targets) {
    const configPath = CONFIG_PATHS[target];
    try {
      setupMcp(configPath, target, args.dryRun);
      results.push({ target, status: "configured", path: configPath });
    } catch (error) {
      results.push({ target, status: "error", path: configPath, error: error.message });
    }
  }

  const summary = [
    "Adobe Express MCP Server Setup Complete",
    `Mode: ${args.dryRun ? "dry-run" : "write"}`,
    ""
  ];

  for (const result of results) {
    if (result.status === "configured") {
      summary.push(`✓ ${result.target}: ${result.path}`);
    } else {
      summary.push(`✗ ${result.target}: ${result.error}`);
    }
  }

  summary.push("");
  summary.push("Next: Restart your IDE to activate MCP servers.");
  summary.push("Official Adobe Express MCP will provide documentation and type definitions.");

  console.log(summary.join("\n"));
}

main();
