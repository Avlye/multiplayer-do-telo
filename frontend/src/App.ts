// Loads global stylesheet
import './scss/main.scss';

const screen = <HTMLCanvasElement>document.getElementById('screen');
const context = screen.getContext('2d');

const currentPlayer = 'player1';

interface Game {
  players: {
    [key: string]: {
      x: number;
      y: number;
    };
  };

  fruits: {
    [key: string]: {
      x: number;
      y: number;
    };
  };
}

const game: Game = {
  players: {
    player1: { x: 1, y: 1 },
    player2: { x: 9, y: 9 },
  },
  fruits: {
    fruit1: { x: 3, y: 1 },
  },
};

document.addEventListener('keydown', handleKeyDown);

// DONT DO THIS Version 🤢
function handleKeyDown(event: KeyboardEvent) {
  const keyPressed = event.key;
  const player = game.players[currentPlayer];

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
}

function renderScreen() {
  if (!context) return;

  context.fillStyle = 'white';
  context.clearRect(0, 0, 10, 10);

  for (const playerID in game.players) {
    const player = game.players[playerID];

    context.fillStyle = 'black';
    context.fillRect(player.x, player.y, 1, 1);
  }

  for (const fruitID in game.fruits) {
    const fruit = game.fruits[fruitID];

    context.fillStyle = 'green';
    context.fillRect(fruit.x, fruit.y, 1, 1);
  }

  requestAnimationFrame(renderScreen);
}

renderScreen();
