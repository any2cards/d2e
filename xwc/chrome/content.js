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
  'explorations.js',
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
  'references.js',
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
  "fs": "Forgotten Souls",
  "ni": "Nature's Ire",
  "de": "Dark Elements",
  "sotp": "Sands Of The Past",
  "uc": "User Community",
  "motd": "Maze Of The Drakon",
};

var expansion_card_type = {}

const repoBaseUrl = 'https://raw.githubusercontent.com/any2cards/d2e/master';
const imgUrl = `${repoBaseUrl}/images/`;
const dataUrl = `${repoBaseUrl}/data/`;
var iconUrl = ``;
if (chrome.extension != undefined) {
  iconUrl = chrome.runtime.getURL('icon-32.png');
} else {
  iconUrl = 'icon-32.png';
}
const ignoredNodes = ['TEXTAREA', 'INPUT'];

const xwcRed = '#e81e25';
const offset = 5;
const imagePadding = 4;
const classname = '__xwc-container';

// Put longer names first, so "Barghest Activation" matches before "Barghest"
const sortData = (a, b) => (a.length > b.length ? -1 : 1);

const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const tooltip = document.createElement('div');

const hideTooltip = () => {
  tooltip.classList.add('__xwc-tooltip-hidden');
};
const showTooltip = () => {
  tooltip.classList.remove('__xwc-tooltip-hidden');
};
const hide = el => {
  el.classList.add('__xwc-hidden');
};
const show = el => {
  el.classList.remove('__xwc-hidden');
};

const fetchDataFile = fileName =>
  {
    return fetch(dataUrl + fileName, { mode: 'cors' })
    .then(res => res.json());
  };

