# Vault Copilot Extensions — AI Agent Instructions

## Project overview

This is the **extension catalog and website** for [Vault Copilot](https://github.com/danielshue/obsidian-vault-copilot). It is a Jekyll-based GitHub Pages site that hosts a browsable marketplace of extensions (agents, prompts, skills, voice agents, MCP servers, automations) plus Node.js tooling for catalog management.

- **Site**: `https://danielshue.github.io/vault-copilot-extensions/`
- **Catalog API**: `catalog/catalog.json` (generated, do not edit directly)
- **Azure backend**: Extension metrics/ratings served from Azure Container Apps API

## Architecture

```
extensions/{type}/{name}/     ← Extension source of truth (manifest.json + files)
scripts/*.cjs                 ← Node.js build/validation tooling (CommonJS)
catalog/catalog.json          ← Generated aggregate catalog (build artifact)
_layouts/, _includes/         ← Jekyll templates for the website
assets/css/extensions.css     ← Site stylesheet
features/*.md                 ← Feature marketing pages (Jekyll)
docs/                         ← Authoring & submission guides (Jekyll)
schema/manifest.schema.json   ← JSON Schema for extension manifests
.github/workflows/            ← CI: validate PRs + build/deploy on merge
```

### Data flow

1. Authors create extensions under `extensions/{type}/{name}/` with `manifest.json` + content files
2. `build-catalog.cjs` scans all manifests → validates against schema → outputs `catalog/catalog.json`
3. `generate-extension-pages.cjs` creates Jekyll `index.md` files for each extension
4. Jekyll builds the site; GitHub Actions deploys to Pages
5. The Vault Copilot plugin fetches `catalog.json` at runtime for the in-app marketplace

## Extension structure

Each extension lives in `extensions/{type}/{name}/` where type is one of: `agents`, `voice-agents`, `prompts`, `skills`, `mcp-servers`, `automations`.

Required files per extension:
- `manifest.json` — validated against `schema/manifest.schema.json` (required fields: `id`, `name`, `version`, `type`, `description`, `author`, `files`)
- `README.md` — displayed on the extension detail page
- Type-specific content file (e.g., `*.agent.md`, `*.prompt.md`, `mcp-config.json`)

Extension IDs: lowercase alphanumeric + hyphens only (`^[a-z0-9-]+$`), must be globally unique.

## Developer workflows

```bash
# Build catalog from extension manifests
npm run build:catalog           # → catalog/catalog.json

# Validate a single extension
npm run validate:extension -- extensions/agents/my-agent

# Generate Jekyll pages for extensions
npm run generate:pages

# Remove an extension (interactive, with --dry-run option)
npm run remove:extension -- agent my-agent-id

# Serve site locally (requires Ruby + Bundler)
bundle exec jekyll serve --livereload
```

### CI/CD (GitHub Actions)

- **`validate-pr.yml`**: Runs on PRs touching `extensions/` — validates schemas, checks security patterns, stamps `submittedBy` field from PR author
- **`build-web-and-deploy-ext-catalog.yml`**: On merge to `main` — builds catalog → fetches Azure metrics → generates pages → commits → deploys Jekyll to GitHub Pages

## Conventions

- **Scripts are CommonJS** (`.cjs`): Use `require()`/`module.exports`. Node.js tooling scripts, not bundled.
- **Schema validation**: Uses `ajv` + `ajv-formats`. The canonical schema is `schema/manifest.schema.json`.
- **`catalog/catalog.json` is a build artifact**: Never hand-edit. Regenerate with `npm run build:catalog`.
- **Extension `index.md` files are generated**: Created by `generate-extension-pages.cjs` with Jekyll front matter. Don't hand-edit.
- **`submittedBy` field**: Auto-stamped by CI from the PR author's GitHub username. Only the original submitter can update their extension.

## Security checks (validate-extension.cjs)

The validator scans extension files for dangerous patterns: `eval()`, `Function()`, `<script>` tags, `javascript:` URIs, hardcoded API keys/secrets, `child_process`, and inline event handlers. Errors block the PR; warnings are advisory.

File size limits: 500 KB per file, 2 MB per extension, 1 MB for preview images.

## Key patterns

- **Extension type → folder mapping**: `agent` → `agents/`, `voice-agent` → `voice-agents/`, etc. See `getTypeFolderName()` in `build-catalog.cjs`.
- **Download URLs**: Generated as `https://raw.githubusercontent.com/danielshue/vault-copilot-extensions/main/extensions/{type}/{name}/{file}`.
- **Ratings**: Fetched from GitHub Discussions reactions (GraphQL API, optional `GITHUB_TOKEN`) and Azure API (`fetch-azure-metrics.cjs`).
- **Featured selection**: Scored by explicit `featured: true` flag, rating, recency, and completeness. See `calculateFeaturedScore()`.

## Adding a new extension type

1. Add the type to `EXTENSION_TYPES` array in `build-catalog.cjs` and `validate-extension.cjs`
2. Add the singular form to the `type` enum in `schema/manifest.schema.json`
3. Create the folder under `extensions/`
4. Add file requirements to `REQUIRED_FILES` in `validate-extension.cjs`
5. Update `EXTENSION_TYPES` in `generate-extension-pages.cjs`
