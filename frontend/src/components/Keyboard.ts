import Game from './Game';

class Keyboard {
  game: Game;
  currentPlayer = 'player1';

  constructor(game: Game) {
    this.game = game;
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const keyPressed = event.key;
    const player = this.game.players[this.currentPlayer];

    if (keyPressed === 'ArrowUp' && player.y - 1 >= 0) {
      player.y -= 1;
      return;
    }

    if (keyPressed === 'ArrowDown' && player.y + 1 < screen.height) {
      player.y += 1;
      return;
    }

    if (keyPressed === 'ArrowLeft' && player.x - 1 >= 0) {
      player.x -= 1;
      return;
    }

    if (keyPressed === 'ArrowRight' && player.x + 1 < screen.width) {
      player.x += 1;
      return;
    }
  };
}

export default Keyboard;
