import GameObject from '../@types/GameObject';

class Game {
  screen: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById('screen')
  );

  context: CanvasRenderingContext2D = this.screen.getContext('2d')!;

  players: GameObject = {
    player1: { x: 1, y: 1 },
    player2: { x: 9, y: 4 },
  };

  fruits: GameObject = {
    fruit1: { x: 3, y: 1 },
    fruit2: { x: 6, y: 3 },
  };

  renderScreen = () => {
    this.context.fillStyle = 'white';
    this.context.clearRect(0, 0, 10, 10);

    for (const playerID in this.players) {
      let player = this.players[playerID];

      this.context.fillStyle = 'black';
      this.context.fillRect(player.x, player.y, 1, 1);
    }

    for (const fruitID in this.fruits) {
      const fruit = this.fruits[fruitID];

      this.context.fillStyle = 'green';
      this.context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    requestAnimationFrame(this.renderScreen);
  };
}

export default Game;
