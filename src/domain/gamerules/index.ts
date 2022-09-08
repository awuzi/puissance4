import { g } from "vitest/dist/index-5f09f4d0";
import { GridState, PlayerColor, directionsMatrix } from "../types";


export function dropToken(
  grid: GridState,
  positionX: number,
  playerColor: PlayerColor
): GridState {
  // todo :
  //  parcourir la grille jusqu'à la position x
  //  une fois à la position x, trouver la première cellule vide dans la colonne en partant du bas
  //  remplacer la cellule par la couleur du joueur en cour
  //  retourner la nouvelle grille

  return [] as GridState;
}

export function playTurn(
  playerColor: PlayerColor,
  columnNumber: number,
  grid: GridState
): GridState {
  const rowNumber = findFreePositionY(columnNumber, grid);
  grid[rowNumber][columnNumber] = playerColor;

  if(isGameWon(columnNumber, rowNumber, playerColor, grid)) {
    console.log(`Le joueur ${playerColor} a gagner la partie`)
  }

  return grid
}

export function findFreePositionY(
  columnNumber: number,
  grid: GridState
): number {
  let rowNumber = grid.length - 1;

  while(grid[rowNumber][columnNumber] != '_') {
    --rowNumber

    if(rowNumber < 0) {
      throw new Error ('La ligne est déjà complete')
    }
  }

  return rowNumber;
}

export function isGameWon(columnNumber: number, rowNumber: number, playerColor: PlayerColor, grid: GridState) {
  //For each [North/South, East/West, NorthEast/Northwest, SouthEast/Southwest]
  for (let axis in directionsMatrix) {
    // We difine this variable here so that "East" and "West" share the same count,
    // This allows a coin to be dropped in a middle cell
    let numMatches = 1;

    // For each [North, South]
    for (let direction in directionsMatrix[axis]) {
      // Get X/Y co-ordinates of our dropped coin
      let tokenReference = [rowNumber, columnNumber];
      
      // Add co-ordinates of 1 cell in test direction (eg "North")
      let testCell = grid[tokenReference[0]][tokenReference[1]];
      
      // Count how many matching color cells are in that direction
      while (testCell == playerColor) {
        try {
          // Add co-ordinates of 1 cell in test direction (eg "North")
          tokenReference[0] += directionsMatrix[axis][direction][0];
          tokenReference[1] += directionsMatrix[axis][direction][1];
          testCell = grid[tokenReference[0]][tokenReference[1]];

          // Test if cell is matching color
          if (testCell == playerColor) {
            numMatches += 1;

            // If our count reaches 4, the player has won the game
            if (numMatches >= 4) {
              return true;
            }
          }
        } catch (error) {
            console.error(error);
          break;
        }
      }
      // console.log(`direction: ${direction}, numMatches: ${numMatches}`);

      // If our count reaches 4, the player has won the game
      if (numMatches === 4) {
        return true;
      }
    }
  }

  // If we reach this statement: they have NOT won the game
  return false;
};