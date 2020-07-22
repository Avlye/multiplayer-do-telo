import Game from './Game';

class Keyboard {
  game: Game;
  currentPlayer = 'player1';

  constructor(game: Game) {
    this.game = game;
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const keyPressed = event.key;

    const command = {
      playerID: 'player1',
      keyPressed,
    };

    this.game.movePlayer(command);
  };
}

export default Keyboard;
