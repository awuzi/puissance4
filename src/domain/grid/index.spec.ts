import { describe, it, expect } from "vitest";
import { CellState } from "../types";

import { makeEmptyGrid } from "./index";

describe('grid', () => {

  it('should make 0x0 empty grid', () => {
    const rows = 0;
    const cols = 0;

    const grid = makeEmptyGrid(rows)(cols);

    expect(grid).toEqual([]);
  });

  it('should make 1x1 emtpy grid', () => {
    const E: CellState = '_';
    const rows = 1;
    const cols = 1;

    const grid = makeEmptyGrid(rows)(cols);

    expect(grid).toEqual([
      [E]
    ]);
  });

  it('should make 2x1 emtpy grid', () => {
    const E: CellState = '_';
    const rows = 2;
    const cols = 1;

    const grid = makeEmptyGrid(rows)(cols);

    expect(grid).toEqual([
      [E],
      [E]
    ]);
  });

  it('should make 6x7 emtpy grid', () => {
    const E: CellState = '_';
    const rows = 6;
    const cols = 7;

    const grid = makeEmptyGrid(rows)(cols);

    expect(grid).toEqual([
      [E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E],
    ]);
  });
})
