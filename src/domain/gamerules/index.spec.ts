import { expect, describe, it } from "vitest";
import { findFreePositionY, playTurn } from './index';
import { makeEmptyGrid } from '../grid/index';
import { GridState, PlayerColor } from "../types";

describe('#playTurn', function () {

  describe('When last row is empty', function() {
    it('should insert player column in the column number he choosed in the last row', () => {
      // given
      const columnNumber = 2
      const columns = 7
      const rows = 6

      // when
      let grid = makeEmptyGrid(rows)(columns)
      grid = playTurn(PlayerColor.RED, columnNumber, grid)

      //then
      expect(grid).toEqual(
        [
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_',PlayerColor.RED,'_','_','_','_'],
        ]
        )
      })
    })
  })

  describe('When last row is not empty', function() {
    it('Should place token in the row above the previous token', () => {
      // given
      const columnNumber = 2
      let grid: GridState = [
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_',PlayerColor.RED,'_','_','_','_'],
      ]

      // when
      grid = playTurn(PlayerColor.YELLOW, columnNumber, grid)

      //then
      expect(grid).toEqual(
        [
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_',PlayerColor.YELLOW,'_','_','_','_'],
          ['_','_',PlayerColor.RED,'_','_','_','_'],
        ]
      )
    })
  })

describe('#calculateRowNumber', () => {
  it('Should place token in the row above the previous token', () => {
    // given
    const columnNumber = 2
    const grid: GridState = [
      ['_','_','_','_','_','_','_'],
      ['_','_','_','_','_','_','_'],
      ['_','_','_','_','_','_','_'],
      ['_','_','_','_','_','_','_'],
      ['_','_','_','_','_','_','_'],
      ['_','_',PlayerColor.RED,'_','_','_','_'],
    ]

    // when
    const rowNumber = findFreePositionY(columnNumber, grid);

    // then
    expect(rowNumber).toEqual(4)
  });
})
