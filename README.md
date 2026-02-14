# Vault Copilot Extensions

Official extension catalog for [Vault Copilot](https://github.com/danielshue/obsidian-vault-copilot) — discover and install agents, prompts, skills, voice agents, MCP servers, and automations to supercharge your Obsidian vault.

## Browse Extensions

Visit the [Extension Marketplace](https://danielshue.github.io/vault-copilot-extensions/catalog/) to browse, search, and discover extensions.

## Contributing

We welcome community contributions! See the [Authoring Guide](docs/AUTHORING.md) for how to create extensions and the [Submission Guide](docs/EXTENSION_SUBMISSION.md) for how to submit them.

### Quick Start

1. Fork this repository
2. Create a folder at `extensions/{type}/{your-extension-name}/`
3. Add required files: `manifest.json`, `README.md`, and your extension file
4. Submit a PR — automated checks will validate your submission

## Development

```bash
# Build the catalog
npm run build:catalog

# Validate an extension
npm run validate:extension -- extensions/agents/my-extension

# Generate Jekyll pages
npm run generate:pages

# Serve Jekyll site locally
bundle exec jekyll serve --livereload
# Visit http://localhost:4000/vault-copilot-extensions
```

## License

MIT
