const STATES = [
  { code: "WA", name: "Washington", col: 1, row: 1 },
  { code: "OR", name: "Oregon", col: 1, row: 2 },
  { code: "CA", name: "California", col: 1, row: 4 },
  { code: "ID", name: "Idaho", col: 2, row: 2 },
  { code: "NV", name: "Nevada", col: 2, row: 3 },
  { code: "AZ", name: "Arizona", col: 2, row: 5 },
  { code: "MT", name: "Montana", col: 3, row: 1 },
  { code: "WY", name: "Wyoming", col: 3, row: 2 },
  { code: "UT", name: "Utah", col: 3, row: 4 },
  { code: "NM", name: "New Mexico", col: 3, row: 5 },
  { code: "CO", name: "Colorado", col: 4, row: 4 },
  { code: "ND", name: "North Dakota", col: 5, row: 1 },
  { code: "SD", name: "South Dakota", col: 5, row: 2 },
  { code: "NE", name: "Nebraska", col: 5, row: 3 },
  { code: "KS", name: "Kansas", col: 5, row: 4 },
  { code: "OK", name: "Oklahoma", col: 5, row: 5 },
  { code: "TX", name: "Texas", col: 5, row: 6 },
  { code: "MN", name: "Minnesota", col: 6, row: 1 },
  { code: "IA", name: "Iowa", col: 6, row: 2 },
  { code: "MO", name: "Missouri", col: 6, row: 4 },
  { code: "AR", name: "Arkansas", col: 6, row: 5 },
  { code: "LA", name: "Louisiana", col: 6, row: 6 },
  { code: "WI", name: "Wisconsin", col: 7, row: 1 },
  { code: "IL", name: "Illinois", col: 7, row: 3 },
  { code: "MS", name: "Mississippi", col: 7, row: 6 },
  { code: "MI", name: "Michigan", col: 8, row: 1 },
  { code: "IN", name: "Indiana", col: 8, row: 3 },
  { code: "KY", name: "Kentucky", col: 8, row: 4 },
  { code: "TN", name: "Tennessee", col: 8, row: 5 },
  { code: "AL", name: "Alabama", col: 8, row: 6 },
  { code: "OH", name: "Ohio", col: 9, row: 3 },
  { code: "WV", name: "West Virginia", col: 9, row: 4 },
  { code: "GA", name: "Georgia", col: 9, row: 6 },
  { code: "PA", name: "Pennsylvania", col: 10, row: 3 },
  { code: "VA", name: "Virginia", col: 10, row: 4 },
  { code: "NC", name: "North Carolina", col: 10, row: 5 },
  { code: "SC", name: "South Carolina", col: 10, row: 6 },
  { code: "FL", name: "Florida", col: 11, row: 7 },
  { code: "NY", name: "New York", col: 11, row: 2 },
  { code: "VT", name: "Vermont", col: 12, row: 1 },
  { code: "NJ", name: "New Jersey", col: 12, row: 3 },
  { code: "MD", name: "Maryland", col: 12, row: 4 },
  { code: "DE", name: "Delaware", col: 12, row: 5 },
  { code: "NH", name: "New Hampshire", col: 13, row: 1 },
  { code: "MA", name: "Massachusetts", col: 13, row: 2 },
  { code: "CT", name: "Connecticut", col: 13, row: 3 },
  { code: "RI", name: "Rhode Island", col: 13, row: 4 },
  { code: "ME", name: "Maine", col: 14, row: 1 },
];

