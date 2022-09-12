import { describe, expect, it } from "vitest";
import { createCanvaGrid } from "../grid";

describe('#createCanvaGrid', () => {
  it('should create a canvas grid with correct spacing', function() {
    // given
    const grid_pixel_spacing = 90;
    const grid_columns = 7;

    // when
    const grid = createCanvaGrid(grid_pixel_spacing, grid_columns)

    // then
    expect(grid).toEqual([
      90,
      180,
      270,
      360,
      450,
      540,
      630,
    ]);
  })
});
