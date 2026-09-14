// --- Builder puri: costruiscono il save così come lo serializza il gioco. ---

const DEFAULT_CONFIG = {
    scale: 1,
    language: 0,
    audio: { master: 10, music: 4, ui: 10, effects: 10 },
    showDamage: true,
    showRoute: 0,
    autoReset: 0,
    autoStop: 0,
    autoStopBoss: 0,
    displayHealth: 0,
    showTC: 0,
};

function recordsFor(targetStars) {
    // 9 slot (come save.player.records); ogni slot al massimo 100.
    const slots = new Array(9).fill(0);
    let rest = Math.max(0, Math.min(MAX_STARS, targetStars));
    for (let i = 0; i < 9 && rest > 0; i++) {
        slots[i] = Math.min(100, rest);
        rest -= slots[i];
    }
    return slots;
}

// Entry identica a Pokemon.getOriginalData(): le chiavi undefined
// (targetMode/adn/item/alias) spariscono in JSON.stringify, come nei save reali.
function pokemonEntry(specieKey, isShiny) {
    return {
        specieKey: specieKey,
        lvl: 100,
        targetMode: undefined,
        favorite: false,
        item: undefined,
        alias: undefined,
        isShiny: !!isShiny,
        hideShiny: false,
    };
}

function buildBox(isShiny) {
    return SPECIES_KEYS.map((key) => pokemonEntry(key, isShiny));
}

function buildTeam(isShiny) {
    return TOP_TEAM.map((key) => pokemonEntry(key, isShiny));
}

function buildItems() {
    return ITEM_LIST.map((item) => ({ id: item.id, sprite: item.sprite }));
}

function buildAchievements() {
    return ACHIEVEMENTS.map((a) => ({ description: a.description, status: true, image: a.image }));
}

function teamSlotsFor(stars) {
    // Stessa progressione di forceStarCount in Player.js.
    if (stars >= 540) return 10;
    if (stars >= 320) return 9;
    if (stars >= 160) return 8;
    if (stars >= 40) return 7;
    return 6;
}

/**
 * buildSave(opts) → { config, save }
 * Rigenera l'intera struttura dati del gioco (chiave localStorage "data").
 * Di default il save è completamente sbloccato; ogni flag disattiva il ramo.
 *
 * opts: {
 *   name:         string (default 'Player'),
 *   stars:        number 0..MAX_STARS (default MAX_STARS),
 *   gold:         bool   (default true),
 *   box:          bool   (default true),
 *   items:        bool   (default true),
 *   achievements: bool   (default true),
 *   team:         bool   (default true),
 *   maxHealth:    bool   (default true),
 *   secrets:      bool   (default true),
 *   shiny:        bool   (default false),
 * }
 */
function buildSave(opts) {
    const o = opts || {};
    const stars = Math.max(0, Math.min(MAX_STARS, Number.isFinite(o.stars) ? o.stars : MAX_STARS));
    const gold = o.gold !== false;
    const box = o.box !== false;
    const items = o.items !== false;
    const achievements = o.achievements !== false;
    const team = o.team !== false;
    const maxHealth = o.maxHealth !== false;
    const secrets = o.secrets !== false;
    const shiny = !!o.shiny;

    const config = Object.assign({}, DEFAULT_CONFIG);
    const save = {
        new: false,
        player: {
            name: o.name || 'Player',
            update: 1,
            portrait: 0,
            gold: gold ? MAX_GOLD : 50,
            health: maxHealth
                ? [14, 14, 14, 14, 14, 14, 14, 14, 14]
                : [11, 11, 11, 11, 11, 11, 11, 11, 11],
            records: recordsFor(stars),
            stars: stars,
            extraGold: stars === MAX_STARS ? EXTRA_GOLD_AT_900 : 0,
            teamSlots: Math.max(6, teamSlotsFor(stars)),
            achievements: achievements
                ? buildAchievements()
                : ACHIEVEMENTS.map((a) => ({ description: a.description, status: false, image: a.image })),
            achievementProgress: {
                delibirdCount: 0,
                evolutionCount: 180,
                heartRestore: 0,
                stolenGold: 0,
                count: achievements ? 32 : 0,
            },
            stats: {
                pokemonOwned: (box ? 181 : 0) + (team ? 10 : 0),
                highestPokemonLevel: 100,
                totalPokemonLevel: ((box ? 181 : 0) + (team ? 10 : 0)) * 100,
                totalGold: gold ? MAX_GOLD : 50,
                wavesCompleted: 0,
                highestHit: 0,
                defeatedEnemies: 0,
                defeatedSpecies: [],
                appliedStuns: 0,
                appliedSlows: 0,
                appliedBurns: 0,
                appliedPoisons: 0,
                appliedCurses: 0,
                resets: 0,
                timePlayed: 0,
                maxGoldPerWave: [0, null],
                maxGoldPerTime: [0, null],
            },
            items: items ? buildItems() : [],
            secrets: secrets
                ? { cacnea: true, greavard: true, stakataka: true, luvdisc: true, chatot: true }
                : { cacnea: false, greavard: false, stakataka: false, luvdisc: false, chatot: false },
        },
        team: team ? buildTeam(shiny) : [],
        box: box ? buildBox(shiny) : [],
        area: { routeNumber: 0, routeWaves: [1, 1, 1, 1, 1, 1, 1, 1, 1] },
        shop: {
            eggPrice: 10,
            eggList: EGG_KEYS.slice(),
            itemList: [],
            itemStock: [],
        },
        teamManager: {
            teamA: [[], [], [], [], [], [], [], [], []],
            teamB: [[], [], [], [], [], [], [], [], []],
            teamC: [[], [], [], [], [], [], [], [], []],
            teamD: [[], [], [], [], [], [], [], [], []],
            teamE: [[], [], [], [], [], [], [], [], []],
        },
    };
    return { config: config, save: save };
}

