// Test Node per la sezione pura del userscript PokePath-Unlocked.
// Estrae il blocco tra i marker, lo valuta in sandbox e valida il save generato.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const userPath = join(root, 'PokePath-Unlocked.user.js');
const src = readFileSync(userPath, 'utf8');

const OPEN = '/* === GENERATED CATALOG AND SAVE BUILDERS (pure) === */';
const CLOSE = '/* === END GENERATED CATALOG AND SAVE BUILDERS === */';
const start = src.indexOf(OPEN);
const end = src.indexOf(CLOSE);
if (start < 0 || end < 0 || end <= start + OPEN.length) {
    console.error('FAIL: marcatori sezione pure non trovati nel userscript');
    process.exit(1);
}
const pure = src.slice(start + OPEN.length, end);

let sandbox;
try {
    sandbox = new Function(
        pure +
            '\nreturn { buildSave, buildBox, buildTeam, buildItems, buildAchievements, recordsFor, SPECIES_KEYS, ITEM_LIST, EGG_KEYS, TOP_TEAM, ACHIEVEMENTS, MAX_GOLD, MAX_STARS, EXTRA_GOLD_AT_900 };'
    )();
} catch (err) {
    console.error('FAIL: valutazione sezione pure fallita:', err.message);
    process.exit(1);
}

const results = [];
function check(name, ok, detail) {
    results.push({ name, ok, detail });
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  (${detail})`);
}

// ---- buildSave di default (tutto maxato) ----
const data = sandbox.buildSave();
const save = data.save;

// 1. JSON round-trip (chiavi undefined e campi opzionali devono sopravvivere)
let round = null;
try {
    round = JSON.parse(JSON.stringify(data));
    check('json round-trip', true, 'config + save serializzabili');
} catch (e) {
    check('json round-trip', false, String(e));
}

// 2. Box: 181 entry lvl 100, tutte chiavi valide
const boxOk =
    save.box.length === 181 &&
    save.box.every((p) => p.specieKey && p.lvl === 100 && sandbox.SPECIES_KEYS.includes(p.specieKey));
check('box', boxOk, `${save.box.length} entry lvl 100`);

// 3. Items: 63 entry con id e sprite non vuoti
const itemsOk =
    save.player.items.length === 63 &&
    save.player.items.every(
        (it) => it.id && it.sprite && it.sprite.startsWith('./src/assets/images/items/')
    );
check('items', itemsOk, `${save.player.items.length} con sprite`);

// 4. Achievements: 32, tutti status:true, description a 9 lingue, image valida
const achOk =
    save.player.achievements.length === 32 &&
    save.player.achievements.every(
        (a) =>
            a.status === true &&
            Array.isArray(a.description) &&
            a.description.length === 9 &&
            a.image &&
            a.image.startsWith('./src/assets/images/icons/')
    );
check('achievements', achOk, `${save.player.achievements.length} status:true`);

// 5. Records / stelle: somma 900, ogni slot <= 100, extraGold 131
const sum = save.player.records.reduce((a, b) => a + b, 0);
check(
    'records',
    sum === 900 &&
        save.player.stars === 900 &&
        save.player.records.every((v) => v === 100) &&
        save.player.extraGold === 131,
    `sum=${sum} stars=${save.player.stars} extraGold=${save.player.extraGold}`
);

// 6. TeamManager: 5 squadre x 9 slot vuoti
const tm = save.teamManager;
const tmOk =
    tm &&
    ['teamA', 'teamB', 'teamC', 'teamD', 'teamE'].every(
        (k) => Array.isArray(tm[k]) && tm[k].length === 9 && tm[k].every((x) => Array.isArray(x) && x.length === 0)
    );
check('teamManager', tmOk, '5 squadre x 9 slot vuoti');

// 7. Team: 10 TOP_TEAM lvl 100
const teamOk =
    save.team.length === 10 && save.team.every((p) => p.lvl === 100 && sandbox.TOP_TEAM.includes(p.specieKey));
check('team', teamOk, `${save.team.length} TOP_TEAM lvl 100`);

// 8. Catalogo: conteggi attesi
check(
    'catalog',
    sandbox.SPECIES_KEYS.length === 181 &&
        sandbox.ITEM_LIST.length === 63 &&
        sandbox.EGG_KEYS.length === 85 &&
        sandbox.ACHIEVEMENTS.length === 32 &&
        sandbox.TOP_TEAM.length === 10,
    `species=${sandbox.SPECIES_KEYS.length} items=${sandbox.ITEM_LIST.length} eggs=${sandbox.EGG_KEYS.length} achievements=${sandbox.ACHIEVEMENTS.length} topTeam=${sandbox.TOP_TEAM.length}`
);

// 9. opts.stars: records parziali coerenti
const p = sandbox.buildSave({ stars: 500 }).save.player;
check('opts.stars', p.records.reduce((a, b) => a + b, 0) === 500 && p.stars === 500, `sum=${p.records.reduce((a, b) => a + b, 0)}`);

// 10. opts.secrets:false -> tutte false
const s = sandbox.buildSave({ secrets: false }).save.player.secrets;
check(
    'opts.secrets',
    Object.keys(s).length === 5 && Object.values(s).every((v) => v === false),
    `${Object.keys(s).length} chiavi tutte false`
);

// 11. Magic number a 900 stelle: EXTRA_GOLD_AT_900 = 131
check('extra_gold_900', sandbox.EXTRA_GOLD_AT_900 === 131, `EXTRA_GOLD_AT_900=${sandbox.EXTRA_GOLD_AT_900}`);

const failed = results.filter((r) => !r.ok).length;
const output = round || data;
writeFileSync(join(root, 'tools', 'generated-save.json'), JSON.stringify(output, null, 2) + '\n', 'utf8');
console.log(`\nScritto tools/generated-save.json (${JSON.stringify(output).length} byte JSON)`);
if (failed > 0) {
    console.error(`\n${failed} check falliti su ${results.length}`);
    process.exit(1);
}
console.log(`Tutti i ${results.length} check superati.`);