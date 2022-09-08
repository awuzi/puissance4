export type EmptyCell = '_';

export type CellState =
  PlayerColor.RED
  | PlayerColor.YELLOW
  | EmptyCell;

export type GridState = Row[];
export type Row = CellState[];

export type PlayerId = string;
export type GameId = string;

export type Position = {
  x: number,
  y: number
}

export type Player = {
  id: PlayerId,
  playerColor: PlayerColor
}

export type GameState = {
  gameId: GameId,
  players: Player[],
  currentPlayer: Player,
  grid: GridState
}

export enum PlayerColor {
  RED = 'R',
  YELLOW = 'Y'
}

export enum GameAction {
  JOIN = 'JOIN',
  GAME_UPDATE = 'GAME_UPDATE',
  DROP_TOKEN = 'DROP_TOKEN',
  CREATE_GAME = 'CREATE_GAME',
  LEAVE = 'LEAVE',
  WIN = 'WIN',
  DRAW = 'DRAW',
  LOOSE = 'LOOSE',
}