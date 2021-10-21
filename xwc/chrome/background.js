var files = [
  'advanced-quests.js',
  'agendas.js',
  'agents.js',
  'allies.js',
  'ally-skills.js',
  'city-event-decks.js',
  'class-familiars.js',
  'class-items.js',
  'class-skills.js',
  'conditions.js',
  'corrupt-citizens.js',
  'familiars.js',
  'heroes.js',
  'hybrid-class-skills.js',
  'lieutenants.js',
  'map-pieces.js',
  'monster-activations.js',
  'monsters.js',
  'overlord-decks.js',
  'perils.js',
  'plot-decks.js',
  'relics.js',
  'round-summary.js',
  'rumors.js',
  'search-deck.js',
  'secret-rooms.js',
  'servants.js',
  'shop-items.js',
  'statuses.js',
  'tainted.js',
  'traps.js',
  'travel-event-decks.js',
  'turn-summary.js',
];

var expansions = {
  "d2e": ["bg","ck","lw","lr","tf","sn","mr","mb","cr","oo","cd","cf","gd","vd","bw","tc","ss","se","ll","sotp","uc","motd"],
  "ffg": ["bg","ck","lw","lr","tf","sn","mr","mb","cr","oo","cd","cf","gd","vd","bw","tc","ss","se","ll"],
  "usrcom": ["sotp","uc","motd"],
}

var expansion_conversion = {
  "bg": "Base Game",
  "ck": "Conversion Kit",
  "lw": "Lair Of The Wyrm",
  "lr": "Labyrinth Of Ruin",
  "tf": "The Trollfens",
  "sn": "Shadow Of Nerekhall",
  "mr": "Manor Of Ravens",
  "mb": "Mists Of Bilehall",
  "cr": "The Chains That Rust",
  "oo": "Oath Of The Outcast",
  "cd": "Crown Of Destiny",
  "cf": "Crusade Of The Forgotten",
  "gd": "Guardians Of Deephall",
  "vd": "Visions Of Dawn",
  "bw": "Bonds Of The Wild",
  "tc": "Treaty Of Champions",
  "ss": "Stewards Of The Secret",
  "se": "Shards Of Everdark",
  "ll": "Lost Legends",
  "sotp": "Sands Of The Past",
  "uc": "User Community",
  "motd": "Maze Of The Drakon",
};

