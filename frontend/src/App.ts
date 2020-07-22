import Game from './components/Game';
import Keyboard from './components/Keyboard';
import './scss/main.scss';

const game = new Game();
game.addPlayer({ playerID: 'player1', playerX: 0, playerY: 1 });

const keyboard = new Keyboard(game);

const keyboardListener = keyboard.createKeyboardListener();
keyboardListener.subscribe(game.movePlayer);

game.renderScreen();
