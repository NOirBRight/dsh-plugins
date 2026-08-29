# Contributing

This repository catalogs DSH plugins published by [NOirBRight](https://github.com/NOirBRight). It does not accept unrelated third-party plugin submissions; use [Awesome DSH Plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) for the community-wide directory.

## Update an entry

1. Publish an immutable tag in the plugin repository.
2. Update the matching `catalog/<id>.json` version, tag, full commit SHA, descriptions, compatibility, lifecycle status, and factual disclosure flags.
3. Run `npm run generate`.
4. Run `npm test` and `GITHUB_TOKEN="$(gh auth token)" npm run verify:remote` (or provide another read-only GitHub token).
5. Commit the catalog source and generated files together.

Do not hand-edit `README.md`, `README.zh.md`, or `dist/index.json`. The generator owns them.

Descriptions and catalog data contributed here are released under CC0-1.0. Repository tooling is MIT-licensed.
