import { DIRECTIONS, NB_OF_MATCHING_COLOR, ORIENTATION } from "../../client/constants";
import { GridState, PlayerColor, directionsMatrix } from "../types";


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
): { grid: GridState, isWon: boolean} {
  const lastTokenCoords = tokenPlacement(grid, columnNumber, playerColor)

  isGameWon(lastTokenCoords.columnNumber, lastTokenCoords.rowNumber, playerColor, grid)

  return { grid, isWon: isGameWon(lastTokenCoords.columnNumber, lastTokenCoords.rowNumber, playerColor, grid)}
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

export function isGameWon(
  columnNumber: number,
  rowNumber: number,
  playerColor: PlayerColor,
  grid: GridState
): boolean {
  let sameMatchingColor = 1;

  for (let ax of ORIENTATION) {

    for (let [x, y] of DIRECTIONS) {
      // Get X/Y co-ordinates of our dropped coin
      let [posX, posY] = [rowNumber, columnNumber];

      // Add co-ordinates of 1 cell in test direction (eg "North")
      const placedColor = grid[posX][posY];

      // Count how many matching color cells are in that direction
      while (placedColor === playerColor) {
        try {
          // Add co-ordinates of 1 cell in test direction (eg "North")
          posX += x * ax;
          posY += y * ax;

          const nextToken = grid[posX][posY];

          // Test if cell is matching color
          if (nextToken === playerColor) {
            sameMatchingColor += 1;
            // If our count reaches 4, the player has won the game
            if (sameMatchingColor >= NB_OF_MATCHING_COLOR) return true;
          }
        } catch (error) {
          console.error(error);
          break;
        }
      }
    }
  }

  // If we reach this statement: they have NOT won the game
  return false;
};
