import Game from './components/Game';
import Keyboard from './components/Keyboard';
import './scss/main.scss';

// Create Game! 😉
const game = new Game();

// Creating Players
game.addPlayer({ playerID: 'player1', playerX: 0, playerY: 1 });
game.addPlayer({ playerID: 'player2', playerX: 4, playerY: 1 });

// Creating Fruits
game.addFruit({ fruitID: 'fruit1', fruitX: 2, fruitY: 1 });
game.addFruit({ fruitID: 'fruit2', fruitX: 3, fruitY: 4 });

const keyboard = new Keyboard(game);
const keyboardListener = keyboard.createKeyboardListener();

// Subscribe game movemment into keyboardlistener
keyboardListener.subscribe(game.movePlayer);

// Looping into game rendering
game.renderScreen();
