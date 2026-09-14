// ==UserScript==
// @name         PokePath Unlocked
// @namespace    PokePathUnlocked
// @version      1.0.0
// @description  Sblocca oro, stelle, Pokémon, oggetti e achievement in PokePath.
// @author       PokePath-Unlocked
// @match        https://oss.pokepath.tech/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

/* === GENERATED CATALOG AND SAVE BUILDERS (pure) === */// Auto-generato da tools/extract_catalog.py — NON MODIFICARE A MANO.
// Sorgenti: https://oss.pokepath.tech/src/js/game/data/{pokemonData,itemData,achievementData}.js

const SPECIES_KEYS = [
	'charmander', 'charmeleon', 'charizard', 'treecko', 'grovyle', 'sceptile', 'froaki', 'frogadier', 'greninja', 'spoink', 'grumpig', 'natu', 'xatu', 'voltorb', 'electrode', 'ekans', 'arbok', 'machop', 'machoke', 'machamp', 'mankey', 'primeape', 'chimchar', 'monferno', 'infernape', 'yamask', 'cofagrigus', 'riolu', 'lucario', 'mareep', 'flaaffy', 'ampharos', 'gulpin', 'swalot', 'cryogonal', 'sableye', 'drudiggon', 'meowth', 'persian', 'sunkern', 'sunflora', 'tangela', 'tangrowth', 'chikorita', 'bayleef', 'meganium', 'hoppip', 'skiploom', 'jumpluff', 'cottonee', 'whimsicott', 'petilil', 'lilligant', 'spinarak', 'ariados', 'maractus', 'shroomish', 'breloom', 'barboach', 'whiscash', 'clauncher', 'clawitzer', 'remoraid', 'octillery', 'oshawott', 'dewott', 'samurott', 'staryu', 'starmie', 'lapras', 'seel', 'dewgong', 'psyduck', 'golduck', 'murkrow', 'honchkrow', 'sandshrew', 'sandslash', 'trapinch', 'vibrava', 'flygon', 'noibat', 'noivern', 'sneasel', 'weavile', 'drilbur', 'excadrill', 'shuckle', 'hawlucha', 'aron', 'lairon', 'aggron', 'cubone', 'marowak', 'pidgey', 'pidgeotto', 'pidgeot', 'binacle', 'barbaracle', 'surskit', 'masquerain', 'ferroseed', 'ferrothorn', 'absol', 'girafarig', 'torkoal', 'spinda', 'dunsparce', 'ralts', 'kirlia', 'gardevoir', 'koffing', 'weezing', 'farfetchd', 'omanyte', 'omastar', 'kabuto', 'kabutops', 'corsola', 'castform', 'clefairy', 'clefable', 'anorith', 'armaldo', 'lileep', 'cradily', 'shieldon', 'bastiodon', 'cranidos', 'rampardos', 'starly', 'staravia', 'staraptor', 'abra', 'kadabra', 'alakazam', 'gastly', 'haunter', 'gengar', 'ditto', 'magikarp', 'gyarados', 'pikachu', 'raichu', 'fuecoco', 'crocalor', 'skeledirge', 'larvesta', 'volcarona', 'cherubi', 'cherrim', 'rockruff', 'lycanrocDay', 'lycanrocNight', 'pawniard', 'bisharp', 'sandile', 'krokorok', 'krookodile', 'wimpod', 'golisopod', 'honedge', 'doublade', 'aegislash', 'sobble', 'drizzile', 'inteleon', 'rowlet', 'dartrix', 'decidueye', 'comfey', 'smeargle', 'cacnea', 'cacturne', 'greavard', 'houndstone', 'stakataka', 'luvdisc', 'chatot', 'carvanha', 'sharpedo'
];

