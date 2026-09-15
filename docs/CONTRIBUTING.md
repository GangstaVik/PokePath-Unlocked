# Contributing

Thanks for taking the time to contribute to PokePath-Unlocked.

## Requirements

- **Node.js 22 LTS** — for the tests (`tools/test_save.mjs`). No dependencies, no `package.json`.
- **Python 3.10+** — for catalog extraction (`tools/extract_catalog.py`). Standard library only.
- A GitHub account — contributions land through Pull Requests.

## Build

The userscript is assembled from three committed parts, in this order:

1. `tools/templates/userscript_head.js` — userscript metadata and the pure-section opening marker.
2. `catalog.js` — the generated catalog (species, items, eggs, achievements).
3. `tools/templates/userscript_tail.js` — pure save builders and the panel UI wiring.

There is no build script: the three parts are concatenated and the result is committed as `PokePath-Unlocked.user.js`.

Regenerate the catalog from live game data:

```bash
python tools/extract_catalog.py            # uses tools/.cache/ when present
python tools/extract_catalog.py --refresh  # force a re-download
```

Run the tests:

```bash
node tools/test_save.mjs
```

Expected counts reported by the extractor: **181** species, **63** items, **85** eggs, **32** achievements. The test suite runs **11** checks against the pure save-builder section.

## Automation notes

Two GitHub Actions workflows keep the documentation in sync:

- `.github/workflows/docs-automation.yml` — runs the GitHub Copilot CLI against `.github/prompts/docs-maintainer.prompt.md` on a schedule, opens a Pull Request with the documentation diff, and reverts any change to protected paths (`catalog.js`, `PokePath-Unlocked.user.js`, `tools/`, `.github/workflows/`).
- `.github/workflows/update-changelog.yml` — on a `v*` tag, moves the `[Unreleased]` entries of `CHANGELOG.md` under the new version and restores the `## [Unreleased]` block with its `<!-- auto-filled by CI -->` placeholder.

Never edit `catalog.js` or `PokePath-Unlocked.user.js` by hand: edit the templates and regenerate.

## Notes for maintainers

- The game stores its save under the `localStorage` key `data`; the userscript rewrites that value and reloads the page.
- The reload is guarded by a 500 ms delay to avoid an autosave race.
- After a reload the game may request `route1-effect.png` and log a 404 for a few seconds — this is cosmetic.

## Commit convention

- [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `style:`, `chore:`.
- One logical change per commit.
- English only for commit messages and Pull Requests.

## Pull request

- Base branch: `master`.
- Keep the change focused and reference the files you touched.

## License

By contributing you agree that your contributions are licensed under the [MIT License](https://github.com/GangstaVik/PokePath-Unlocked/blob/master/LICENSE).
