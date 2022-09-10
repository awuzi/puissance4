import { DIRECTIONS, NB_OF_MATCHING_COLOR, ORIENTATION } from "../../client/constants";
import { GridState, PlayerColor, WinningSequence } from "../types";

export function playTurn(
  playerColor: PlayerColor,
  x: number,
  grid: GridState
): { grid: GridState, isWon: boolean, winningSequence: WinningSequence } {

  const y = findFreePositionY(x, grid);

  grid[y][x] = playerColor;

  const winningSequence = findConnectedTokens(x, y, playerColor, grid)

  const isWon = isGameWon(winningSequence)

  return { grid, isWon, winningSequence }
}

export function findFreePositionY(
  x: number,
  grid: GridState
): number {
  let y = grid.length - 1;

  while (grid[y][x] != '_') {
    y--;
    if (y < 0) throw new Error('La ligne est déjà complete')
  }

  return y;
}

export const isGameDraw = (grid: GridState): boolean => !grid.flatMap(c => c).some(c => c === '_')

export function findConnectedTokens(
  x: number,
  y: number,
  playerColor: PlayerColor,
  grid: GridState
): WinningSequence {
  const DIRECTIONS = [[1, 0], [0, 1], [1, 1], [1, -1]];
  const ORIENTATION = [1, -1];
  const position = { x, y, color: playerColor };

  for (let [directionX, directionY] of DIRECTIONS) {
    /**
     * reseting the connected array when we changing direction
     */
    let matchingTokens: { x: number, y: number, color: PlayerColor }[] = [position];
    /**
     * Event try to find token forward and backward
     * when we drop a token in the middle of a line and he complete a row
     */
    for (let axis of ORIENTATION) {
      for (let i = 1; i < NB_OF_MATCHING_COLOR; i++) {
        const x = position.x + (i * directionX * axis);
        const y = position.y + (i * directionY * axis);
        const color = grid?.[y]?.[x];

        if (color !== playerColor) break;

        matchingTokens.push({ x, y, color: color as PlayerColor });
      }
      if (matchingTokens.length >= NB_OF_MATCHING_COLOR) return matchingTokens;
    }
  }
  return [];
}

export function isGameWon(winningSequence: WinningSequence) {
  return winningSequence.length === NB_OF_MATCHING_COLOR
}
