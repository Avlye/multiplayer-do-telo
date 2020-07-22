import Game from './components/Game';
import Keyboard from './components/Keyboard';
import './scss/main.scss';

const game = new Game();
const keyboard = new Keyboard(game);

document.addEventListener('keydown', keyboard.handleKeyDown);
game.renderScreen();
