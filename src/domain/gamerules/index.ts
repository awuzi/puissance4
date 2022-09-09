import { DIRECTIONS, NB_OF_MATCHING_COLOR, ORIENTATION } from "../../client/constants";
import { GridState, PlayerColor, directionsMatrix, WinningSequence } from "../types";


export function tokenPlacement(
  grid: GridState,
  columnNumber: number,
  playerColor: PlayerColor
) {

  const rowNumber = findFreePositionY(columnNumber, grid);
  grid[rowNumber][columnNumber] = playerColor;

  const lastTokenCoords = {
    columnNumber,
    rowNumber
  }

  return lastTokenCoords;
}

export function playTurn(
  playerColor: PlayerColor,
  columnNumber: number,
  grid: GridState
): { grid: GridState, isWon: boolean, winningSequence: WinningSequence } {

  const lastTokenCoords = tokenPlacement(grid, columnNumber, playerColor)

  const { isWon, winningSequence } = isGameWon(lastTokenCoords.columnNumber, lastTokenCoords.rowNumber, playerColor, grid)

  return { grid, isWon, winningSequence }
}

export function findFreePositionY(
  columnNumber: number,
  grid: GridState
): number {
  let rowNumber = grid.length - 1;

  while (grid[rowNumber][columnNumber] != '_') {
    --rowNumber

    if (rowNumber < 0) {
      throw new Error('La ligne est déjà complete')
    }
  }

  return rowNumber;
}

export const isGameDraw = (grid: GridState): boolean => !grid.flatMap(c => c).some(c => c === '_')


// TODO: change function name
export function isGameWon(
  columnNumber: number,
  rowNumber: number,
  playerColor: PlayerColor,
  grid: GridState
): { isWon: boolean, winningSequence: WinningSequence } {
  const winningSequence: { rowNumber: number, columnNumber: number, color: PlayerColor }[] = [];

  for (let ax of ORIENTATION) {
    for (let [x, y] of DIRECTIONS) {
      let [posX, posY] = [rowNumber, columnNumber];
      const placedColor = grid[posX][posY];
      while (placedColor === playerColor) {
        try {
          posX += x * ax;
          posY += y * ax;

          const nextToken = grid?.[posX]?.[posY];

          if (nextToken !== playerColor) break;

          winningSequence.push({ rowNumber: posX, columnNumber: posY, color: nextToken })

          if (winningSequence.length >= NB_OF_MATCHING_COLOR) return { isWon: true, winningSequence };
        } catch (error) {
          console.error(error);
          break;
        }
      }
    }
  }

  return { isWon: false, winningSequence };
}