const sortedStates = [...STATES].sort((a, b) => a.name.localeCompare(b.name));
const stateByCode = Object.fromEntries(STATES.map((state) => [state.code, state]));
const STORAGE_KEY = "vs-staten-oefenen-selectie";
const LABELS_STORAGE_KEY = "vs-staten-oefenen-afkortingen";
const PLAYER_STORAGE_KEY = "vs-staten-oefenen-speler";
const MODE_STORAGE_KEY = "vs-staten-oefenen-modus";
const HARD_STATES_STORAGE_KEY = "vs-staten-oefenen-moeilijke-staten";
const SVG_NS = "http://www.w3.org/2000/svg";
const batches = [
  {
    title: "Set 1",
    label: "Westen",
    codes: ["WA", "OR", "CA", "ID", "NV", "AZ", "MT", "WY", "UT", "NM"],
  },
  {
    title: "Set 2",
    label: "Rockies en vlaktes",
    codes: ["CO", "ND", "SD", "NE", "KS", "OK", "TX", "MN", "IA", "MO"],
  },
  {
    title: "Set 3",
    label: "Midden en zuiden",
    codes: ["WI", "IL", "MI", "IN", "OH", "KY", "TN", "AR", "LA", "MS"],
  },
  {
    title: "Set 4",
    label: "Zuidoost en kust",
    codes: ["AL", "GA", "FL", "SC", "NC", "VA", "WV", "MD", "DE", "PA"],
  },
  {
    title: "Set 5",
    label: "Noordoost",
    codes: ["NY", "NJ", "CT", "RI", "MA", "VT", "NH", "ME"],
  },
].map((batch) => ({
  ...batch,
  states: batch.codes.map((code) => stateByCode[code]),
}));
const batchByCode = new Map(
  batches.flatMap((batch, index) => batch.codes.map((code) => [code, index + 1]))
);

const ui = {
  batchGrid: document.querySelector("#batchGrid"),
  clearBtn: document.querySelector("#clearBtn"),
  labelToggle: document.querySelector("#labelToggle"),
  mapGrid: document.querySelector("#mapGrid"),
  playerForm: document.querySelector("#playerForm"),
  playerGreeting: document.querySelector("#playerGreeting"),
  playerNameInput: document.querySelector("#playerNameInput"),
  practiceModeInputs: document.querySelectorAll('input[name="practiceMode"]'),
  progressText: document.querySelector("#progressText"),
  promptText: document.querySelector("#promptText"),
  repeatBtn: document.querySelector("#repeatBtn"),
  roundLabel: document.querySelector("#roundLabel"),
  scoreText: document.querySelector("#scoreText"),
  searchInput: document.querySelector("#searchInput"),
  selectAllBtn: document.querySelector("#selectAllBtn"),
  selectedCount: document.querySelector("#selectedCount"),
  selectedTags: document.querySelector("#selectedTags"),
  selectionText: document.querySelector("#selectionText"),
  shuffleBtn: document.querySelector("#shuffleBtn"),
  startBtn: document.querySelector("#startBtn"),
  stateList: document.querySelector("#stateList"),
  streakText: document.querySelector("#streakText"),
  typedAnswer: document.querySelector("#typedAnswer"),
  typingForm: document.querySelector("#typingForm"),
  typingMessage: document.querySelector("#typingMessage"),
  typingSubmit: document.querySelector("#typingSubmit"),
};

let selected = new Set(loadSelection());
let labelsVisible = loadLabelPreference();
let playerName = loadPlayerName();
let practiceMode = loadPracticeMode();
let hardStates = new Set(loadHardStates());
let searchTerm = "";
let feedback = null;
let typingMessage = "";
let session = createEmptySession();
let mapSvg = null;
let mapElements = new Map();
let audioContext = null;

function createEmptySession() {
  return {
    active: false,
    order: [],
    index: 0,
    correct: 0,
    attempts: 0,
    isReview: false,
    streak: 0,
    done: new Set(),
    firstTryCorrect: new Set(),
    missedInRound: new Set(),
  };
}

function loadSelection() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const validCodes = new Set(STATES.map((state) => state.code));
    const cleaned = saved.filter((code) => validCodes.has(code));

    if (cleaned.length) {
      return cleaned;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return batches[0].codes;
}

function saveSelection() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]));
}

