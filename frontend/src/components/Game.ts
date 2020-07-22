import GameState from '../@types/GameState';

class Game {
  screen: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById('screen')
  );

  context: CanvasRenderingContext2D = this.screen.getContext('2d');

  // TODO: Add players, fruits dynamically
  state: GameState = {
    players: {
      player1: { x: 1, y: 1 },
      player2: { x: 3, y: 3 },
    },
    fruits: {
      fruit1: { x: 3, y: 1 },
      fruit2: { x: 4, y: 4 },
    },
  };

  movePlayer = (command: Command) => {
    console.log(`Moving ${command.playerID} with ${command.keyPressed}`);

    // command { playerID: string, keypressed: string }
    const { keyPressed, playerID } = command;

    // get { [`player1`] as player } from players object
    const { [playerID]: player } = this.state.players;

    if (keyPressed === 'ArrowUp' && player.y - 1 >= 0) {
      player.y = player.y - 1;
      return;
    }

    if (keyPressed === 'ArrowLeft' && player.x - 1 >= 0) {
      player.x = player.x - 1;
      return;
    }

    if (keyPressed === 'ArrowDown' && player.y + 1 <= screen.height) {
      player.y = player.y + 1;
      return;
    }

    if (keyPressed === 'ArrowRight' && player.x + 1 <= screen.width) {
      player.x = player.x + 1;
      return;
    }
  };

  renderScreen = () => {
    const { players, fruits } = this.state;

    this.context.fillStyle = 'white';
    this.context.clearRect(0, 0, 10, 10);

    for (const playerID in players) {
      let player = players[playerID];

      this.context.fillStyle = 'black';
      this.context.fillRect(player.x, player.y, 1, 1);
    }

    for (const fruitID in fruits) {
      const fruit = fruits[fruitID];

      this.context.fillStyle = 'green';
      this.context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    requestAnimationFrame(this.renderScreen);
  };
}

export default Game;
