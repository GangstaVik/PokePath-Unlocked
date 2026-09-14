#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
extract_catalog.py — Estrae il catalogo di PokePath TD (specie, oggetti, uova,
squadra top) dai file di gioco REALI ospitati su https://oss.pokepath.tech
e genera catalog.js (usato sia dal userscript sia dai test Node).

Uso:
    python tools/extract_catalog.py            # scarica (se serve) e genera catalog.js
    python tools/extract_catalog.py --refresh  # forza il re-download dei sorgenti

Output:  <progetto>/catalog.js
"""

from __future__ import annotations

import json
import re
import ssl
import sys
import urllib.request
from pathlib import Path

BASE_URL = "https://oss.pokepath.tech/src/js/game/data/"
TOOLS_DIR = Path(__file__).resolve().parent
ROOT_DIR = TOOLS_DIR.parent
CACHE_DIR = TOOLS_DIR / ".cache"
OUT_FILE = ROOT_DIR / "catalog.js"

SOURCES = {
    "pokemonData.js": BASE_URL + "pokemonData.js",
    "itemData.js": BASE_URL + "itemData.js",
    "achievementData.js": BASE_URL + "achievementData.js",
}

UA = {"User-Agent": "Mozilla/5.0 (compatible; PokePathCatalogExtractor/1.0)"}

# Valori attesi (validati su sorgenti reali) — usati solo come report, non come filtro.
EXPECTED = {"species": 181, "items": 63, "eggs": 85, "achievements": 32}


def fetch(name: str, url: str, refresh: bool) -> str:
    """Scarica un file sorgente del gioco (o lo riusa dalla cache locale)."""
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cached = CACHE_DIR / name
    if cached.exists() and not refresh:
        return cached.read_text(encoding="utf-8")
    ctx = ssl.create_default_context()
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, context=ctx, timeout=60) as resp:
        raw = resp.read().decode("utf-8")
    cached.write_text(raw, encoding="utf-8")
    return raw


def top_level_blocks(body: str, indent: int = 1):
    """Yield (key, block_text) per ogni oggetto al livello di indentazione dato."""
    pat = re.compile(r"^\t{%d}([A-Za-z0-9_]+): \{" % indent, re.M)
    matches = list(pat.finditer(body))
    for i, m in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(body)
        yield m.group(1), body[m.end():end]


def extract_species(pokemon_js: str) -> list[str]:
    """Chiavi specie: oggetti di primo livello di `pokemonData` che dichiarano
    una proprietà `key:` con il proprio nome (esclude i blocchi annidati)."""
    body = pokemon_js.split("export const eggListData", 1)[0]
    species = []
    for key, block in top_level_blocks(body):
        if re.search(r"key:\s*['\"]" + re.escape(key) + r"['\"]", block):
            species.append(key)
    return species


def extract_items(item_js: str) -> list[dict]:
    """Oggetti venduti: chiavi di primo livello di `itemData` che dichiarano
    `id:` con il proprio nome. L'ordine finale è quello di `itemListData`
    (ordine di vendita nel negozio)."""
    body = item_js.split("export const itemListData", 1)[0]

    by_key: dict[str, dict] = {}
    for key, block in top_level_blocks(body):
        idm = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
        if not idm or idm.group(1) != key:
            continue
        sp = re.search(r"sprite:\s*['\"]([^'\"]+)['\"]", block)
        by_key[key] = {"id": key, "sprite": sp.group(1) if sp else ""}

    # ordine di vendita dal negozio
    tail = item_js.split("export const itemListData = [", 1)[1]
    tail = tail.split("]", 1)[0]
    order = re.findall(r"['\"]([A-Za-z0-9_]+)['\"]", tail)

    items = [by_key[k] for k in order if k in by_key]
    missing = [k for k in order if k not in by_key]
    if missing:
        print(f"[WARN] chiavi itemListData non trovate in itemData: {missing}")
    return items


def extract_eggs(pokemon_js: str) -> list[str]:
    """Uova iniziali: array `eggListData` (prima della sezione Update)."""
    head = pokemon_js.split("export const eggListDataUpdate", 1)[0]
    body = head.split("export const eggListData = [", 1)[1].split("]", 1)[0]
    return re.findall(r"['\"]([a-z0-9_]+)['\"]", body)


def extract_achievements(ach_js: str) -> list[dict]:
    """Achievement: entry del primo livello di `achievementData`.

    Ogni entry reale è `{ description: [...9 lingue], status: bool, image: '…' }`.
    Il catalogo emette solo `{ description, image }` (lo `status` viene forzato a
    `true` dai builder del save).
    """
    body = ach_js.split("export const achievementData = [", 1)[1]
    entries = []
    i = 0
    n = len(body)
    while i < n:
        j = body.find("{", i)
        if j == -1:
            break
        depth = 0
        k = j
        while k < n:
            c = body[k]
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    break
            k += 1
        if depth != 0:
            break
        block = body[j : k + 1]
        dm = re.search(r"description:\s*\[(.*?)\]\s*,", block, re.S)
        im = re.search(r"image:\s*['\"]([^'\"]+)['\"]", block)
        if dm and im:
            strings = [m.group(2) for m in re.finditer(r"(['\"])(.*?)\1", dm.group(1), re.S)]
            entries.append({"description": strings, "image": im.group(1)})
        i = k + 1
    return entries


TOP_TEAM = [
    "charizard", "sceptile", "greninja", "gengar", "alakazam",
    "gyarados", "aegislash", "inteleon", "volcarona", "gardevoir",
]


def main() -> int:
    refresh = "--refresh" in sys.argv

    pokemon_js = fetch("pokemonData.js", SOURCES["pokemonData.js"], refresh)
    item_js = fetch("itemData.js", SOURCES["itemData.js"], refresh)
    ach_js = fetch("achievementData.js", SOURCES["achievementData.js"], refresh)

    species = extract_species(pokemon_js)
    items = extract_items(item_js)
    eggs = extract_eggs(pokemon_js)
    achievements = extract_achievements(ach_js)

    # sanity: chiavi univoche, nessuna vuota
    assert len(set(species)) == len(species), "chiavi specie duplicate"
    assert all(species), "chiave specie vuota"
    assert len(set(it["id"] for it in items)) == len(items), "chiavi item duplicate"
    assert all(it["id"] and it["sprite"] for it in items), "item con id/sprite vuoto"
    assert len(set(eggs)) == len(eggs), "chiavi uovo duplicate"
    assert achievements, "nessun achievement estratto"
    assert all(len(a["description"]) == 9 for a in achievements), (
        "descrizione achievement non a 9 lingue"
    )

    missing_top = [k for k in TOP_TEAM if k not in set(species)]
    if missing_top:
        print(f"[WARN] chiavi top-team non nel catalogo specie: {missing_top}")

    # report
    print("=" * 60)
    print("CATALOGO PokePath TD (da sorgenti reali)")
    print("-" * 60)
    print(f"SPECIES : {len(species)}  (attesi {EXPECTED['species']})")
    print(f"  sample: {species[:3]}")
    print(f"ITEMS   : {len(items)}  (attesi {EXPECTED['items']})")
    print(f"  sample: {[it['id'] for it in items[:3]]}")
    print(f"EGGS    : {len(eggs)}  (attesi {EXPECTED['eggs']})")
    print(f"  sample: {eggs[:3]}")
    print(f"ACHIEV  : {len(achievements)}  (attesi {EXPECTED['achievements']})")
    print(f"  sample: {achievements[0]['image']}")
    print(f"TOP_TEAM disponibilità: {10 - len(missing_top)}/10")
    if missing_top:
        print(f"  mancanti: {missing_top}")
    for what, got, exp in (("species", len(species), EXPECTED["species"]),
                           ("items", len(items), EXPECTED["items"]),
                           ("eggs", len(eggs), EXPECTED["eggs"]),
                           ("achievements", len(achievements), EXPECTED["achievements"])):
        if got != exp:
            print(f"[WARN] {what}: {got} != atteso {exp} — il gioco è cambiato?")
    print("=" * 60)

    # serializza catalog.js (const plain, senza export — embeddabile nel userscript)
    js_items = ",\n\t".join(
        '{{ id: {id!r}, sprite: {sprite!r} }}'.format(id=it["id"], sprite=it["sprite"])
        for it in items
    )
    js_ach = ",\n\t".join(
        '{{ description: {desc}, image: {img} }}'.format(
            desc=json.dumps(a["description"], ensure_ascii=False),
            img=json.dumps(a["image"], ensure_ascii=False),
        )
        for a in achievements
    )
    out = "\n".join([
        "// Auto-generato da tools/extract_catalog.py — NON MODIFICARE A MANO.",
        "// Sorgenti: https://oss.pokepath.tech/src/js/game/data/{pokemonData,itemData,achievementData}.js",
        "",
        "const SPECIES_KEYS = [",
        "\t" + ", ".join(repr(k) for k in species),
        "];",
        "",
        "const ITEM_LIST = [",
        "\t" + js_items,
        "];",
        "",
        "const EGG_KEYS = [",
        "\t" + ", ".join(repr(k) for k in eggs),
        "];",
        "",
        "const TOP_TEAM = [",
        "\t" + ", ".join(repr(k) for k in TOP_TEAM),
        "];",
        "",
        "const ACHIEVEMENTS = [",
        "\t" + js_ach,
        "];",
        "",
        "const MAX_STARS = 900;",
        "const MAX_GOLD = 99999999999;",
        "const EXTRA_GOLD_AT_900 = 131;",
        "",
    ])
    OUT_FILE.write_text(out + "\n", encoding="utf-8")
    print(f"Scritto {OUT_FILE} ({len(out)} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())