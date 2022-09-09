import { TOKEN_DISTANCE_X, TOKEN_DISTANCE_Y, TOKEN_OFFSET_X, TOKEN_OFFSET_Y } from "../../client/constants";
import { Position } from "../../domain/types";

/**
 * Calcule la position en pixels d'un jeton
 * @param row
 * @param column
 */
export const calculatePosition = (row: number, column: number): Position => {
  return {
    x: (column == 0 ? TOKEN_OFFSET_X : (column * TOKEN_DISTANCE_X) + TOKEN_OFFSET_X),
    y: (row == 0 ? TOKEN_OFFSET_Y : (row * TOKEN_DISTANCE_Y) + TOKEN_OFFSET_Y)
  };
}
