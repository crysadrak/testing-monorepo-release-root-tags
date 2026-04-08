# testing-monorepo-release-root-tags

Testing monorepo for validating the release process with root tags using changesets.

## Packages

- `@test-mono/core` — core library
- `@test-mono/cli` — CLI tool (depends on core)

## Release process

```bash
# Add a changeset
npm run changeset

# Prepare release (bumps versions, updates changelogs, syncs root changelog)
npm run release:prepare

# Push release (commits, tags packages + root, pushes)
npm run release:push

# Publish to npm (run via CI on tag push)
npm run release:publish
```
