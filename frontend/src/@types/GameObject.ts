import GameTransform from './GameTransform';

export default interface GameObject {
  [key: string]: GameTransform;
}
