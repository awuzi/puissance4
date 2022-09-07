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
  JOINED = 'JOINED',
  MESSAGE = 'MESSAGE',
  DROP_TOKEN = 'DROP_TOKEN',
  DROPPED_TOKEN = 'DROPPED_TOKEN',
  CREATE_GAME = 'CREATE_GAME',
  LEAVE = 'LEAVE',
  WIN = 'WIN',
  DRAW = 'DRAW',
  LOOSE = 'LOOSE',
}


