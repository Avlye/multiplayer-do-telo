import GameState from '../@types/GameState';
import GameObjectTransform from '../@types/GameTransform';

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

  acceptedMoves = {
    ArrowUp(player: GameObjectTransform) {
      console.log('Moving player UP');

      if (player.y - 1 >= 0) {
        player.y -= 1;
      }
    },

    ArrowDown(player: GameObjectTransform) {
      console.log('Moving player DOWN');

      if (player.y + 1 <= screen.height) {
        player.y += 1;
      }
    },

    ArrowLeft(player: GameObjectTransform) {
      console.log('Moving player LEFT');

      if (player.x - 1 >= 0) {
        player.x -= 1;
      }
    },

    ArrowRight(player: GameObjectTransform) {
      console.log('Moving player RIGHT');

      if (player.x + 1 <= screen.width) {
        player.x += 1;
      }
    },
  };

  movePlayer = (command: Command) => {
    console.log(`Moving ${command.playerID} with ${command.keyPressed}`);

    // command { playerID: string, keypressed: string }
    const { keyPressed, playerID } = command;

    // get { [`player1`] as player } from players object
    const { [playerID]: player } = this.state.players;

    const moveFunction = this.acceptedMoves[keyPressed];

    if (typeof moveFunction === 'function') {
      moveFunction(player);
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
