import Command from '../@types/Command';
import GameObject, { GameObjectTransform } from '../@types/GameObject';

class Game {
  canvas = <HTMLCanvasElement>document.getElementById('canvas');
  context: CanvasRenderingContext2D = this.canvas.getContext('2d');

  state: {
    players: GameObject[];
    fruits: GameObject[];
  } = { players: [], fruits: [] };

  constrains = (position: GameObjectTransform) => {
    position.x = Math.min(Math.max(position.x, 0), this.canvas.width - 1);
    position.y = Math.min(Math.max(position.y, 0), this.canvas.height - 1);

    return position;
  };

  acceptedMoves = {
    ArrowUp: (player: GameObject) => {
      console.info(`Moving #${player.id} -> UP`);

      player.transform = this.constrains({
        x: player.transform.x,
        y: player.transform.y - 1,
      });
    },

    ArrowDown: (player: GameObject) => {
      console.info(`Moving #${player.id} -> DOWN`);

      player.transform = this.constrains({
        x: player.transform.x,
        y: player.transform.y + 1,
      });
    },

    ArrowLeft: (player: GameObject) => {
      console.info(`Moving #${player.id} -> LEFT`);

      player.transform = this.constrains({
        x: player.transform.x - 1,
        y: player.transform.y,
      });
    },

    ArrowRight: (player: GameObject) => {
      console.info(`Moving #${player.id} -> RIGHT`);

      player.transform = this.constrains({
        x: player.transform.x + 1,
        y: player.transform.y,
      });
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
    const { playerID } = command;

    this.state.players = this.state.players.filter(
      (player) => player.id !== playerID,
    );
  };

  findPlayer = (command: Command) => {
    return this.state.players.find((player) => player.id === command.playerID);
  };

  addFruit = (command: Command) => {
    const { fruitID, fruitX, fruitY } = command;

    this.state.fruits.push({
      id: fruitID,
      transform: { x: fruitX, y: fruitY },
    });
  };

  removeFruit = (command: Command) => {
    const { fruitID } = command;

    this.state.fruits = this.state.fruits.filter(
      (fruit) => fruit.id !== fruitID,
    );
  };

  checkForFruitCollision = (playerID: string) => {
    const player = this.findPlayer({ playerID });
    const { fruits } = this.state;

    fruits.map((fruit: GameObject) => {
      console.log(`Checking ${player.id} and ${fruit.id}`);

      if (
        player.transform.x === fruit.transform.x &&
        player.transform.y === fruit.transform.y
      ) {
        console.log(`COLLISION between ${player.id} and ${fruit.id}`);
        this.removeFruit({
          fruitID: fruit.id,
        });
      }
    });
  };

  movePlayer = (command: Command) => {
    console.log(`Moving ${command.playerID} with ${command.keyPressed}`);

    const { playerID, keyPressed } = command;

    const player = this.findPlayer({ playerID });
    const moveFunction = this.acceptedMoves[keyPressed];

    if (player && typeof moveFunction === 'function') {
      moveFunction(player);
      this.checkForFruitCollision(playerID);
    }
  };

  renderScreen = () => {
    const { players, fruits } = this.state;

    // Clear Canvas Board
    this.context.fillStyle = 'white';
    this.context.clearRect(0, 0, 10, 10);

    // Renders each player & fruit
    players.map((player) => {
      this.context.fillStyle = 'black';
      this.context.fillRect(player.transform.x, player.transform.y, 1, 1);
    });

    fruits.map((fruit) => {
      this.context.fillStyle = 'green';
      this.context.fillRect(fruit.transform.x, fruit.transform.y, 1, 1);
    });

    requestAnimationFrame(this.renderScreen);
  };
}

export default Game;