const ITEM_LIST = [
	{ id: 'protein', sprite: './src/assets/images/items/protein.png' },
	{ id: 'carbos', sprite: './src/assets/images/items/carbos.png' },
	{ id: 'lifeOrb', sprite: './src/assets/images/items/life-orb.png' },
	{ id: 'lightClay', sprite: './src/assets/images/items/light-clay.png' },
	{ id: 'twistedSpoon', sprite: './src/assets/images/items/twisted-spoon.png' },
	{ id: 'clefairyDoll', sprite: './src/assets/images/items/poke-doll.png' },
	{ id: 'amuletCoin', sprite: './src/assets/images/items/amulet-coin.png' },
	{ id: 'fertiliser', sprite: './src/assets/images/items/rich.png' },
	{ id: 'heartScale', sprite: './src/assets/images/items/heart-scale.png' },
	{ id: 'squirtBottle', sprite: './src/assets/images/items/squirt-bottle.png' },
	{ id: 'wideLens', sprite: './src/assets/images/items/wide-lens.png' },
	{ id: 'choiceScarf', sprite: './src/assets/images/items/choice-scarf.png' },
	{ id: 'airBalloon', sprite: './src/assets/images/items/air-balloon.png' },
	{ id: 'oldRod', sprite: './src/assets/images/items/old-rod.png' },
	{ id: 'heatRock', sprite: './src/assets/images/items/heat-rock.png' },
	{ id: 'dampMulch', sprite: './src/assets/images/items/damp.png' },
	{ id: 'softSand', sprite: './src/assets/images/items/soft-sand.png' },
	{ id: 'heavyDutyBoots', sprite: './src/assets/images/items/heavy-duty-boots.png' },
	{ id: 'shieldBreakerBullet', sprite: './src/assets/images/items/iron-ball.png' },
	{ id: 'shellBell', sprite: './src/assets/images/items/shell-bell.png' },
	{ id: 'stickyBarb', sprite: './src/assets/images/items/sticky-barb.png' },
	{ id: 'starCandy', sprite: './src/assets/images/items/star-sweet.png' },
	{ id: 'electirizer', sprite: './src/assets/images/items/electirizer.png' },
	{ id: 'cellBattery', sprite: './src/assets/images/items/cell-battery.png' },
	{ id: 'leek', sprite: './src/assets/images/items/leek.png' },
	{ id: 'thickClub', sprite: './src/assets/images/items/thick-club.png' },
	{ id: 'lightBall', sprite: './src/assets/images/items/light-ball.png' },
	{ id: 'nanabBerry', sprite: './src/assets/images/items/nanab-berry.png' },
	{ id: 'bigRoot', sprite: './src/assets/images/items/big-root.png' },
	{ id: 'sprayduck', sprite: './src/assets/images/items/sprayduck.png' },
	{ id: 'razorClaw', sprite: './src/assets/images/items/razor-claw.png' },
	{ id: 'ringTarget', sprite: './src/assets/images/items/ring-target.png' },
	{ id: 'spellTag', sprite: './src/assets/images/items/spell-tag.png' },
	{ id: 'sharpBeak', sprite: './src/assets/images/items/sharp-beak.png' },
	{ id: 'clawFossil', sprite: './src/assets/images/items/claw.png' },
	{ id: 'sniperScope', sprite: './src/assets/images/items/scope-lens.png' },
	{ id: 'loadedDice', sprite: './src/assets/images/items/lens-case.png' },
	{ id: 'quickPowder', sprite: './src/assets/images/items/quick-powder.png' },
	{ id: 'metalPowder', sprite: './src/assets/images/items/metal-powder.png' },
	{ id: 'hardStone', sprite: './src/assets/images/items/hard-stone.png' },
	{ id: 'domeFossil', sprite: './src/assets/images/items/dome.png' },
	{ id: 'starPiece', sprite: './src/assets/images/items/star-piece.png' },
	{ id: 'rockyHelmet', sprite: './src/assets/images/items/rocky-helmet.png' },
	{ id: 'berryJuice', sprite: './src/assets/images/items/berry-juice.png' },
	{ id: 'blueBandana', sprite: './src/assets/images/items/blue.png' },
	{ id: 'adrenalineOrb', sprite: './src/assets/images/items/adrenaline-orb.png' },
	{ id: 'zoomLens', sprite: './src/assets/images/items/zoom-lens.png' },
	{ id: 'metronome', sprite: './src/assets/images/items/metronome.png' },
	{ id: 'strangeIdol', sprite: './src/assets/images/items/strange-idol.png' },
	{ id: 'helixFossil', sprite: './src/assets/images/items/helix.png' },
	{ id: 'spindaCocktail', sprite: './src/assets/images/items/spinda-cocktail.png' },
	{ id: 'dragonFang', sprite: './src/assets/images/items/dragon-fang.png' },
	{ id: 'ejectButton', sprite: './src/assets/images/items/eject-button.png' },
	{ id: 'nightmareCloth', sprite: './src/assets/images/items/nightmare-cloth.png' },
	{ id: 'poisonBarb', sprite: './src/assets/images/items/poison-barb.png' },
	{ id: 'silphScope', sprite: './src/assets/images/items/silph-scope.png' },
	{ id: 'quickClaw', sprite: './src/assets/images/items/quick-claw.png' },
	{ id: 'revelationAroma', sprite: './src/assets/images/items/flower-sweet.png' },
	{ id: 'falmeOrb', sprite: './src/assets/images/items/flame-orb.png' },
	{ id: 'badgeOfHonor', sprite: './src/assets/images/items/honor-of-kalos.png' },
	{ id: 'toxicOrb', sprite: './src/assets/images/items/toxic-orb.png' },
	{ id: 'shinyCharm', sprite: './src/assets/images/items/shiny-charm.png' },
	{ id: 'bicycle', sprite: './src/assets/images/items/bicycle.png' }
];