function loadHardStates() {
  try {
    const saved = JSON.parse(localStorage.getItem(HARD_STATES_STORAGE_KEY) || "[]");
    const validCodes = new Set(STATES.map((state) => state.code));
    return saved.filter((code) => validCodes.has(code));
  } catch {
    localStorage.removeItem(HARD_STATES_STORAGE_KEY);
    return [];
  }
}

function saveHardStates() {
  localStorage.setItem(HARD_STATES_STORAGE_KEY, JSON.stringify([...hardStates]));
}

function selectedHardCodes() {
  return [...hardStates].filter((code) => selected.has(code));
}

function loadLabelPreference() {
  return localStorage.getItem(LABELS_STORAGE_KEY) !== "off";
}

function saveLabelPreference() {
  localStorage.setItem(LABELS_STORAGE_KEY, labelsVisible ? "on" : "off");
}

function loadPlayerName() {
  return localStorage.getItem(PLAYER_STORAGE_KEY)?.trim() || "";
}

function savePlayerName() {
  if (playerName) {
    localStorage.setItem(PLAYER_STORAGE_KEY, playerName);
  } else {
    localStorage.removeItem(PLAYER_STORAGE_KEY);
  }
}

function loadPracticeMode() {
  const savedMode = localStorage.getItem(MODE_STORAGE_KEY);
  return savedMode === "type" ? "type" : "click";
}

function savePracticeMode() {
  localStorage.setItem(MODE_STORAGE_KEY, practiceMode);
}

function updatePracticeMode() {
  ui.practiceModeInputs.forEach((input) => {
    input.checked = input.value === practiceMode;
  });

  ui.typingForm.classList.toggle("typing-hidden", practiceMode !== "type");
  ui.mapGrid.classList.toggle("typing-mode", practiceMode === "type");
}

function updateLabelVisibility() {
  ui.mapGrid.classList.toggle("labels-hidden", !labelsVisible);

  if (ui.labelToggle) {
    ui.labelToggle.checked = labelsVisible;
  }
}

function renderPlayer() {
  if (ui.playerGreeting) {
    ui.playerGreeting.textContent = playerName
      ? `Veel succes, ${playerName}!`
      : "Wie speelt er vandaag?";
  }

  if (ui.playerNameInput && document.activeElement !== ui.playerNameInput) {
    ui.playerNameInput.value = playerName;
  }
}

function shuffle(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function playTone({ frequency, start, duration, type = "sine", volume = 0.08 }) {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const startTime = context.currentTime + start;
  const endTime = startTime + duration;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(endTime + 0.02);
}

function playCorrectSound() {
  playTone({ frequency: 587.33, start: 0, duration: 0.11, volume: 0.1 });
  playTone({ frequency: 783.99, start: 0.08, duration: 0.14, volume: 0.11 });
  playTone({ frequency: 1174.66, start: 0.2, duration: 0.22, volume: 0.1 });
}

function playWrongSound() {
  playTone({ frequency: 220, start: 0, duration: 0.22, type: "sawtooth", volume: 0.18 });
  playTone({ frequency: 146.83, start: 0.13, duration: 0.3, type: "triangle", volume: 0.16 });
}

function currentCode() {
  return session.order[session.index] || null;
}

function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
}

function typoAllowance(value) {
  if (value.length <= 4) return 1;
  if (value.length <= 7) return 2;
  return 3;
}

function damerauLevenshtein(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i;
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );

      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + 1);
      }
    }
  }

  return matrix[a.length][b.length];
}

function findClosestState(value) {
  const normalized = normalizeAnswer(value);

  if (!normalized) {
    return null;
  }

  let best = null;

  STATES.forEach((state) => {
    const name = normalizeAnswer(state.name);
    const code = normalizeAnswer(state.code);
    const distance = Math.min(
      damerauLevenshtein(normalized, name),
      normalized.length <= 3 ? damerauLevenshtein(normalized, code) : Number.POSITIVE_INFINITY
    );

    if (!best || distance < best.distance) {
      best = { state, distance };
    }
  });

  return best;
}

