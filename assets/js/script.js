const CHAR_BANK = {
  ALPHABETS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ALPHABETS_LOWER: "abcdefghijklmnopqrstuvwxyz",
  SYMBOLS: "!@#$%^&*()-=,./?}{[]",
  NUMBERS: "0123456789",
};

const mapper = {
  0: "ALPHABETS",
  1: "ALPHABETS_LOWER",
  2: "SYMBOLS",
  3: "NUMBERS",
};

const outputField = document.querySelector(".generated-password");

const tweakers = {
  0: document.querySelector("#upper"),
  1: document.querySelector("#lower"),
  2: document.querySelector("#symbol"),
  3: document.querySelector("#number"),
};

const lengthDenoter = document.querySelector('#pass-length');
const lengthRangeField = document.querySelector("#pass-length-slider");
const generateBtn = document.querySelector(".generate-btn");
const copyBtn = document.querySelector(".copy-btn");


// ---------------- logic --------------------


if (generateBtn) {
  generateBtn.addEventListener("click", (e) => {
    callGenerator();
  });
}

if (copyBtn && outputField.value.length) {
  copyBtn.addEventListener('click', () => {
    outputField.focus();
    outputField.select();

    document.execCommand('copy');

    deselectText(outputField);
  });
}

if (lengthRangeField && lengthDenoter) {
  lengthDenoter.innerHTML = lengthRangeField.value;

  lengthRangeField.addEventListener('change', (e) => {
    lengthDenoter.innerHTML = e.target.value;
  });

  lengthRangeField.addEventListener('input', (e) => {
    lengthDenoter.innerHTML = e.target.value;
  });
}


// ----------------- functions -------------------


function callGenerator() {
  const characterPool = getCharacterPool(tweakers);
  const passwordLength = +lengthRangeField.value;
  const password = generatePassword(characterPool, passwordLength);

  if (password.length) {
    outputField.value = password;
  }
}

function getRandomNumber(n) {
  return Math.floor(Math.random() * n);
}

function getCharacterPool(tweakers) {
  let charPool = [];

  Object.keys(tweakers).forEach((id) => {
    if (tweakers[id].checked) {
      charPool = [...charPool, ...CHAR_BANK[mapper[id]]];
    }
  });

  return charPool;
}

function generatePassword(charPool, passwordLength) {
  const password = [];

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = getRandomNumber(charPool.length);
    password.push(charPool[randomIndex]);
  }

  return password.join('');
}

function deselectText(element) {
  if (element && /INPUT|TEXTAREA/i.test(element.tagName)) {
    if ('selectionStart' in element) {
      element.selectionEnd = element.selectionStart;
    }
    element.blur();
  }

  if (window.getSelection) { // All browsers, except IE <=8
    window.getSelection().removeAllRanges();
  } else if (document.selection) { // IE <=8
    document.selection.empty();
  }
}
