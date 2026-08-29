# Contributing

This repository catalogs DSH plugins and the mobile companion published by [NOirBRight](https://github.com/NOirBRight). It does not accept unrelated third-party plugin submissions; use [Awesome DSH Plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) for the community-wide directory.

## Update an entry

1. Publish an immutable tag in the source repository and attach any declared application artifact.
2. Update the matching `catalog/<id>.json` version, kind, tag, full commit SHA, descriptions, compatibility, lifecycle status, factual disclosure flags, and application artifact metadata when applicable.
3. Run `npm run generate`.
4. Run `npm test` and `GITHUB_TOKEN="$(gh auth token)" npm run verify:remote` (or provide another read-only GitHub token).
5. Commit the catalog source and generated files together.

Do not hand-edit `README.md`, `README.zh.md`, or `dist/index.json`. The generator owns them. Product screenshots live in `docs/screenshots/` and are described in `docs/screenshots.json`.

Descriptions and catalog data contributed here are released under CC0-1.0. Repository tooling is MIT-licensed.
