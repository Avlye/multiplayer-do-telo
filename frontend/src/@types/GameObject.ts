export interface GameObjectTransform {
  x: number;
  y: number;
}

export default interface GameObject {
  id: string;
  transform: GameObjectTransform;
}