/* === END GENERATED CATALOG AND SAVE BUILDERS === */

// ---------------------------------------------------------------------------
// UI (wiring del browser / localStorage — fuori dalla sezione pura)
// ---------------------------------------------------------------------------

    const STORAGE_KEY = 'data';
    const RELOAD_DELAY_MS = 8000;

    function loadRaw() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (err) {
            return null;
        }
    }

    function saveRaw(value) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }

    // Legge il save corrente (o ne crea uno nuovo) e applica la mutazione.
    function mutateSave(mutator) {
        let data = loadRaw();
        if (!data || !data.save || !data.save.player) data = buildSave();
        mutator(data);
        saveRaw(data);
        showBanner('Save updated. Reloading...');
        window.setTimeout(function () { window.location.reload(); }, RELOAD_DELAY_MS);
    }

    function showBanner(text) {
        const banner = document.createElement('div');
        banner.textContent = text;
        banner.style.cssText = [
            'position:fixed',
            'left:50%',
            'bottom:24px',
            'transform:translateX(-50%)',
            'background:#111',
            'color:#1E90FF',
            'border:1px solid #1E90FF',
            'borderRadius:6px',
            'padding:10px 16px',
            'font:13px/1.4 sans-serif',
            'zIndex:2147483647',
            'boxShadow:0 4px 16px rgba(0,0,0,0.5)',
        ].join(';');
        document.body.appendChild(banner);
    }

    function makeButton(label, onClick) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = label;
        btn.style.cssText = [
            'display:block',
            'width:100%',
            'margin:5px 0',
            'padding:6px 8px',
            'background:#1E90FF',
            'color:#fff',
            'border:none',
            'borderRadius:4px',
            'cursor:pointer',
            'font:12px/1.4 sans-serif',
            'textAlign:left',
        ].join(';');
        if (onClick) btn.addEventListener('click', onClick);
        return btn;
    }

    function makeToggle(label, onChange) {
        const wrap = document.createElement('label');
        wrap.style.cssText = 'display:block;margin:5px 0;font:12px/1.4 sans-serif;color:#fff;cursor:pointer;';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        wrap.appendChild(cb);
        wrap.appendChild(document.createTextNode(label));
        cb.addEventListener('change', function () {
            if (onChange) onChange(cb.checked);
        });
        return wrap;
    }

    function makeDetails(summaryText) {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = summaryText;
        summary.style.cssText = 'cursor:pointer;font-weight:bold;margin:4px 0;';
        details.appendChild(summary);
        return details;
    }

    function buildPanel() {
        // Stato condiviso
        let shiny = false;

        const panel = document.createElement('div');
        panel.style.cssText = [
            'position:fixed',
            'right:16px',
            'bottom:64px',
            'width:260px',
            'maxHeight:70vh',
            'overflowY:auto',
            'background:#111',
            'color:#fff',
            'border:1px solid #1E90FF',
            'borderRadius:8px',
            'padding:10px 12px',
            'font:12px/1.4 sans-serif',
            'zIndex:2147483646',
            'display:none',
            'boxShadow:0 6px 24px rgba(0,0,0,0.6)',
        ].join(';');

        const title = document.createElement('div');
        title.textContent = 'PokePath Unlocked';
        title.style.cssText = 'font-weight:bold;font-size:13px;margin-bottom:6px;color:#1E90FF;';
        panel.appendChild(title);

        // ---- Economy ----
        const economy = makeDetails('Economy');
        economy.appendChild(makeButton('Max Gold', function () {
            mutateSave(function (data) {
                data.save.player.gold = MAX_GOLD;
                data.save.player.stats.totalGold = MAX_GOLD;
            });
        }));

        const starRow = document.createElement('div');
        starRow.style.cssText = 'display:flex;align-items:center;gap:6px;margin:6px 0;';
        const starSlider = document.createElement('input');
        starSlider.type = 'range';
        starSlider.min = '0';
        starSlider.max = String(MAX_STARS);
        starSlider.step = '25';
        starSlider.value = String(MAX_STARS);
        starSlider.style.cssText = 'flex:1;';
        const starLabel = document.createElement('span');
        starLabel.textContent = String(MAX_STARS);
        starLabel.style.cssText = 'min-width:56px;color:#fff;text-align:right;';
        starSlider.addEventListener('input', function () {
            starLabel.textContent = starSlider.value;
        });
        starRow.appendChild(starSlider);
        starRow.appendChild(starLabel);
        economy.appendChild(starRow);
        economy.appendChild(makeButton('Apply Stars', function () {
            const stars = parseInt(starSlider.value, 10) || 0;
            mutateSave(function (data) {
                data.save.player.records = recordsFor(stars);
                data.save.player.stars = stars;
                data.save.player.extraGold = stars === MAX_STARS ? EXTRA_GOLD_AT_900 : 0;
                data.save.player.teamSlots = Math.max(
                    data.save.player.teamSlots || 6,
                    teamSlotsFor(stars)
                );
            });
        }));
        economy.appendChild(makeButton('Max Health', function () {
            mutateSave(function (data) {
                data.save.player.health = [14, 14, 14, 14, 14, 14, 14, 14, 14];
            });
        }));
        panel.appendChild(economy);

        // ---- Collection ----
        const collection = makeDetails('Collection');
        collection.appendChild(makeToggle('Shiny box and team', function (checked) {
            shiny = checked;
        }));
        collection.appendChild(makeButton('Fill Box (181, level 100)', function () {
            mutateSave(function (data) {
                data.save.box = buildBox(shiny);
                data.save.player.stats.pokemonOwned = Math.max(
                    data.save.player.stats.pokemonOwned || 0,
                    181
                );
            });
        }));
        collection.appendChild(makeButton('All Items (63)', function () {
            mutateSave(function (data) {
                data.save.player.items = buildItems();
                data.save.shop.itemList = [];
                data.save.shop.itemStock = [];
            });
        }));
        collection.appendChild(makeButton('Full Team (TOP_TEAM)', function () {
            mutateSave(function (data) {
                data.save.team = buildTeam(shiny);
                data.save.player.teamSlots = Math.max(
                    data.save.player.teamSlots || 6,
                    teamSlotsFor(MAX_STARS)
                );
            });
        }));
        collection.appendChild(makeButton('Unlock Secrets', function () {
            mutateSave(function (data) {
                data.save.player.secrets = {
                    cacnea: true,
                    greavard: true,
                    stakataka: true,
                    luvdisc: true,
                    chatot: true,
                };
            });
        }));
        panel.appendChild(collection);

        // ---- Achievements ----
        const achievements = makeDetails('Achievements');
        achievements.appendChild(makeButton('Unlock All Achievements (32)', function () {
            mutateSave(function (data) {
                data.save.player.achievements = buildAchievements();
                data.save.player.achievementProgress.count = 32;
            });
        }));
        panel.appendChild(achievements);

        // ---- Reset ----
        const reset = makeDetails('Reset');
        reset.appendChild(makeButton('Reset Save (full unlock)', function () {
            const existing = loadRaw();
            const prevName = (existing && existing.save && existing.save.player && existing.save.player.name) || 'Player';
            const fresh = buildSave({ name: prevName, shiny: shiny });
            if (existing && existing.config) fresh.config = existing.config;
            saveRaw(fresh);
            showBanner('Save reset. Reloading...');
            window.setTimeout(function () { window.location.reload(); }, RELOAD_DELAY_MS);
        }));
        panel.appendChild(reset);

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.textContent = 'PokePath Unlocked';
        toggle.style.cssText = [
            'position:fixed',
            'right:16px',
            'bottom:16px',
            'padding:8px 14px',
            'background:#1E90FF',
            'color:#fff',
            'border:none',
            'borderRadius:6px',
            'cursor:pointer',
            'font:13px/1.4 sans-serif',
            'zIndex:2147483646',
        ].join(';');
        toggle.addEventListener('click', function () {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        });

        document.body.appendChild(toggle);
        document.body.appendChild(panel);
    }

    function boot() {
        if (document.body) {
            buildPanel();
            return;
        }
        window.addEventListener('DOMContentLoaded', buildPanel);
    }

    boot();

})();