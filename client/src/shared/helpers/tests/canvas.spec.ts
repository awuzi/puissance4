import { describe, expect, it } from "vitest";
import { calculatePosition } from "../canva";

describe('#calculatePosition', () => {
  it('should calculate a token position on canvas grid', function() {
    // given
    const y = 5;
    const x = 0

    // when
    const cellCoords = calculatePosition(y, x)

    // then
    expect(cellCoords).toEqual({ x: 50, y: 440});

  })
});
