import GameObject from './GameObject';

export default interface GameState {
  [key: string]: GameObject;
}
