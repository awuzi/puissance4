import { CellState, GridState } from "../types";

export const makeEmptyGrid = (rows: number) => (cols: number): GridState => Array.from(Array(rows), makeColumn(cols));

function makeColumn(col: number): () => CellState[] {
  return (): CellState[] => Array(col).fill('_');
}
