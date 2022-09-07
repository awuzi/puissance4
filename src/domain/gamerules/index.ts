import { GridState, PlayerColor } from "../types";


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

export function playTurn(PlayerColor: PlayerColor, columnNumber: number, grid: GridState): GridState {

  const rowNumber = calculateRowNumber(columnNumber, grid);

  grid[rowNumber][columnNumber] = PlayerColor;

  return grid
}

export function calculateRowNumber(columnNumber: number, grid: GridState): number {
  let rowNumber = grid.length - 1;

  while(grid[rowNumber][columnNumber] != '_') {
    --rowNumber
  }

  return rowNumber;
}