var expansion_card_type = {
  "Base Game": {
    "agents": true,
    "class-familiars": true,
    "class-items": true,
    "class-skills": true,
    "conditions": true,
    "heroes": true,
    "lieutenants": true,
    "map-pieces": true,
    "monsters": true,
    "overlord-decks": true,
    "plot-decks": true,
    "relics": true,
    "search-deck": true,
    "shop-items": true,
    "travel-event-decks": true,
    "turn-summary": true,
  },
  "Conversion Kit": {
    "familiars": true,
    "heroes": true,
    "monsters": true,
  },
  "Lair Of The Wyrm": {
    "advanced-quests": true,
    "agents": true,
    "class-familiars": true,
    "class-items": true,
    "class-skills": true,
    "conditions": true,
    "heroes": true,
    "lieutenants": true,
    "map-pieces": true,
    "monsters": true,
    "overlord-decks": true,
    "plot-decks": true,
    "relics": true,
    "rumors": true,
    "search-deck": true,
    "secret-rooms": true,
    "shop-items": true,
    "travel-event-decks": true,
  },
  "Labyrinth Of Ruin": {
    "agents": true,
    "allies": true,
    "ally-skills": true,
    "class-familiars": true,
    "class-items": true,
    "class-skills": true,
    "conditions": true,
    "heroes": true,
    "lieutenants": true,
    "map-pieces": true,
    "monsters": true,
    "overlord-decks": true,
    "plot-decks": true,
    "relics": true,
    "shop-items": true,
    "travel-event-decks": true,
  },
  "The Trollfens": {
    "advanced-quests": true,
    "agents": true,
    "class-items": true,
    "class-skills": true,
    "conditions": true,
    "heroes": true,
    "lieutenants": true,
    "map-pieces": true,
    "monsters": true,
    "overlord-decks": true,
    "plot-decks": true,
    "relics": true,
    "rumors": true,
    "search-deck": true,
    "secret-rooms": true,
    "shop-items": true,
    "travel-event-decks": true,
  },
  "Shadow Of Nerekhall": {
    "agents": true,
    "city-event-decks": true,
    "class-familiars": true,
    "class-items": true,
    "class-skills": true,
    "conditions": true,
    "corrupt-citizens": true,
    "heroes": true,
    "lieutenants": true,
    "map-pieces": true,
    "monsters": true,
    "overlord-decks": true,
    "plot-decks": true,
    "relics": true,
    "shop-items": true,
  },
  "Manor Of Ravens": {
    "advanced-quests": true,
    "agents": true,
    "class-items": true,
    "class-skills": true,
    "conditions": true,
    "heroes": true,
    "lieutenants": true,
    "map-pieces": true,
    "monsters": true,
    "overlord-decks": true,
    "plot-decks": true,
    "relics": true,
    "rumors": true,
    "servants": true,
    "shop-items": true,
  },
  "Mists Of Bilehall": {
    "agents": true,
    "conditions": true,
    "lieutenants": true,
    "map-pieces": true,
    "monsters": true,
    "plot-decks": true,
    "relics": true,
    "shop-items": true,
    "tainted": true,
    "travel-event-decks": true,
  },
  "The Chains That Rust": {
    "conditions": true,
    "hybrid-class-skills": true,
    "lieutenants": true,
    "map-pieces": true,
    "monsters": true,
    "overlord-decks": true,
    "relics": true,
    "servants": true,
    "shop-items": true,
    "tainted": true,
    "travel-event-decks": true,
  },
  "Oath Of The Outcast": {
    "advanced-quests": true,
    "heroes": true,
    "monsters": true,
    "overlord-decks": true,
    "rumors": true,
  },
  "Crown Of Destiny": {
    "advanced-quests": true,
    "heroes": true,
    "monsters": true,
    "overlord-decks": true,
    "rumors": true,
  },
  "Crusade Of The Forgotten": {
    "advanced-quests": true,
    "heroes": true,
    "monsters": true,
    "overlord-decks": true,
    "rumors": true,
  },
  "Guardians Of Deephall": {
    "advanced-quests": true,
    "heroes": true,
    "monsters": true,
    "overlord-decks": true,
    "rumors": true,
  },
  "Visions Of Dawn": {
    "advanced-quests": true,
    "heroes": true,
    "monsters": true,
    "overlord-decks": true,
    "rumors": true,
  },
  "Bonds Of The Wild": {
    "advanced-quests": true,
    "familiars": true,
    "heroes": true,
    "monsters": true,
    "overlord-decks": true,
    "rumors": true,
  },
  "Treaty Of Champions": {
    "advanced-quests": true,
    "heroes": true,
    "monsters": true,
    "overlord-decks": true,
    "rumors": true,
  },
  "Stewards Of The Secret": {
    "advanced-quests": true,
    "heroes": true,
    "monsters": true,
    "overlord-decks": true,
    "rumors": true,
  },
  "Shards Of Everdark": {
    "advanced-quests": true,
    "heroes": true,
    "monsters": true,
    "overlord-decks": true,
    "rumors": true,
  },
  "Lost Legends": {
    "class-items": true,
    "class-skills": true,
    "hybrid-class-skills": true,
  },
  "Sands Of The Past": {
    "advanced-quests": true,
    "agendas": true,
    "class-familiars": true,
    "class-items": true,
    "class-skills": true,
    "conditions": true,
    "heroes": true,
    "monster-activations": true,
    "monsters": true,
    "perils": true,
    "round-summary": true,
    "rumors": true,
    "search-deck": true,
    "statuses": true,
    "shop-items": true,
    "traps": true,
  },
  "User Community": {
    "heroes": true,
  },
  "Maze Of The Drakon": {
    "familiars": true,
    "heroes": true,
  },
};

const setExpCardType = (input_id, checked) => {
  let idx = input_id.indexOf("-");
  let shortExp = "";
  let card_type = "";
  if (idx >= 0) {
    shortExp = input_id.substring(0, input_id.indexOf("-"));
    card_type = input_id.substring(input_id.indexOf("-")+1);
    let expansion = expansion_conversion[shortExp];
    expansion_card_type[expansion][card_type] = checked;
  } else {
    shortExp = input_id;
    if (shortExp in expansions) {
      let value = expansions[shortExp];
      for (let exp of value) {
        let expansion = expansion_conversion[exp];
        for (let card_type in expansion_card_type[expansion]) {
          expansion_card_type[expansion][card_type] = checked;
        }
      }
    } else {
      let expansion = expansion_conversion[shortExp];
      for (let card_type in expansion_card_type[expansion]) {
        expansion_card_type[expansion][card_type] = checked;
      }
    }
  }
}

let loaded = false;

document.body.onload = function() {
  chrome.storage.sync.get(['inputArr'], function(item) {
    let inputArr = item.inputArr;
    Array.from(document.getElementsByTagName("input")).forEach(input => {
      if (inputArr != undefined && input.id in inputArr) {
        setExpCardType(input.id, inputArr[input.id]);
      } else {
        setExpCardType(input.id, true);
      }
    });
  });
  loaded = true;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!loaded) {
    sendResponse({ complete: false });
  } else {
    if (request.method == 'files') {
      sendResponse({ files: files, complete: true });
    } else if (request.method == 'expansions') {
      sendResponse({ expansions: expansion_card_type, complete: true });
    } else {
      setExpCardType(request.input_id, request.checked);
      chrome.tabs.reload(request.tab_id);
      sendResponse({ complete: true });
    } 
  }
});