const EGG_KEYS = [
	'charmander', 'treecko', 'froaki', 'natu', 'spoink', 'murkrow', 'voltorb', 'machop', 'mankey', 'chimchar', 'yamask', 'cryogonal', 'sableye', 'meowth', 'tangela', 'chikorita', 'spinarak', 'shroomish', 'barboach', 'drudiggon', 'remoraid', 'clauncher', 'seel', 'staryu', 'psyduck', 'gulpin', 'lapras', 'ferroseed', 'shuckle', 'maractus', 'sunkern', 'aron', 'hawlucha', 'cubone', 'binacle', 'absol', 'oshawott', 'sandshrew', 'sneasel', 'trapinch', 'pidgey', 'noibat', 'riolu', 'mareep', 'surskit', 'cottonee', 'petilil', 'hoppip', 'drilbur', 'ekans', 'girafarig', 'torkoal', 'spinda', 'dunsparce', 'ralts', 'koffing', 'farfetchd', 'omanyte', 'kabuto', 'corsola', 'castform', 'clefairy', 'anorith', 'lileep', 'shieldon', 'cranidos', 'starly', 'abra', 'gastly', 'ditto', 'magikarp', 'pikachu', 'fuecoco', 'larvesta', 'cherubi', 'rockruff', 'pawniard', 'sandile', 'wimpod', 'honedge', 'sobble', 'rowlet', 'comfey', 'smeargle', 'carvanha'
];

const TOP_TEAM = [
	'charizard', 'sceptile', 'greninja', 'gengar', 'alakazam', 'gyarados', 'aegislash', 'inteleon', 'volcarona', 'gardevoir'
];

