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

  grid[grid.length-1][columnNumber] = PlayerColor;

  console.log(grid);

  return grid
}
