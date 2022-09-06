export type EmptyCell = '_';

export type CellState = PlayerColor.RED | PlayerColor.YELLOW | EmptyCell;

export type GridState = CellState[][];

export enum PlayerColor {
  RED = 'R',
  YELLOW = 'Y'
}

export enum GameAction {
  JOIN_GAME = 'JOIN_GAME',
  LEAVE_GAME = 'LEAVE_GAME',
  WIN_GAME = 'WIN_GAME',
  LOOSE_GAME = 'LOOSE_GAME',
}

export enum PlayerAction {
  DROP_TOKEN = 'DROP_TOKEN'
}



