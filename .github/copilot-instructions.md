# GitHub Copilot Instructions

Repository-wide rules for the GitHub Copilot CLI.

## General

- English only: documentation, commit messages, pull requests. The userscript internals (`tools/templates/*`) still contain Italian strings from earlier commits and are aligned progressively.
- Never touch the following paths: `catalog.js`, `PokePath-Unlocked.user.js`, `tools/`, `.github/workflows/`.
- Never push to `master`, never force-push, never run `git rebase`.

## Documentation

- Keep `README.md`, `CHANGELOG.md` and all files under `docs/` coherent with each other.
- Keep the **features table** in `README.md` in sync with the panel actions wired in `tools/templates/userscript_tail.js`: Economy (`Max Gold`, `Apply Stars`, `Max Health`), Collection (`Shiny` toggle, `Fill Box`, `All Items`, `Full Team`, `Unlock Secrets`), Achievements (`Unlock All`), Reset (`Reset Save`).
- Keep `CHANGELOG.md` sorted: newest release on top, below the `[Unreleased]` block.
- The `## [Unreleased]` heading and the `<!-- auto-filled by CI -->` placeholder must always be the first block of `CHANGELOG.md`.
- Do not invent versions, dates, commit hashes or features. Only use data already present in the repository history and in the userscript.
- Do not document features that are not present in the userscript (you may read `tools/` — you may not modify it).

## Build output

- `PokePath-Unlocked.user.js` is **assembled** from `tools/templates/userscript_head.js`, `catalog.js` and `tools/templates/userscript_tail.js` (in that order) and is committed intentionally. Never edit it directly — edit the templates instead.
- `catalog.js` is **generated** by `python tools/extract_catalog.py` from the live game data. Never edit it directly.
