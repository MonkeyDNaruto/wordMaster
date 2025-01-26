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

        console.log(action);

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

init();