const ACHIEVEMENTS = [
	{ description: ["Get all Pokémon from the Shop", "Obtén todos los Pokémon de la Tienda", "Obtenir tous les Pokémon de la boutique", "Obtenha todos os Pokémon da Loja", "Ottieni tutti i Pokémon dal Negozio", "Alle Pokémon aus dem Laden erhalten", "ショップからすべてのポケモンを入手", "상점에서 모든 포켓몬 얻기", "從商店獲得所有寶可夢"], image: "./src/assets/images/icons/boulderBadge.png" },
	{ description: ["Obtain the final evolutionary stage of all Pokémon", "Obtén la última etapa evolutiva de todos los Pokémon", "Obtienir le stade évolutif final de tous les Pokémon", "Obtenha o estágio evolutivo final de todos os Pokémon", "Ottieni lo stadio evolutivo finale di tutti i Pokémon", "Erreiche die letzte Entwicklungsstufe aller Pokémon", "すべてのポケモンの最終進化形を手に入れる", "모든 포켓몬의 최종 진화 단계를 획득한다", "獲得所有寶可夢的最終進化型態"], image: "./src/assets/images/icons/relicBadge.png" },
	{ description: ["Reach level 100 with a Pokémon", "Alcanza el nivel 100 con un Pokémon", "Atteindre le niveau 100 avec un Pokémon", "Alcança o nível 100 com um Pokémon", "Raggiungi il livello 100 con un Pokémon", "Erreiche Level 100 mit einem Pokémon", "ポケモンをレベル100にする", "포켓몬 레벨 100 달성", "讓一隻寶可夢達到等級100"], image: "./src/assets/images/icons/coralEyeBadge.png" },
	{ description: ["Save $1,000,000", "Ahorra $1.000.000", "Économiser 1 000 000 $", "Poupe $1.000.000", "Risparmia $1.000.000", "Spar $1.000.000", "合計$1,000,000を貯める", "$1,000,000를 모아라", "存下 $000,000"], image: "./src/assets/images/icons/marshBadge.png" },
	{ description: ["Unlock all routes", "Desbloquea todas las rutas", "Débloquer toutes les routes", "Desbloqueia todas as rotas", "Sblocca tutte le rotte", "Schalte alle Routen frei", "全てのルートを解放する", "모든 길을 해금한다", "解鎖所有路線"], image: "./src/assets/images/icons/forestBadge.png" },
	{ description: ["Collect a total of 900 stars", "Consigue un total de 900 estrellas", "Collecter un total de 900 étoiles", "Colete um total de 900 estrelas", "Raccogli un totale di 900 stelle", "Sammle insgesamt 900 Sterne", "合計900個の星を集める", "총 900별 획득", "蒐集總計900顆星星"], image: "./src/assets/images/icons/thunderBadge.png" },
	{ description: ["Defeat wave number 100 with Shuckle on the team", "Derrota la oleada número 100 con Shuckle en el equipo", "Vaincre la vague 100 avec Caratroc dans l’équipe", "Derrote a onda número 100 com Shuckle na equipa", "Sconfiggi l’ondata numero 100 con Shuckle nella squadra", "Besiege Welle Nr. 100 mit Pottrott im Team", "シャuckleをチームに入れて100波を撃破する", "단단지를 팀에 넣은 상태로 100웨이브를 클리어", "在隊伍中Shuckle 時，擊敗第100波"], image: "./src/assets/images/icons/balanceBadge.png" },
	{ description: ["Complete wave 100 with at least 10 hearts", "Completa la oleada número 100 con al menos 10 corazones", "Compléter la vague 100 avec au moins 10 cœurs", "Complete a onda número 100 com pelo menos 10 corações", "Completa l’ondata numero 100 con almeno 10 cuori", "Beende Welle 100 mit mindestens 10 Herzen", "100番目のウェーブをハート10個以上でクリア", "100번째 웨이브를 하트 10개 이상으로 완료", "在至少有10顆心的情況下完成第100波"], image: "./src/assets/images/icons/rainBadge.png" },
	{ description: ["Defeat 100,000 enemies", "Derrota 100.000 enemigos", "Vaincre 100 000 ennemis", "Derrote 100.000 inimigos", "Sconfiggi 100.000 nemici", "Besiege 100.000 Gegner", "敵を100,000体倒す", "적 100,000명을 처치한다", "擊敗100,000名敵人"], image: "./src/assets/images/icons/stoneBadge.png" },
	{ description: ["Defeat 100 different Pokémon species", "Vence a 100 especies diferentes de Pokémon", "Vaincre 100 espèces différentes de Pokémon", "Derrote 100 espécies diferentes de Pokémon", "Sconfiggi 100 specie diverse di Pokémon", "Besiege 100 verschiedene Pokémon-Arten", "100種類のポケモンを倒す", "100종의 다른 포켓몬을 처치한다", "擊敗100種不同的寶可夢"], image: "./src/assets/images/icons/hiveBadge.png" },
	{ description: ["Defeat 225 Delibird", "Derrota 225 Delibird", "Battre 225 Cadoizo", "Derruba 225 Delibird", "Sconfiggi 225 Delibird", "Besiege 225 Botogel", "デリバードを225匹倒す", "딜리버드 225마리 처치", "擊敗225隻信使"], image: "./src/assets/images/icons/beaconBadge.png" },
	{ description: ["Reset 100 times", "Resetea 100 veces", "Réinitialiser 100 fois", "Resete 100 vezes", "Resetta 100 volte", "Setze 100-mal zurück", "100回リセットする", "100번 초기화하기", "重置100次"], image: "./src/assets/images/icons/zephyrBadge.png" },
	{ description: ["Win a wave with 1 heart remaining", "Gana una oleada con 1 corazón restante", "Gagner une vague avec 1 cœur restant", "Vença uma onda com 1 coração restante", "Vinci un’ondata con 1 cuore rimanente", "Gewinne eine Welle mit 1 Herz übrig", "ハート1でウェーブに勝利する", "하트 1개로 웨이브 승리하기", "以剩餘1顆心贏得一波"], image: "./src/assets/images/icons/soulBadge.png" },
	{ description: ["Apply stun 10,000 times", "Aplica aturdimiento 10.000 veces", "Appliquer étourdissement 10 000 fois", "Aplique atordoamento 10.000 vezes", "Applica stordimento 10.000 volte", "Betäube 10.000-mal", "スタンを10,000回付与する", "기절 10,000회 적용", "造成10,000次眩暈效果"], image: "./src/assets/images/icons/patienceBadge.png" },
	{ description: ["Apply slow 10,000 times", "Aplica ralentización 10.000 veces", "Appliquer ralentissement 10 000 fois", "Aplique lentidão 10.000 vezes", "Applica rallentamento 10.000 volte", "Verlangsame 10.000-mal", "スローを10,000回付与する", "감속 10,000회 적용", "造成10,000次減速效果"], image: "./src/assets/images/icons/harmonyBadge.png" },
	{ description: ["Apply burn 10,000 times", "Aplica quemadura 10.000 veces", "Appliquer brulure 10 000 fois", "Aplique queimadura 10.000 vezes", "Applica ustione 10.000 volte", "Verbrenne 10.000-mal", "やけどを10,000回付与する", "화상 10,000회 적용", "造成10,000次灼傷效果"], image: "./src/assets/images/icons/prideBadge.png" },
	{ description: ["Apply poison 10,000 times", "Aplica veneno 10.000 veces", "Appliquer poison 10 000 fois", "Aplique veneno 10.000 vezes", "Applica veleno 10.000 volte", "Vergifte 10.000-mal", "どくを10,000回付与する", "독 10,000회 적용", "造成10,000次中毒效果"], image: "./src/assets/images/icons/tranquilityBadge.png" },
	{ description: ["Apply curse 10,000 times", "Aplica maldición 10.000 veces", "Appliquer malédiction 10 000 fois", "Aplique maldição 10.000 vezes", "Applica maledizione 10.000 volte", "Verfluche 10.000-mal", "のろいを10,000回付与する", "저주 10,000회 적용", "造成10,000次詛咒效果"], image: "./src/assets/images/icons/freedomBadge.png" },
	{ description: ["Deal 9,999+ damage in one hit", "Haz +9.999 daño de un golpe", "Infliger plus de 9 999 dégâts en un coup", "Cause mais de 9.999 de dano em um golpe", "Infliggi oltre 9.999 danni in un colpo", "Füge über 9.999 Schaden mit einem Treffer zu", "1撃で9,999以上のダメージを与える", "한 번의 공격으로 9,999+ 피해를 주기", "一次攻擊造成9,999以上傷害"], image: "./src/assets/images/icons/knuckleBadge.png" },
	{ description: ["Restore 10 hearts thanks to your Pokémon", "Restaura 10 corazones gracias a tus Pokémon", "Restaurer 10 cœurs grâce à tes Pokémon", "Restaure 10 corações graças aos seus Pokémon", "Ripristina 10 cuori grazie ai tuoi Pokémon", "Stelle dank deiner Pokémon 10 Herzen wieder her", "ポケモンのおかげでハートを10回復する", "포켓몬 덕분에 하트 10 회복하기", "透過你的寶可夢回復10顆心"], image: "./src/assets/images/icons/mindBadge.png" },
	{ description: ["Surround Sunflora with 9 Pokémon", "Rodea a Sunflora de 9 Pokémon", "Cerner Héliatronc avec 9 Pokémon", "Cerque Sunflora com 9 Pokémon", "Circonda Sunflora con 9 Pokémon", "Umgebe Sonnflora mit 9 Pokémon", "キマワリを9匹のポケモンで囲む", "해루미를 포켓몬 9마리로 둘러싸기", "讓向日花怪 周圍有9隻寶可夢"], image: "./src/assets/images/icons/rainbowBadge.png" },
	{ description: ["Earn $100,000 with Meowth or Persian", "Obtén $100.000 con Meowth o Persian", "Gagner 100 000 $ avec Miaouss ou Persian", "Ganhe $100.000 com Meowth ou Persian", "Ottieni $100.000 con Meowth o Persian", "Verdiene 100.000$ mit Mauzi oder Snobilikat", "ニャースかペルシアンで$100,000稼ぐ", "나옹 또는 페르시온으로 $100,000 벌기", "用喵喵或貓老大賺$100,000"], image: "./src/assets/images/icons/spikeShellBadge.png" },
	{ description: ["Defeat Articuno", "Derrota a Articuno", "Battre Artikodin", "Derruba Articuno", "Sconfiggi Articuno", "Besiege Arktos", "フリーザーを倒す", "프리저 처치", "擊敗急凍鳥"], image: "./src/assets/images/icons/glacierBadge.png" },
	{ description: ["Defeat Zapdos", "Derrota a Zapdos", "Battre Électhor", "Derruba Zapdos", "Sconfiggi Zapdos", "Besiege Zapdos", "サンダーを倒す", "썬더 처치", "擊敗閃電鳥"], image: "./src/assets/images/icons/plainBadge.png" },
	{ description: ["Defeat Moltres", "Derrota a Moltres", "Battre Sulfura", "Derruba Moltres", "Sconfiggi Moltres", "Besiege Lavados", "ファイヤーを倒す", "파이어 처치", "擊敗火焰鳥"], image: "./src/assets/images/icons/heatBadge.png" },
	{ description: ["Defeat Raikou", "Derrota a Raikou", "Battre Raikou", "Derruba Raikou", "Sconfiggi Raikou", "Besiege Raikou", "ライコウを倒す", "라이코 처치", "擊敗雷公"], image: "./src/assets/images/icons/dynamoBadge.png" },
	{ description: ["Defeat Entei", "Derrota a Entei", "Battre Entei", "Derruba Entei", "Sconfiggi Entei", "Besiege Entei", "エンテイを倒す", "엔테이 처치", "擊敗炎帝"], image: "./src/assets/images/icons/volcanoBadge.png" },
	{ description: ["Defeat Suicune", "Derrota a Suicune", "Battre Suicune", "Derruba Suicune", "Sconfiggi Suicune", "Besiege Suicune", "スイクンを倒す", "스이쿤 처치", "擊敗水君"], image: "./src/assets/images/icons/featherBadge.png" },
	{ description: ["Defeat Regirock", "Derrota a Regirock", "Battre Regirock", "Derruba Regirock", "Sconfiggi Regirock", "Besiege Regirock", "レジロックを倒す", "레지락 처치", "擊敗雷吉洛克"], image: "./src/assets/images/icons/coralBadge.png" },
	{ description: ["Defeat Regice", "Derrota a Regice", "Battre Regice", "Derruba Regice", "Sconfiggi Regice", "Besiege Regice", "レジアイスを倒す", "레지아이스 처치", "擊敗雷吉艾斯"], image: "./src/assets/images/icons/icicleBadge.png" },
	{ description: ["Defeat Registeel", "Derrota a Registeel", "Battre Registeel", "Derruba Registeel", "Sconfiggi Registeel", "Besiege Registeel", "レジスチルを倒す", "레지스틸 처치", "擊敗雷吉斯奇魯"], image: "./src/assets/images/icons/mineBadge.png" },
	{ description: ["Complete all achievements", "Completa todos los logros", "Terminer tous les succès", "Complete todas as conquistas", "Completa tutti gli obiettivi", "Schließe alle Erfolge ab", "すべての実績を達成する", "모든 업적을 완료하기", "完成所有成就"], image: "./src/assets/images/icons/risingBadge.png" }
];