function isTypedAnswerCorrect(value, targetCode) {
  const normalized = normalizeAnswer(value);
  const target = stateByCode[targetCode];

  if (!normalized || !target) {
    return false;
  }

  const targetName = normalizeAnswer(target.name);
  const targetAbbr = normalizeAnswer(target.code);

  if (normalized === targetName || normalized === targetAbbr) {
    return true;
  }

  const distance = damerauLevenshtein(normalized, targetName);
  return distance <= typoAllowance(targetName) && Math.abs(normalized.length - targetName.length) <= typoAllowance(targetName);
}

function setSelection(codes) {
  selected = new Set(codes);
  session = createEmptySession();
  feedback = null;
  typingMessage = "";
  saveSelection();
  render();
}

function toggleBatchSelection(codes) {
  const batchIsSelected = codes.every((code) => selected.has(code));

  if (batchIsSelected) {
    codes.forEach((code) => selected.delete(code));
  } else {
    codes.forEach((code) => selected.add(code));
  }

  session = createEmptySession();
  feedback = null;
  typingMessage = "";
  saveSelection();
  render();
}

function toggleState(code) {
  if (selected.has(code)) {
    selected.delete(code);
  } else {
    selected.add(code);
  }

  session = createEmptySession();
  feedback = null;
  typingMessage = "";
  saveSelection();
  render();
}

function startSessionWith(codes, isReview = false) {
  const cleanCodes = codes.filter((code) => stateByCode[code]);

  if (!cleanCodes.length) {
    ui.promptText.textContent = "Kies eerst minimaal 1 staat.";
    return;
  }

  session = {
    active: true,
    order: shuffle(cleanCodes),
    index: 0,
    correct: 0,
    attempts: 0,
    isReview,
    streak: 0,
    done: new Set(),
    firstTryCorrect: new Set(),
    missedInRound: new Set(),
  };
  feedback = null;
  typingMessage = "";
  ui.typedAnswer.value = "";
  render();

  if (practiceMode === "type") {
    ui.typedAnswer?.focus();
  }
}

function startSession() {
  startSessionWith([...selected], false);
}

function startReviewSession() {
  const reviewCodes = selectedHardCodes();

  if (!reviewCodes.length) {
    ui.roundLabel.textContent = "Geen herhaalronde nodig";
    ui.promptText.textContent = "Deze gekozen staten zitten er al goed in.";
    return;
  }

  startSessionWith(reviewCodes, true);
}

function markCorrect(code) {
  const hadMistake = session.missedInRound.has(code);
  session.attempts += 1;
  session.correct += 1;
  session.streak += 1;
  session.done.add(code);
  if (!hadMistake) {
    session.firstTryCorrect.add(code);
  }
  if (!hadMistake) {
    hardStates.delete(code);
    saveHardStates();
  }
  feedback = { code, type: "correct", hintCode: null };
  typingMessage = "Yes, goed.";
  ui.typedAnswer.value = "";
  playCorrectSound();
  render();

  window.setTimeout(() => {
    session.index += 1;
    feedback = null;
    typingMessage = "";

    if (session.index >= session.order.length) {
      session.active = false;
    }

    render();
  }, 620);
}

function markWrong(code, target, message = "Bijna. Kijk nog eens goed.") {
  session.attempts += 1;
  session.streak = 0;
  session.missedInRound.add(target);
  hardStates.add(target);
  saveHardStates();
  feedback = { code: code || target, type: "wrong", hintCode: target };
  typingMessage = message;
  playWrongSound();
  render();

  window.setTimeout(() => {
    if (feedback?.type === "wrong" && feedback?.hintCode === target) {
      feedback = null;
      typingMessage = "";
      render();
    }
  }, 1300);
}

function answer(code) {
  if (!session.active) {
    toggleState(code);
    return;
  }

  if (practiceMode !== "click") {
    typingMessage = "Je staat op Typen. Gebruik het antwoordveld.";
    renderStatus();
    return;
  }

  const target = currentCode();

  if (!target) {
    return;
  }

  if (code === target) {
    markCorrect(code);
  } else {
    markWrong(code, target);
  }
}

