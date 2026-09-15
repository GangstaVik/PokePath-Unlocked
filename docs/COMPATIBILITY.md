# Compatibility

PokePath-Unlocked is tested against the following environment.

| Component | Version | Notes |
| --- | --- | --- |
| Game | PokePath TD — oss.pokepath.tech (browser build) | Stores the save under the `localStorage` key `data`. |
| Browser | Chrome / Firefox / Edge (latest) | Chromium-based browsers recommended. |
| Userscript manager | Tampermonkey / Violentmonkey | Latest stable release. |
| Node.js (tests only) | 22 LTS | Run `node tools/test_save.mjs`. No dependencies, no `package.json`. |
| Python (catalog only) | 3.10+ | Run `python tools/extract_catalog.py`. Standard library only. |

## Notes

- The userscript targets the **browser** version of the game; downloadable builds are not supported.
- The script rewrites the raw save stored in `localStorage["data"]` and reloads the page. Back up your save before applying a full reset if you care about it.
- After a reload the game may request `route1-effect.png` and log a 404 for a few seconds — it is cosmetic and does not affect the panel.
- If the game ships a new data set, the catalog may drift: re-run `python tools/extract_catalog.py --refresh` and check the reported counts (181 species, 63 items, 85 eggs, 32 achievements).
- `PokePath-Unlocked.user.js` is assembled from the committed parts (see `README.md` → Structure) and is committed intentionally.