const MAX_STARS = 900;
const MAX_GOLD = 99999999999;
const EXTRA_GOLD_AT_900 = 131;

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
    const RELOAD_DELAY_MS = 500;
    let reloading = false;

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

// Pianifica il reload; i doppi click sono ignorati (la pagina reloada comunque).
    function scheduleReload() {
        if (reloading) return;
        reloading = true;
        window.setTimeout(function () { window.location.reload(); }, RELOAD_DELAY_MS);
    }

    // Guardia per save legacy/corrotti: stats mancante = crash silenzioso sui mutatori.
    function ensureStats(player) {
        if (player.stats) return player.stats;
        player.stats = {
            pokemonOwned: 0,
            highestPokemonLevel: 0,
            totalPokemonLevel: 0,
            totalGold: player.gold || 0,
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
        };
        return player.stats;
    }

    // Legge il save corrente (o ne crea uno nuovo) e applica la mutazione.
    function mutateSave(mutator) {
        if (reloading) return;
        reloading = true;
        let data = loadRaw();
        if (!data || !data.save || !data.save.player) data = buildSave();
        ensureStats(data.save.player);
        try {
            mutator(data);
        } catch (err) {
            reloading = false;
            showBanner('Error: invalid save, no changes applied');
            return;
        }
        saveRaw(data);
        showBanner('Save updated. Reloading...');
        scheduleReload();
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
            if (reloading) return;
            if (!window.confirm('Destroy current save and apply full unlock?')) return;
            reloading = true;
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
