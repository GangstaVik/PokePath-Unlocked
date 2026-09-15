# Changelog

All notable changes to this project are documented in this file.

## [1.0.0] - 2026-09-14

### Added

- Full unlock userscript for [PokéPath TD](https://oss.pokepath.tech/): buttons + panel (accent `#1E90FF`) injected on page load.
- **Max Gold** — sets gold to 99,999,999,999 (game cap) and aligns `stats.totalGold`.
- **Max Stars** — records `[100 × 9]`, stars 900, `teamSlots` 10, `extraGold` 131.
- **Fill Box** — 181 species (final forms) at level 100, preserving team and teamManager integrity.
- **Full Team** — 10-mon team (Charizard, Sceptile, Greninja, Gengar, Alakazam, Gyarados, Aegislash, Inteleon, Volcarona, Gardevoir).
- **All Items** — 63 items with sprite slugs, empties shop egg list.
- **Achievements** — 32/32 badges + `achievementProgress.count` 32; **Secrets** — cacnea, greavard, stakataka, luvdisc, chatot.
- **Reset Save** — nuke current save (gold 50, 85 eggs) with confirmation dialog, then apply full unlock.
- Generated catalog layer (`catalog.js`): 181 species, 63 items, 85 eggs, 32 achievements — extracted from the live game JS, never hand-hardcoded.
- Deterministic build pipeline: `tools/extract_catalog.py` + `tools/test_save.mjs` (11/11 checks) + assembler templates.

### Fixed

- Autosave race: game `saveData` calls (endWave, buyEgg, changeMap, restart) could overwrite the cheat save during the 8s reload window — reload reduced to 500ms with `reloading` guard (no double-click, no re-entry).
- Mixed-invalid saves (legacy/corrupted `stats`): full unlock now deep-guards with 17 default fields (`ensureStats`), mutator wrapped in try/catch — invalid saves show an error banner, apply nothing.
- Reset never runs without explicit `window.confirm`.
- Invariant safety: `forceStarCount` recomputes stars from records, `teamManager` reset when box/team rewritten (no orphan refs → no `importTeam` crash).

### Security

- Modifies only `localStorage["data"]` (client-side); no network, no `GM_*` permissions (`@grant none`).