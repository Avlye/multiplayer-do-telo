import Game from './components/Game';
import Keyboard from './components/Keyboard';
import './scss/main.scss';

const game = new Game();
game.addPlayer({ playerID: 'player1', playerX: 0, playerY: 1 });

game.addFruit({ fruitsID: 'fruit1', fruitsX: 2, fruitsY: 1 });
game.addFruit({ fruitsID: 'fruit2', fruitsX: 3, fruitsY: 4 });

const keyboard = new Keyboard(game);

const keyboardListener = keyboard.createKeyboardListener();
keyboardListener.subscribe(game.movePlayer);

game.renderScreen();
