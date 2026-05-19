#!/usr/bin/env node
import fs from "fs";
import os from "os";
import path from "path";

const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const SKILLS_SOURCE = path.join(REPO_ROOT, "skills");
const SKILL_FOLDERS = [
  "adobe-express-core",
  "adobe-express-spectrum-ui-ux",
  "adobe-express-document-manipulation",
  "adobe-express-oauth-authentication",
  "adobe-express-monetization"
];

const TARGET_MAP = {
  copilot: path.join(os.homedir(), ".copilot", "skills"),
  cursor: path.join(os.homedir(), ".cursor", "skills"),
  windsurf: path.join(os.homedir(), ".windsurf", "skills"),
  continue: path.join(os.homedir(), ".continue", "skills"),
  claude: path.join(os.homedir(), "Library", "Application Support", "Claude", "skills"),
  "antigravity-global": path.join(os.homedir(), ".gemini", "antigravity", "global_skills")
};

function parseArgs(argv) {
  const args = {
    command: "install",
    dryRun: false,
    target: null,
    destination: null,
    skills: null,
    workspace: null,
    help: false
  };

  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
      if (key === "dry-run") args.dryRun = true;
      else if (key === "target") args.target = String(value);
      else if (key === "destination") args.destination = String(value);
      else if (key === "skills") args.skills = String(value).split(",").map((s) => s.trim()).filter(Boolean);
      else if (key === "workspace") args.workspace = String(value);
      else if (key === "help") args.help = true;
    } else {
      positional.push(token);
    }
  }

  if (positional[0]) args.command = positional[0];
  return args;
}

function printHelp() {
  const lines = [
    "adobe-express-skills installer",
    "",
    "Usage:",
    "  adobe-express-skills install [--target <host>] [--destination <path>] [--skills <csv>] [--dry-run]",
    "",
    "Targets:",
    "  copilot | cursor | windsurf | continue | claude | antigravity-global | antigravity-workspace",
    "",
    "Examples:",
    "  adobe-express-skills install --target copilot",
    "  adobe-express-skills install --target antigravity-workspace --workspace /path/to/project",
    "  adobe-express-skills install --destination /tmp/skills --skills adobe-express-core,adobe-express-monetization"
  ];
  console.log(lines.join("\n"));
}

function resolveDestination(args) {
  if (args.destination) return path.resolve(args.destination);

  if (args.target === "antigravity-workspace") {
    if (!args.workspace) {
      throw new Error("--workspace is required for antigravity-workspace target");
    }
    return path.join(path.resolve(args.workspace), ".agent", "skills");
  }

  if (args.target && TARGET_MAP[args.target]) {
    return TARGET_MAP[args.target];
  }

  return TARGET_MAP.copilot;
}

function ensureDir(dirPath, dryRun) {
  if (dryRun) return;
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDir(source, destination, dryRun) {
  if (dryRun) return;
  fs.cpSync(source, destination, { recursive: true, force: true });
}

function backupIfExists(targetPath, dryRun) {
  if (!fs.existsSync(targetPath)) return null;
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = `${targetPath}.backup-${stamp}`;
  if (!dryRun) {
    fs.renameSync(targetPath, backupPath);
  }
  return backupPath;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.command !== "install") {
    printHelp();
    process.exit(0);
  }

  const destinationRoot = resolveDestination(args);
  const requestedSkills = args.skills || SKILL_FOLDERS;
  const unknown = requestedSkills.filter((s) => !SKILL_FOLDERS.includes(s));
  if (unknown.length > 0) {
    throw new Error(`Unknown skill folders: ${unknown.join(", ")}`);
  }

  const backups = [];
  ensureDir(destinationRoot, args.dryRun);

  for (const folder of requestedSkills) {
    const source = path.join(SKILLS_SOURCE, folder);
    const target = path.join(destinationRoot, folder);
    if (!fs.existsSync(source)) {
      throw new Error(`Missing source skill folder: ${source}`);
    }
    const backup = backupIfExists(target, args.dryRun);
    if (backup) backups.push({ folder, backup });
    copyDir(source, target, args.dryRun);
  }

  const summary = [
    "Adobe Express composite skills install complete.",
    `Mode: ${args.dryRun ? "dry-run" : "write"}`,
    `Destination: ${destinationRoot}`,
    `Installed skills: ${requestedSkills.join(", ")}`,
    backups.length > 0 ? `Backups created: ${backups.length}` : "Backups created: 0",
    "Next: configure official and community MCP servers in your host IDE."
  ];

  console.log(summary.join("\n"));
  if (backups.length > 0) {
    for (const item of backups) {
      console.log(`- ${item.folder}: ${item.backup}`);
    }
  }
}

main();
