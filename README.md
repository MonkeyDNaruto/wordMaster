# Word Master Game

**Word Master** is a fun and engaging word guessing game where players try to guess the correct word by uncovering individual letters. The game tracks progress with a scoreboard and shows win/loss messages. It pulls the "word of the day" from an API to make the game different each time.

## Features

- **Scoreboard**: Displays the player's progress as they uncover letters of the word.
- **Responsive Design**: The game is fully responsive and works across various devices, with styles adjusting for smaller screens.
- **Animations**: Includes a rotating spiral animation and a rainbow text effect for winning messages.
- **Win/Loss Display**: Upon completion, a pop-up will appear to show the win or loss status, alongside an option to restart the game.
- **API Integration**: The game uses an external API (`https://words.dev-apis.com/word-of-the-day`) to fetch the word of the day.
- **Word Validation**: Users' guesses are validated using an API to check if they are valid words.
- **Dynamic Feedback**: Letters are marked as correct, close, or wrong, providing interactive feedback to players.

## Installation

1. Clone this repository or download the files.
2. Make sure you have the following files in the root directory:
   - `index.html` (This file contains the structure of the game)
   - `styles.css` (Styles for the layout and design)
   - `app.js` (JavaScript logic for handling the game mechanics)
3. Open `index.html` in your browser to play the game.

## Game Rules

- The objective of the game is to guess the correct word by uncovering the letters, one by one.
- The game uses the "word of the day" from the API, which is a 5-letter word.
- You have 6 attempts to guess the word correctly.
- For each guess, you will see the following feedback:
  - **Green**: The letter is in the correct position (correct guess).
  - **Yellow**: The letter is in the word but in the wrong position (close guess).
  - **Gray**: The letter is not in the word (wrong guess).
- The game ends either when you guess the word correctly or run out of attempts.

## Game Logic

- The game starts by fetching the "word of the day" from an external API.
- As you type, your guesses are displayed on the scoreboard.
- After submitting each guess:
  - The game checks if the guess is valid using the validation API.
  - The game provides feedback on the guess, marking letters as correct, close, or wrong.
- If you guess the word correctly, you win. If you run out of attempts, you lose.

## Technologies Used

- **HTML**: For the structure of the game.
- **CSS**: For styling the game interface, including:
  - **Responsive Design**: Adjusts the layout and font sizes for smaller screens.
  - **Animations**: Includes rotating spiral and rainbow text effects.
- **JavaScript**: For the game logic and interactivity:
  - Fetches the "word of the day" from an external API.
  - Handles word validation and feedback for each guess.
  - Manages game flow (starting, winning, losing, etc.).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.txt) file for details.

## Author

- **Nischal Shrestha** - [GitHub](https://github.com/MonkeyDNaruto)