function submitTypedAnswer(event) {
  event.preventDefault();

  if (practiceMode !== "type") {
    typingMessage = "Kies eerst Typen als oefenstand.";
    renderStatus();
    return;
  }

  if (!session.active) {
    typingMessage = "Start eerst een ronde.";
    renderStatus();
    return;
  }

  const target = currentCode();
  const typedValue = ui.typedAnswer.value;
  const closestState = findClosestState(typedValue)?.state;

  if (!target || !typedValue.trim()) {
    typingMessage = "Typ eerst iets in.";
    renderStatus();
    return;
  }

  if (isTypedAnswerCorrect(typedValue, target)) {
    markCorrect(target);
    return;
  }

  const message = closestState
    ? `Dat is ${closestState.name}. Zoek de zwarte staat.`
    : "Die herken ik niet. Probeer het nog eens.";
  markWrong(closestState?.code || null, target, message);
}

async function loadRealMap() {
  try {
    if (!ui.mapGrid.querySelector("svg")) {
      const response = await fetch("us-map.svg");

      if (!response.ok) {
        throw new Error("De kaart kon niet worden geladen.");
      }

      ui.mapGrid.innerHTML = await response.text();
    }

    mapSvg = ui.mapGrid.querySelector("svg");

    if (!mapSvg) {
      throw new Error("De kaart bevat geen SVG.");
    }

    mapSvg.classList.add("us-map");
    mapSvg.setAttribute("role", "img");
    mapSvg.setAttribute("aria-label", "Kaart van de aangrenzende Verenigde Staten");
    mapSvg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    if (!mapSvg.getAttribute("viewBox")) {
      mapSvg.setAttribute("viewBox", "0 0 959 593");
    }

    ["AK", "HI", "DC", "path57"].forEach((id) => {
      mapSvg.querySelector(`#${id}`)?.remove();
    });

    mapElements = new Map();

    STATES.forEach((state) => {
      const element = mapSvg.querySelector(`#${state.code}`);

      if (!element) {
        return;
      }

      element.classList.add("state", `region-${batchByCode.get(state.code)}`);
      element.setAttribute("tabindex", "0");
      element.setAttribute("role", "button");
      element.setAttribute("aria-label", state.name);
      element.setAttribute("data-code", state.code);
      element.setAttribute("data-name", state.name);
      element.setAttribute("data-region", String(batchByCode.get(state.code)));
      element.querySelector("title")?.remove();

      const title = document.createElementNS(SVG_NS, "title");
      title.textContent = state.name;
      element.prepend(title);

      element.addEventListener("click", () => answer(state.code));
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          answer(state.code);
        }
      });

      mapElements.set(state.code, element);
    });

    fitMapToMainland();
    addStateLabels();
    updateLabelVisibility();
    renderMap();
  } catch (error) {
    ui.mapGrid.innerHTML = `
      <div class="map-loading">
        De kaart kon niet laden. Controleer of us-map.svg naast index.html staat.
      </div>
    `;
    console.error(error);
  }
}

function fitMapToMainland() {
  const boxes = [...mapElements.values()].map((element) => element.getBBox());
  const x1 = Math.min(...boxes.map((box) => box.x));
  const y1 = Math.min(...boxes.map((box) => box.y));
  const x2 = Math.max(...boxes.map((box) => box.x + box.width));
  const y2 = Math.max(...boxes.map((box) => box.y + box.height));
  const padding = 18;

  mapSvg.setAttribute(
    "viewBox",
    `${x1 - padding} ${y1 - padding} ${x2 - x1 + padding * 2} ${y2 - y1 + padding * 2}`
  );
}

