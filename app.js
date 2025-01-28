const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const answerLength = 5;

async function init() {

    let currentGuess = '';
    let currentRow = 0;

    const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
    console.log(word)
    setLoading(false)

    function addLetter(letter) {
        if(currentGuess.length < answerLength) {
            currentGuess += letter;
        } else {
            // replace the last letter
            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
        }

        letters[answerLength * currentRow + currentGuess.length -1 ].innerText = letter; 
    }

    async function commit() {
        if(currentGuess.length !== answerLength) {
            // do nothing
            return;
        }

        // TODO validate the word

        // TODO do all the marking as "close", "wrong" or "correct"
        const guessPart = currentGuess.split("");
        const map = makeMap(word);
        console.log(map)

        for(let i = 0; i < answerLength; i++) {
            // mark correct
            if(guessPart[i] === word[i]) {
                letters[currentRow * answerLength + i].classList.add("correct");
                map[guessPart[i]]--;
            }
        }

        for(let i = 0; i < answerLength; i++) {
            if(guessPart[i] === word[i]) {
                // do nothing we already did 
            } else if(word.includes(guessPart[i]) && map[guessPart[i]] > 0) {
                // mark as close
                letters[currentRow * answerLength + i].classList.add("close");
                map[guessPart[i]]--;
            } else {
                letters[currentRow * answerLength + i].classList.add("wrong")
            }
        }

        // TODO did they win or loss?
        
        currentRow++;
        currentGuess = '';
    }

    function backspace() {
        currentGuess = currentGuess.substring(0, currentGuess.length - 1)
        letters[answerLength * currentRow + currentGuess.length].innerText = '';
    }
    

    document.addEventListener('keydown', function haldleKeyPress(event) {
        const action = event.key;

        if(action === 'Enter') {
            commit();
        } else if(action === 'Backspace') {
            backspace();
        } else if(isLetter(action)) {
            addLetter(action.toUpperCase());
        } else {
            // do nothing
        }
    })
}

function setLoading(isLoading) {
    loadingDiv.classList.toggle("show", isLoading)
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function makeMap(array) {
    const obj = {};
     for(let i = 0; i < array.length; i++) {
        let letter = array[i];
        if(obj[letter]) {
            obj[letter]++
        } else {
            obj[letter] = 1;
        }
     }
     return obj;
}

init();