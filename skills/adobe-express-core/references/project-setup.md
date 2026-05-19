# Project Setup Guide

This reference compares two approaches to setting up your Adobe Express add-on project and guides you in choosing the right path.

## Official Adobe CLI vs Bolt Express

Both tools create production-ready add-on projects, but they offer different developer experiences.

| Feature | Adobe CLI | Bolt Express |
|---------|-----------|--------------|
| **Setup Speed** | ~2 minutes | ~2 minutes |
| **Official Support** | ✓ Adobe-supported | Community-supported |
| **Framework Options** | JavaScript, React, Vue, Svelte | Svelte, React, Vue |
| **Hot Reloading** | ✗ (page refresh required) | ✓ (lightning-fast live reload) |
| **TypeScript Support** | ✓ (requires setup) | ✓ (built-in, fully configured) |
| **Type-Safe Messaging** | Manual setup required | ✓ (automatic between UI/sandbox) |
| **Build Tool** | Webpack | Vite (faster builds) |
| **GitHub Actions** | Manual setup | ✓ (included) |
| **Production Ready** | ✓ | ✓ |

## Choice Guide

### Use Official Adobe CLI if:
- You prefer official Adobe support and documentation
- Your team is familiar with standard JavaScript/React tooling
- You want the most straightforward path without additional learning
- You don't need hot reloading during development

### Use Bolt Express if:
- You want **fast development cycles** with hot reloading
- You value **TypeScript support** out of the box
- You prefer **less configuration** and opinionated defaults
- You want **type-safe communication** between UI and sandbox automatically
- You plan to **release via GitHub Actions**
- Community support through Discord is acceptable

## Official Adobe CLI Setup

### Prerequisites
- Node.js 18 or higher

### Create a New Project

```bash
npx @adobe/create-ccweb-add-on my-addon
```

The CLI will prompt you to choose:
- **Project name**
- **Framework**: Vanilla JavaScript, React, Vue, or Svelte
- **Templates**: With or without document sandbox

Choose based on your comfort with the framework, not the specific template. All templates are equally valid.

### Install & Start Development

```bash
cd my-addon
npm install
npm run build
npm run start
```

Your project will be available at the local dev server URL. Load it in Adobe Express via the development panel.

### Project Structure

```
my-addon/
├── manifest.json          # Configuration (auto-generated)
├── package.json          # Dependencies
├── index.html            # Entry point
├── src/                  # Frontend UI code
│   └── index.jsx         # (or .js, .svelte, .vue)
├── src-code/             # Document sandbox (optional)
│   └── code.js
└── dist/                 # Build output
```

## Bolt Express Setup

### Prerequisites
- Node.js 18 or higher
- One of: npm, yarn, or pnpm

### Create a New Project

```bash
# Using npm
npx create-bolt-express@latest

# Using yarn
yarn create bolt-express

# Using pnpm
pnpm create bolt-express
```

Follow the CLI prompts to choose your framework: **Svelte, React, or Vue**.

### Install & Start Development

```bash
cd your-project-name
npm install        # (or yarn / pnpm i)
npm run build      # Must run before dev first time
npm run cert       # One-time cert setup
npm run dev        # Start with hot reloading
```

**Important**: On first `dev`, you'll be prompted to create a development certificate:
- **Windows**: Click OK on popup dialog
- **macOS**: Enter your machine password in the CLI

### Project Structure

```
your-project-name/
├── express.config.ts     # Configuration (type-safe)
├── package.json          # Dependencies
├── vite.config.ts        # Vite build config
├── src/
│   ├── main.jsx          # (or .svelte, .vue) - Frontend UI
│   └── utils/
│       └── utils.ts      # Sandbox communication helpers
├── src-code/
│   └── code.ts           # Document sandbox operations
└── dist/                 # Build output
```

### Key Bolt Express Features

**Type-Safe Messaging**: Bolt Express automatically generates type definitions for function calls between UI and sandbox:

Frontend UI calls sandbox method:
```typescript
import { sandbox } from "./utils/utils";

const result = await sandbox.myFunction("hello", 400);
```

Backend sandbox exposes the method:
```typescript
// src-code/code.ts
const sandboxApi = {
  myFunction: (a: string, b: number) => {
    return true;
  }
};
```

**Hot Reloading**: Changes to frontend code reload instantly in the browser without manual refresh—dramatically faster development.

**GitHub Actions Ready**: Bolt Express includes workflows to build and release your add-on as a zip archive automatically.

## Switching Between Paths

You can start with one path and switch later:

- **Adobe CLI → Bolt Express**: Copy your `src/` and `src-code/` folders into a new Bolt Express project
- **Bolt Express → Adobe CLI**: Copy your `src/` and `src-code/` folders into a new Adobe CLI project

Both use the same underlying Express add-on SDK, so the code is compatible.

## Next Steps

1. **Choose your tool** based on the comparison above
2. **Create your project** using the setup steps
3. **Configure MCP servers** (see [MCP Setup](mcp-setup-and-install.md))
4. **Start building** your UI with Spectrum Web Components (see adobe-express-spectrum-ui-ux skill)
5. **Add document operations** if needed (see adobe-express-document-manipulation skill)

## Support & Community

**Adobe CLI**:
- Official documentation: https://developer.adobe.com/express/add-ons/docs/guides/getting-started/local-development/dev-tooling

**Bolt Express**:
- GitHub repository: https://github.com/hyperbrew/bolt-express
- Discord community: https://discord.gg/PC3EvvuRbc
- Issues & discussions: https://github.com/hyperbrew/bolt-express/issues