const processData = data => {
  return data.reduce((a, c) => {
    if (c.image) {
      const keys = [`${c.name} (${c.points})`, c.name];

      if (c.name.indexOf('"') > -1) {
        keys.push(c.name.replace(/"/g, ''));
      }

      keys.forEach(k => {
        const key = k.toLowerCase();
        a[key] = a[key] || [];
        a[key].push(c);
      });
    }
    return a;
  }, {});
};

const fetchAllData = async () =>
  Promise.all(files.map(file => fetchDataFile(file)))
    .then(values => [].concat.apply([], values))
    .then(processData);

const filterData = data => {
  let filtered = data;
  for (let key of Object.keys(filtered)) {
    var i = filtered[key].length
    while (i--) {
      let value = filtered[key][i];
      let expansion = value["expansion"];
      let image = value["image"];
      let card_type = image.substring(0, image.indexOf("/"));
      if (expansion in expansion_card_type) {
        if (card_type in expansion_card_type[expansion]) {
          if (expansion_card_type[expansion][card_type]) {
            continue;
          }
        }
      }
      filtered[key].splice(i, 1);
    }
    if (filtered[key].length == 0) {
      delete filtered[key];
    }
  }
  return filtered;
}

const deleteSpanNodes = () => {
  while (true) {
    const elements = Array.from(document.querySelectorAll("span." + classname));
    elements.forEach(e => {
      if (e.classList.length == 1 && e.classList[0] == classname) {
        let parent = e.parentNode;
        if (parent != null) {
          e.replaceWith(e.innerText);
          let html = parent.innerHTML;
          parent.innerHTML = html;
        }
      }
    });
    if (elements.length == 0) {
      break;
    }
  }
};

async function getData() {
  const data = await fetchAllData();
  cardsData = filterData(data);
  deleteSpanNodes();
  if (Object.keys(data).length > 0) {
    const regExp = new RegExp(generateRegExpString(data), 'ig');
    getTextNodes((parent, node) => replaceMatchesInNode(node, regExp));
  }
}

let stopInterval;

const getExpFromInputId = (input_id) => {
  let idx = input_id.indexOf("-");
  if (idx >= 0) {
    shortExp = input_id.substring(0, input_id.indexOf("-"));
    return expansion_conversion[shortExp];
  }
  return null;
}

const getTypeFromInputId = (input_id) => {
  let idx = input_id.indexOf("-");
  if (idx >= 0) {
    return input_id.substring(input_id.indexOf("-")+1);
  }
  return null;
}

async function loadFromStorage() {
  var inputArr = {};

	// Establish a default value for the extension in case storage is empty and/or this is the first time it is used
	// These values are in the Checkbox ID order for popup.html
	var extdefault = {
		"d2e": true,
		"ffg": true,
		"bg": true,
		"bg-agents": true,
		"bg-class-familiars": true,
		"bg-class-items": true,
		"bg-class-skills": true,
		"bg-conditions": true,
		"bg-heroes": true,
		"bg-lieutenants": true,
		"bg-map-pieces": true,
		"bg-monsters": true,
		"bg-overlord-decks": true,
		"bg-plot-decks": true,
		"bg-relics": true,
		"bg-search-deck": true,
		"bg-shop-items": true,
		"bg-travel-event-decks": true,
		"bg-turn-summary": true,
		"ck": true,
		"ck-familiars": true,
		"ck-heroes": true,
		"ck-monsters": true,
		"lw": true,
		"lw-advanced-quests": true,
		"lw-agents": true,
		"lw-class-familiars": true,
		"lw-class-items": true,
		"lw-class-skills": true,
		"lw-conditions": true,
		"lw-heroes": true,
		"lw-lieutenants": true,
		"lw-map-pieces": true,
		"lw-monsters": true,
		"lw-overlord-decks": true,
		"lw-plot-decks": true,
		"lw-relics": true,
		"lw-rumors": true,
		"lw-search-deck": true,
		"lw-secret-rooms": true,
		"lw-shop-items": true,
		"lw-travel-event-decks": true,
		"lr": true,
		"lr-agents": true,
		"lr-allies": true,
		"lr-ally-skills": true,
		"lr-class-familiars": true,
		"lr-class-items": true,
		"lr-class-skills": true,
		"lr-conditions": true,
		"lr-heroes": true,
		"lr-lieutenants": true,
		"lr-map-pieces": true,
		"lr-monsters": true,
		"lr-overlord-decks": true,
		"lr-plot-decks": true,
		"lr-relics": true,
		"lr-shop-items": true,
		"lr-travel-event-decks": true,
		"tf": true,
		"tf-advanced-quests": true,
		"tf-agents": true,
		"tf-class-items": true,
		"tf-class-skills": true,
		"tf-conditions": true,
		"tf-heroes": true,
		"tf-lieutenants": true,
		"tf-map-pieces": true,
		"tf-monsters": true,
		"tf-overlord-decks": true,
		"tf-plot-decks": true,
		"tf-relics": true,
		"tf-rumors": true,
		"tf-search-deck": true,
		"tf-secret-rooms": true,
		"tf-shop-items": true,
		"tf-travel-event-decks": true,
		"sn": true,
		"sn-agents": true,
		"sn-city-event-decks": true,
		"sn-class-familiars": true,
		"sn-class-items": true,
		"sn-class-skills": true,
		"sn-conditions": true,
		"sn-corrupt-citizens": true,
		"sn-heroes": true,
		"sn-lieutenants": true,
		"sn-map-pieces": true,
		"sn-monsters": true,
		"sn-overlord-decks": true,
		"sn-plot-decks": true,
		"sn-relics": true,
		"sn-shop-items": true,
		"mr": true,
		"mr-advanced-quests": true,
		"mr-agents": true,
		"mr-class-items": true,
		"mr-class-skills": true,
		"mr-conditions": true,
		"mr-heroes": true,
		"mr-lieutenants": true,
		"mr-map-pieces": true,
		"mr-monsters": true,
		"mr-overlord-decks": true,
		"mr-plot-decks": true,
		"mr-relics": true,
		"mr-rumors": true,
		"mr-servants": true,
		"mr-shop-items": true,
		"mb": true,
		"mb-agents": true,
		"mb-conditions": true,
		"mb-lieutenants": true,
		"mb-map-pieces": true,
		"mb-monsters": true,
		"mb-plot-decks": true,
		"mb-relics": true,
		"mb-shop-items": true,
		"mb-tainted": true,
		"mb-travel-event-decks": true,
		"cr": true,
		"cr-conditions": true,
		"cr-hybrid-class-skills": true,
		"cr-lieutenants": true,
		"cr-map-pieces": true,
		"cr-monsters": true,
		"cr-overlord-decks": true,
		"cr-relics": true,
		"cr-servants": true,
		"cr-shop-items": true,
		"cr-tainted": true,
		"cr-travel-event-decks": true,
		"oo": true,
		"oo-advanced-quests": true,
		"oo-heroes": true,
		"oo-monsters": true,
		"oo-overlord-decks": true,
		"oo-rumors": true,
		"cd": true,
		"cd-advanced-quests": true,
		"cd-heroes": true,
		"cd-monsters": true,
		"cd-overlord-decks": true,
		"cd-rumors": true,
		"cf": true,
		"cf-advanced-quests": true,
		"cf-heroes": true,
		"cf-monsters": true,
		"cf-overlord-decks": true,
		"cf-rumors": true,
		"gd": true,
		"gd-advanced-quests": true,
		"gd-heroes": true,
		"gd-monsters": true,
		"gd-overlord-decks": true,
		"gd-rumors": true,
		"vd": true,
		"vd-advanced-quests": true,
		"vd-heroes": true,
		"vd-monsters": true,
		"vd-overlord-decks": true,
		"vd-rumors": true,
		"bw": true,
		"bw-advanced-quests": true,
		"bw-familiars": true,
		"bw-heroes": true,
		"bw-monsters": true,
		"bw-overlord-decks": true,
		"bw-rumors": true,
		"tc": true,
		"tc-advanced-quests": true,
		"tc-heroes": true,
		"tc-monsters": true,
		"tc-overlord-decks": true,
		"tc-rumors": true,
		"ss": true,
		"ss-advanced-quests": true,
		"ss-heroes": true,
		"ss-monsters": true,
		"ss-overlord-decks": true,
		"ss-rumors": true,
		"se": true,
		"se-advanced-quests": true,
		"se-heroes": true,
		"se-monsters": true,
		"se-overlord-decks": true,
		"se-rumors": true,
		"ll": true,
		"ll-class-items": true,
		"ll-class-skills": true,
		"ll-hybrid-class-skills": true,
		"fs": true,
		"fs-explorations": true,
		"fs-monster-activations": true,
		"fs-perils": true,
		"fs-references": true,
		"ni": true,
		"ni-explorations": true,
		"ni-familiars": true,
		"ni-monster-activations": true,
		"ni-perils": true,
		"ni-references": true,
		"de": true,
		"de-explorations": true,
		"de-monster-activations": true,
		"de-perils": true,
		"de-references": true,
		"usrcom": true,
		"sotp": true,
		"sotp-advanced-quests": true,
		"sotp-agendas": true,
		"sotp-class-familiars": true,
		"sotp-class-items": true,
		"sotp-class-skills": true,
		"sotp-conditions": true,
		"sotp-heroes": true,
		"sotp-monster-activations": true,
		"sotp-monsters": true,
		"sotp-perils": true,
		"sotp-round-summary": true,
		"sotp-rumors": true,
		"sotp-search-deck": true,
		"sotp-shop-items": true,
		"sotp-statuses": true,
		"sotp-traps": true,
		"uc": true,
		"uc-heroes": true,
		"motd": true,
		"motd-familiars": true,
		"motd-heroes": true
	}
		
  chrome.storage.sync.get({['inputArr']: extdefault}, async function(item) {
    inputArr = item.inputArr;
    for (const [input_id, checked] of Object.entries(inputArr)) {
      let exp = getExpFromInputId(input_id);
      let type = getTypeFromInputId(input_id);
      if (exp == null || type == null) {
        continue;
      }
      if (expansion_card_type[exp] == null) {
        expansion_card_type[exp] = {};
      }
      expansion_card_type[exp][type] = checked;
    }
    await getData();
  });
}

let cardsData = {};
let allMatches = {};

let tooltipImgContainer;

const tooltipLoader = document.createElement('div');
tooltipLoader.classList.add('__xwc-loading-cube-grid');
hide(tooltipLoader);
tooltipLoader.innerHTML = `
  <div class="__xwc-loading-cube __xwc-loading-cube1"></div>
  <div class="__xwc-loading-cube __xwc-loading-cube2"></div>
  <div class="__xwc-loading-cube __xwc-loading-cube3"></div>
  <div class="__xwc-loading-cube __xwc-loading-cube4"></div>
  <div class="__xwc-loading-cube __xwc-loading-cube5"></div>
  <div class="__xwc-loading-cube __xwc-loading-cube6"></div>
  <div class="__xwc-loading-cube __xwc-loading-cube7"></div>
  <div class="__xwc-loading-cube __xwc-loading-cube8"></div>
  <div class="__xwc-loading-cube __xwc-loading-cube9"></div>
`;

const createTooltip = () => {
  tooltip.classList.add('__xwc-tooltip');
  hideTooltip();

  tooltip.appendChild(tooltipLoader);

  tooltipImgContainer = document.createElement('div');
  tooltipImgContainer.classList.add('__xwc-image-container');

  const tooltipLine = document.createElement('span');
  tooltipLine.innerHTML = `
        <p class="__xwc-powered-by">
            <img src="${iconUrl}" />
            Powered by D2e Card Viewer
        </p>
    `;

  tooltip.appendChild(tooltipImgContainer);
  tooltip.appendChild(tooltipLine);

  document.body.appendChild(tooltip);
};

const getTextNodes = fn => {
  const elements = Array.from(document.getElementsByTagName('*'));
  elements.forEach(e => {
    if (ignoredNodes.indexOf(e.nodeName) === -1) {
      Array.from(e.childNodes).forEach(c => {
        if (c.nodeType === Node.TEXT_NODE) {
          fn(e, c);
        }
      });
    }
  });
};

const replaceMatchesInNode = (node, regExp) => {
  let matches;

  while ((matches = regExp.exec(node.nodeValue)) !== null) {
    const match = matches[0];
    const lastIndex = regExp.lastIndex;

    const container = document.createElement('span');
    container.classList.add(classname);
    container.appendChild(document.createTextNode(match));

    const after = node.splitText(lastIndex - match.length);
    after.nodeValue = after.nodeValue.substring(match.length);
    node.parentNode.insertBefore(container, after);

    // Set up for next iteration
    node = after;
    regExp.lastIndex = 0;
  }
};

const throttle = (fn, threshhold = 250) => {
  let last;
  let deferTimer;

  return (...args) => {
    const context = this;
    const now = Date.now();

    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

var images = [];

const moveTooltip = (e) => {
  const windowRightBound = window.scrollX + window.innerWidth;
  let x = window.scrollX + e.clientX + offset;
  let y = window.scrollY + e.clientY + offset;
  var right = x + 20;
  var cardHeight = 0;
  for (let image of images) {
    right += image.width + imagePadding;
    if (image.height > cardHeight) {
      cardHeight = image.height;
    }
  }

  if (right > windowRightBound) {
    x = 0;
  }   
  if (x < 0) {
    x = 0;
  }

  var poweredby = 50;
  if (y + cardHeight + poweredby > window.scrollY + window.innerHeight) {
    y = y - (y + cardHeight + poweredby - (window.scrollY + window.innerHeight)) - 20;
  }

  if (y < 0) {
    y = 0;
  }

  tooltip.style.top = y + 'px';
  tooltip.style.left = x + 'px';
};

const generateRegExpString = data => {
  const start = '(?=^|\\s|\\b)(';
  const end = ')(?=s?(\\s|\\b|$))';
  const delimiter = '----';
  const r =
    start +
    escapeRegExp(
      Object.keys(data)
        .sort(sortData)
        .join(delimiter),
    ).replace(new RegExp(delimiter, 'g'), '|') +
    end;
  return r;
};

// Show the tooltip after entering the highlighted area
document.body.addEventListener(
  'mouseover',

  e => {
    const target = e.target;
    if (target && target != document && target.matches('.' + classname)) {
      const match = target.textContent;

      // Set to 1 because we'll have at least 1 match, so it gets taken into account when
      // positioning the tooltip -- see moveTooltip()

      show(tooltipLoader);
      tooltipImgContainer.innerHTML = '';
      
      // Update tooltip position
      moveTooltip(e);

      // Update tooltip image source
      let promises = [];
      images = [];

      if (cardsData[match.toLowerCase()] == undefined) {
        return;
      }

      cardsData[match.toLowerCase()].forEach(c => {
        const promise = new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = reject;
          image.src = imgUrl + c.image;
          hide(image);

          images.push(image);
          tooltipImgContainer.appendChild(image);
        });

        promises.push(promise);
      });

      // When all images are loaded; Hide loader and show images
      Promise.all(promises).then(() => {
        images.forEach(image => {
          // image.height = 'auto';
          // image.width = 'auto';
          show(image);
        });
        hide(tooltipLoader);
        // Update tooltip position
        moveTooltip(e);
      });

      showTooltip();
    }
  },
  false,
);

// Hide the tooltip after leaving the highlighted area
document.body.addEventListener(
  'mouseleave',
  e => {
    const target = e.target;
    if (target && target != document && target.matches('.' + classname)) {
      // Hide tooltip
      hideTooltip();
    }
  },
  true,
);

// Every 200ms update the tooltip position
document.body.addEventListener(
  'mousemove',
  throttle(e => {
    const target = e.target;
    if (target && target != document && target.matches('.' + classname)) {
      // Move tooltip
      if (!tooltip.classList.contains('__xwc-tooltip-hidden')) {
        moveTooltip(e);
      }
    }
  }, 200),
  true,
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == 'expansions_data') {
    expansion_card_type = request.expansions;
    sendResponse({ complete: true, from: "content" });
    getData();
  } else {
    sendResponse({ complete: false, from: "content" });
  } 
});

document.body.onload = function() {
  loadFromStorage();
  createTooltip();
}