function addStateLabels() {
  const oldLayer = mapSvg.querySelector("#stateLabels");
  oldLayer?.remove();

  const labelLayer = document.createElementNS(SVG_NS, "g");
  labelLayer.setAttribute("id", "stateLabels");

  STATES.forEach((state) => {
    const element = mapElements.get(state.code);

    if (!element) {
      return;
    }

    const box = element.getBBox();
    const label = document.createElementNS(SVG_NS, "text");
    label.classList.add("state-label");

    if (box.width < 32 || box.height < 22) {
      label.classList.add("small");
    }

    label.setAttribute("data-code", state.code);
    label.setAttribute("x", String(box.x + box.width / 2));
    label.setAttribute("y", String(box.y + box.height / 2));
    label.textContent = state.code;
    labelLayer.append(label);
  });

  mapSvg.append(labelLayer);
}

function renderBatches() {
  ui.batchGrid.replaceChildren(
    ...batches.map((batch) => {
      const active = batch.codes.every((code) => selected.has(code));
      const button = document.createElement("button");
      button.type = "button";
      button.className = `batch-btn${active ? " active" : ""}`;
      button.innerHTML = `
        <span><strong>${batch.title}</strong><br>${batch.label}</span>
        <span>${active ? "aan" : batch.codes.length}</span>
      `;
      button.addEventListener("click", () => toggleBatchSelection(batch.codes));
      return button;
    })
  );
}

function renderStateList() {
  const normalized = searchTerm.trim().toLowerCase();
  const rows = sortedStates
    .filter((state) => {
      return (
        !normalized ||
        state.name.toLowerCase().includes(normalized) ||
        state.code.toLowerCase().includes(normalized)
      );
    })
    .map((state) => {
      const button = document.createElement("button");
      const isSelected = selected.has(state.code);
      button.type = "button";
      button.className = `state-row${isSelected ? " selected" : ""}`;
      button.setAttribute("aria-pressed", String(isSelected));
      button.innerHTML = `
        <span class="state-main">
          <strong>${state.name}</strong>
          <span class="state-code">${state.code}</span>
        </span>
        <span class="check" aria-hidden="true"></span>
      `;
      button.addEventListener("click", () => toggleState(state.code));
      return button;
    });

  ui.stateList.replaceChildren(...rows);
}

function renderMap() {
  STATES.forEach((state) => {
    const element = mapElements.get(state.code);

    if (!element) {
      return;
    }

    const isSelected = selected.has(state.code);
    const isDone = session.done.has(state.code);
    const isFeedback = feedback?.code === state.code;
    const isHint = feedback?.hintCode === state.code;
    const isTypingTarget =
      session.active && practiceMode === "type" && currentCode() === state.code;

    element.classList.toggle("selected", isSelected);
    element.classList.toggle("dimmed", !isSelected && selected.size > 0);
    element.classList.toggle("done", isDone);
    element.classList.toggle("correct", isFeedback && feedback.type === "correct");
    element.classList.toggle("wrong", isFeedback && feedback.type === "wrong");
    element.classList.toggle("hint", isHint);
    element.classList.toggle("typing-target", isTypingTarget);

    mapSvg
      ?.querySelector(`.state-label[data-code="${state.code}"]`)
      ?.classList.toggle("typing-target-label", isTypingTarget);
  });
}

