# PokePath-Unlocked

[![Release](https://img.shields.io/badge/Release-v1.0.0-blue)](https://github.com/GangstaVik/PokePath-Unlocked/releases)
[![Game](https://img.shields.io/badge/PokePath-TD-purple)](https://oss.pokepath.tech)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A free, open-source userscript that unlocks extra features for the **browser version** of PokePath TD.

## Features

| Feature | Description |
| --- | --- |
| Max Gold | Sets the player gold and `stats.totalGold` to the in-game cap (`99,999,999,999`). |
| Max Stars | Slider (0-900) that rewrites the nine `records` slots, `stars`, `extraGold` and `teamSlots` following the game's own progression. |
| Max Health | Restores all nine party health slots to their maximum (`14`). |
| Shiny Box and Team | Toggle that marks every generated Pokemon (box and team) as shiny. |
| Fill Box | Grants all 181 species at level 100. |
| All Items | Grants all 63 shop items and clears the shop stock. |
| Full Team | Builds the top-team of 10 species at level 100. |
| Unlock Secrets | Enables the five hidden secrets. |
| Unlock All Achievements | Marks all 32 achievements as unlocked. |
| Reset Save | Rebuilds a fresh, fully-unlocked save (keeps the current name and config). |

> The panel groups these actions into collapsible sections (Economy, Collection, Achievements, Reset).

## How to use

1. Install a userscript manager (**Tampermonkey** or **Violentmonkey**).
2. Download [`PokePath-Unlocked.user.js`](PokePath-Unlocked.user.js) from this repository (raw URL) or copy-paste its content into a new userscript.
3. Confirm the installation in the userscript manager.
4. Open [oss.pokepath.tech](https://oss.pokepath.tech) - click the **PokePath Unlocked** floating button in the bottom-right corner to open or close the panel.

> `PokePath-Unlocked.user.js` is assembled from `tools/templates/userscript_head.js`, `catalog.js` and `tools/templates/userscript_tail.js` (in that order) and is committed intentionally. `catalog.js` is generated from live game data by `python tools/extract_catalog.py`.

## Structure

```
tools/
├── extract_catalog.py         — downloads game data, generates catalog.js
├── test_save.mjs              — Node test for the pure save-builder section (11 checks)
├── templates/
│   ├── userscript_head.js     — userscript metadata + pure-section opening marker
│   └── userscript_tail.js     — pure builders + panel UI wiring
catalog.js                     — generated catalog (species, items, eggs, achievements)
PokePath-Unlocked.user.js      — assembled userscript (shipped)
```

Key entry points and files by path: `tools/extract_catalog.py`, `tools/templates/userscript_tail.js`, `catalog.js` (full structure above).

## Compatibility

See [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md) for the tested environment.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for build steps and automation notes.

## Disclaimer

This is a client-side mod: it rewrites the save stored in `localStorage["data"]` and reloads the page. Use it at your own risk and back up your save if you care about it.

## License

[MIT](LICENSE) © 2026 GangstaVik
