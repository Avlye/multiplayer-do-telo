import Command from '../@types/Command';
import Game from './Game';

class Keyboard {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  createKeyboardListener() {
    const state = {
      observers: [],
    };

    function subscribe(observerFunction: Function) {
      state.observers.push(observerFunction);
    }

    function notifyAll(command: Command) {
      console.log(`Notifying ${state.observers.length} observers`);

      for (const observerFunction of state.observers) {
        observerFunction(command);
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const keyPressed = event.key;

      const command = {
        playerID: 'player1',
        keyPressed,
      };

      notifyAll(command);
    };

    document.addEventListener('keydown', handleKeyDown);

    return { subscribe };
  }
}

export default Keyboard;
