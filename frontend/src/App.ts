// Loads global stylesheet
import './scss/main.scss';

const screen = <HTMLCanvasElement> document.getElementById('screen');
const context = screen.getContext('2d');

interface Game {
  players: {
    [key: string]: {
      x: number,
      y: number
    }
  },

  fruits: {
    [key: string]: {
      x: number,
      y: number
    }
  }
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

function clearScreen() {
  context.fillStyle = 'white'
  context.fillRect(0, 0, 10, 10)
}

function renderScreen() {
  clearScreen()

  for (const playerID in game.players) {
    const player = game.players[playerID]

    context.fillStyle = 'black'
    context.fillRect(player.x, player.y, 1, 1)
  }

  for (const fruitID in game.fruits) {
    const fruit = game.fruits[fruitID]

    context.fillStyle = 'green'
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }

  requestAnimationFrame(renderScreen)
}

renderScreen()
