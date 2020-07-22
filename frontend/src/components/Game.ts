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
  } = { players: [], fruits: [] };

  acceptedMoves = {
    ArrowUp: (player: GameObject) => {
      console.log('Moving player UP');

      player.transform.y = Math.max(player.transform.y - 1, 0);
    },

    ArrowDown: (player: GameObject) => {
      console.log('Moving player DOWN');

      player.transform.y = Math.min(
        player.transform.y + 1,
        this.canvas.height - 1,
      );
    },

    ArrowLeft: (player: GameObject) => {
      console.log('Moving player LEFT');

      player.transform.x = Math.max(player.transform.x - 1, 0);
    },

    ArrowRight: (player: GameObject) => {
      console.log('Moving player RIGHT');

      player.transform.x = Math.min(
        player.transform.x + 1,
        this.canvas.width - 1,
      );
    },
  };

  addPlayer = (command: Command) => {
    const { playerID, playerX, playerY } = command;

    this.state.players.push({
      id: playerID,
      transform: { x: playerX, y: playerY },
    });
  };

  removePlayer = (command: Command) => {
    const { fruitsID } = command;

    this.state.fruits = this.state.fruits.filter(
      (fruit) => fruit.id !== fruitsID,
    );
  };

  addFruit = (command: Command) => {
    const { fruitsID, fruitsX, fruitsY } = command;

    this.state.fruits.push({
      id: fruitsID,
      transform: { x: fruitsX, y: fruitsY },
    });
  };

  removeFruit = (command: Command) => {
    const { playerID } = command;

    this.state.fruits = this.state.players.filter(
      (player) => player.id !== playerID,
    );
  };

  movePlayer = (command: Command) => {
    console.log(`Moving ${command.playerID} with ${command.keyPressed}`);

    const { playerID, keyPressed } = command;

    const player = this.state.players.find((p) => playerID === p.id);
    const moveFunction = this.acceptedMoves[keyPressed];

    if (player && typeof moveFunction === 'function') {
      moveFunction(player);
    }
  };

  renderScreen = () => {
    const { players, fruits } = this.state;

    this.context.fillStyle = 'white';
    this.context.clearRect(0, 0, 10, 10);

    players.forEach((player) => {
      this.context.fillStyle = 'black';
      this.context.fillRect(player.transform.x, player.transform.y, 1, 1);
    });

    fruits.forEach((fruit) => {
      this.context.fillStyle = 'green';
      this.context.fillRect(fruit.transform.x, fruit.transform.y, 1, 1);
    });

    requestAnimationFrame(this.renderScreen);
  };
}

export default Game;
