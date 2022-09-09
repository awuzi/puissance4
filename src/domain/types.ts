import React from "react";
import { Socket } from "socket.io-client";

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

export const directionsMatrix: {
  [T in 'VERTICAL' | 'HORIZONTAL' | 'BACKWARD' | 'FORWARD']: { [D: string]: [number, number] }
} = {
  VERTICAL: { south: [1, 0], north: [-1, 0] },
  HORIZONTAL: { east: [0, 1], west: [0, -1] },
  BACKWARD: { southEast: [1, 1], northWest: [-1, -1] },
  FORWARD: { southWest: [1, -1], northEast: [-1, 1] },
};

export type WinningToken = {
  rowNumber: number,
  columnNumber: number,
  color: PlayerColor
}

export type WinningSequence = WinningToken[]