const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const answerLength = 5;
const ROUNDS = 6;

async function init() {
  let currentGuess = "";
  let currentRow = 0;
  let isLoading = true;

  const res = await fetch("https://words.dev-apis.com/word-of-the-day?random=1");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  let done = false;
  setLoading(false);
  isLoading = false;

  function addLetter(letter) {
    if (currentGuess.length < answerLength) {
      currentGuess += letter;
    } else {
      // replace the last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[answerLength * currentRow + currentGuess.length - 1].innerText =
      letter;
  }

  async function commit() {
    if (currentGuess.length !== answerLength) {
      // do nothing
      return;
    }

    isLoading = true;
    setLoading(true);
    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });

    const resObj = await res.json();
    const validWord = resObj.validWord;

    isLoading = false;
    setLoading(false);

    if (!validWord) {
      markInvalidWord();
      return;
    }

    const guessPart = currentGuess.split("");
    const map = makeMap(word);

    for (let i = 0; i < answerLength; i++) {
      // mark correct
      if (guessPart[i] === word[i]) {
        letters[currentRow * answerLength + i].classList.add("correct");
        map[guessPart[i]]--;
      }
    }

    for (let i = 0; i < answerLength; i++) {
      if (guessPart[i] === word[i]) {
        // do nothing we already did
      } else if (word.includes(guessPart[i]) && map[guessPart[i]] > 0) {
        // mark as close
        letters[currentRow * answerLength + i].classList.add("close");
        map[guessPart[i]]--;
      } else {
        letters[currentRow * answerLength + i].classList.add("wrong");
      }
    }

    currentRow++;

    if (currentGuess === word) {
      // you win
      alert("You Win!");
      document.querySelector(".brand").classList.add("winner");
      done = true;
      return;
    } else if (currentRow === ROUNDS) {
      alert(`You loss, the word was ${word}`);
      done = true;
    }

    currentGuess = "";
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[answerLength * currentRow + currentGuess.length].innerText = "";
  }

  function markInvalidWord() {
    for (let i = 0; i < answerLength; i++) {
      letters[currentRow * answerLength + i].classList.remove("invalid");

      setTimeout(function () {
        letters[currentRow * answerLength + i].classList.add("invalid");
      }, 10);
    }
  }

  document.addEventListener("keydown", function haldleKeyPress(event) {
    if (done || isLoading) {
      // do nothing
      return;
    }

    const action = event.key;

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

function setLoading(isLoading) {
  loadingDiv.classList.toggle("show", isLoading);
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    let letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}

init();
