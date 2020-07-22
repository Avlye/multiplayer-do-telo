import Command from '../@types/Command';
import GameObject from '../@types/GameObject';

class Game {
  canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById('canvas')
  );

  context: CanvasRenderingContext2D = this.canvas.getContext('2d');
  state: {
    players: GameObject[];
    fruits: GameObject[];
  } = {
    players: [{ id: 'player1', transform: { x: 1, y: 1 } }],
    fruits: [
      { id: 'fruit1', transform: { x: 1, y: 5 } },
      { id: 'fruit2', transform: { x: 9, y: 5 } },
    ],
  };

  acceptedMoves = {
    ArrowUp: (player: GameObject) => {
      console.log('Moving player UP');

      player.transform.y = Math.max(player.transform.y - 1, 0);
    },

    ArrowDown: (player: GameObject) => {
      console.log('Moving player DOWN');

      player.transform.y = Math.min(player.transform.y + 1, this.canvas.height);
    },

    ArrowLeft: (player: GameObject) => {
      console.log('Moving player LEFT');

      player.transform.x = Math.max(player.transform.x - 1, 0);
    },

    ArrowRight: (player: GameObject) => {
      console.log('Moving player RIGHT');

      player.transform.x = Math.min(player.transform.x + 1, this.canvas.width);
    },
  };

  movePlayer = (command: Command) => {
    console.log(`Moving ${command.playerID} with ${command.keyPressed}`);

    const { playerID, keyPressed } = command;
    const player = this.state.players.find((player) => player.id === playerID);

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
      this.context.fillRect(player.transform.x, player.transform.y, 1, 1);
    }

    for (const fruitID in fruits) {
      const fruit = fruits[fruitID];

      this.context.fillStyle = 'green';
      this.context.fillRect(fruit.transform.x, fruit.transform.y, 1, 1);
    }

    requestAnimationFrame(this.renderScreen);
  };
}

export default Game;
