import { CellState, GridState, Row } from "../types";

export const makeEmptyGrid = (rows: number) => (cols: number): GridState => Array.from(Array(rows), makeColumn(cols));

function makeColumn(col: number): () => Row {
  return (): Row => Array(col).fill('_');
}