function renderStatus() {
  const total = session.order.length || selected.size;
  const progress = session.done.size;
  const activeCode = currentCode();
  const activeState = activeCode ? stateByCode[activeCode] : null;
  const selectedStates = sortedStates.filter((state) => selected.has(state.code));
  const firstTry = session.firstTryCorrect.size;
  const needsPractice = selectedHardCodes().length;

  ui.selectedCount.textContent = `${selected.size} gekozen`;
  ui.progressText.textContent = `Gedaan ${progress}/${total}`;
  ui.scoreText.textContent = `Direct goed ${firstTry}`;
  ui.streakText.textContent = `Nog lastig ${needsPractice}`;

  ui.startBtn.textContent = session.active ? "Herstart" : "Start ronde";
  ui.shuffleBtn.disabled = !selected.size;
  ui.repeatBtn.classList.toggle("is-hidden", needsPractice === 0);
  ui.repeatBtn.disabled = session.active || needsPractice === 0;
  ui.repeatBtn.textContent = `Herhaal moeilijke staten${needsPractice ? ` (${needsPractice})` : ""}`;
  ui.typedAnswer.disabled = !session.active || practiceMode !== "type";
  ui.typingSubmit.disabled = !session.active || practiceMode !== "type";
  ui.typingMessage.textContent =
    typingMessage ||
    (session.active && practiceMode === "type"
      ? "Typ de staat of afkorting. Spelling mag een beetje afwijken."
      : "");

  if (session.active && activeState) {
    const modeLabel = practiceMode === "type" ? "Typen" : "Klikken";
    ui.roundLabel.textContent = `${modeLabel} - ${session.index + 1} van ${session.order.length}`;
    ui.promptText.textContent =
      practiceMode === "type"
        ? "Welke zwarte staat is dit?"
        : `Zoek: ${activeState.name}`;
  } else if (session.order.length && session.index >= session.order.length) {
    ui.roundLabel.textContent = "Ronde klaar";
    if (session.isReview && needsPractice > 0) {
      ui.promptText.textContent = `Nog ${needsPractice} lastige over. Nog een keer?`;
    } else if (session.isReview) {
      ui.promptText.textContent = "Mooi, je hebt er weer een paar gefixt.";
    } else if (needsPractice > 0) {
      ui.promptText.textContent = `Deze staten oefenen we nog even: ${needsPractice}`;
    } else {
      ui.promptText.textContent = "Goed bezig. Alles zit erin.";
    }
  } else if (selected.size) {
    ui.roundLabel.textContent = "Klaar voor een ronde?";
    ui.promptText.textContent = "Kies klikken of typen en ga ervoor.";
  } else {
    ui.roundLabel.textContent = "Geen staten gekozen";
    ui.promptText.textContent = "Kies een paar staten en bouw je ronde.";
  }

  if (selectedStates.length) {
    const firstFew = selectedStates.slice(0, 4).map((state) => state.name).join(", ");
    const rest = selectedStates.length > 4 ? ` +${selectedStates.length - 4}` : "";
    ui.selectionText.textContent = `Je oefent nu ${selectedStates.length}: ${firstFew}${rest}.`;
  } else {
    ui.selectionText.textContent = "Nog geen staten in deze set.";
  }

  ui.selectedTags.replaceChildren(
    ...selectedStates.slice(0, 12).map((state) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = state.code;
      return tag;
    })
  );
}

function render() {
  renderBatches();
  renderStateList();
  renderMap();
  renderPlayer();
  renderStatus();
  updatePracticeMode();
  updateLabelVisibility();
}

ui.startBtn.addEventListener("click", startSession);
ui.shuffleBtn.addEventListener("click", startSession);
ui.repeatBtn.addEventListener("click", startReviewSession);
ui.selectAllBtn.addEventListener("click", () => setSelection(STATES.map((state) => state.code)));
ui.clearBtn.addEventListener("click", () => setSelection([]));
ui.labelToggle?.addEventListener("change", (event) => {
  labelsVisible = event.target.checked;
  saveLabelPreference();
  updateLabelVisibility();
});
ui.practiceModeInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    if (!event.target.checked) {
      return;
    }

    practiceMode = event.target.value;
    feedback = null;
    typingMessage = "";
    ui.typedAnswer.value = "";
    savePracticeMode();
    render();

    if (practiceMode === "type" && session.active) {
      ui.typedAnswer.focus();
    }
  });
});
ui.playerForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  playerName = ui.playerNameInput.value.trim();
  savePlayerName();
  renderPlayer();
  ui.startBtn.focus();
});
ui.typingForm?.addEventListener("submit", submitTypedAnswer);
ui.searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  renderStateList();
});

if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

render();
loadRealMap();
