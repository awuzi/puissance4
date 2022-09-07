export type EmptyCell = '_';

export type CellState = PlayerColor.RED | PlayerColor.YELLOW | EmptyCell;

export type GridState = CellState[][];

export type PlayerId = 'string';
export type GameId = 'string';

export enum PlayerColor {
  RED = 'R',
  YELLOW = 'Y'
}

export enum GameAction {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  WIN = 'WIN',
  DRAW = 'DRAW',
  LOOSE = 'LOOSE',
}

export enum PlayerAction {
  DROP_TOKEN = 'DROP_TOKEN'
}



