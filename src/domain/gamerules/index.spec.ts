import { expect, describe, it } from "vitest";
import { findFreePositionY, isGameWon, isGameDraw, getWinningSequence } from './index';
import { makeEmptyGrid } from '../grid/index';
import { GridState, PlayerColor } from "../types";

describe('#findFreePositionY', () => {
  describe('When last row is empty', function () {
    it('should insert player column in the column number he choosed in the last row', () => {
      // given
      const columnNumber = 2
      const columns = 7
      const rows = 6
  
      // when
      let grid = makeEmptyGrid(rows)(columns)
      const rowNumber = findFreePositionY(columnNumber, grid)
  
      //then
      expect(rowNumber).toEqual(5)
    })
  })
  it('Should place token in the row above the previous token', () => {
    // given
    const columnNumber = 2
    const grid: GridState = [
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
    ]

    // when
    const rowNumber = findFreePositionY(columnNumber, grid);

    // then
    expect(rowNumber).toEqual(4)
  });

  it('should throw an error if the column is full ', () => {
    // given
    const columnNumber = 2
    const grid: GridState = [
      ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
      ['_', '_', PlayerColor.YELLOW, '_', '_', '_', '_'],
      ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
      ['_', '_', PlayerColor.YELLOW, '_', '_', '_', '_'],
      ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
      ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
    ]

    // then
    expect(() => findFreePositionY(columnNumber, grid)).toThrowError('La ligne est déjà complete');
  })
})

describe('#getWinningSequence', function () {
  describe('When less than four are aligned', function () {

    it('should return a winningSequence with less than 4 elements', function () {
      // given
      const grid: GridState = [
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', PlayerColor.YELLOW, '_', '_', '_', '_'],
        ['_', PlayerColor.RED, PlayerColor.RED, '_', '_', '_', '_'],
      ]
      const lastTokenCoords = {
        rowNumber: grid.length - 1,
        columnNumber: 1
      }

      // when
      const winningSequence = getWinningSequence(lastTokenCoords.columnNumber, lastTokenCoords.rowNumber, PlayerColor.RED, grid)

      // then
      expect(winningSequence).toEqual(expect.arrayContaining([{ color: "R", columnNumber: 1, rowNumber: 5 }, { color: "R", columnNumber: 2, rowNumber: 5 }]));
      expect(winningSequence.length).toEqual(2);
    });
  })

  describe('When four tokens are aligned', function () {

    it('should return true horizontally', function () {
      // given
      const grid: GridState = [
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', PlayerColor.YELLOW, '_', '_', '_', '_'],
        ['_', '_', PlayerColor.YELLOW, '_', '_', '_', '_'],
        ['_', '_', PlayerColor.YELLOW, '_', '_', '_', '_'],
        [PlayerColor.RED, PlayerColor.RED, PlayerColor.RED, PlayerColor.RED, '_', '_', '_'],
      ]
      const lastTokenCoords = {
        rowNumber: grid.length - 1,
        columnNumber: 0
      }

      // when
      const winningSequence = getWinningSequence(lastTokenCoords.columnNumber, lastTokenCoords.rowNumber, PlayerColor.RED, grid)

      // then
      expect(winningSequence).toEqual(expect.arrayContaining([{ color: "R", columnNumber: 0, rowNumber: 5 }, { color: "R", columnNumber: 1, rowNumber: 5 }, { color: "R", columnNumber: 2, rowNumber: 5 }, { color: "R", columnNumber: 3, rowNumber: 5 }]));
      expect(winningSequence.length).toBe(4);
    })

    it('should return true vertically', function () {
      // given
      const grid: GridState = [
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        [PlayerColor.RED, '_', '_', '_', '_', '_', '_'],
        [PlayerColor.RED, '_', '_', '_', '_', '_', '_'],
        [PlayerColor.RED, '_', '_', '_', '_', '_', '_'],
        [PlayerColor.RED, PlayerColor.YELLOW, PlayerColor.YELLOW, PlayerColor.YELLOW, '_', '_', '_'],
      ]
      const lastTokenCoords = {
        rowNumber: 2,
        columnNumber: 0
      }

      // when
      const winningSequence = getWinningSequence(lastTokenCoords.columnNumber, lastTokenCoords.rowNumber, PlayerColor.RED, grid)

      // then
      expect(winningSequence).toEqual(expect.arrayContaining([{ color: "R", columnNumber: 0, rowNumber: 5 }, { color: "R", columnNumber: 0, rowNumber: 4 }, { color: "R", columnNumber: 0, rowNumber: 3 }, { color: "R", columnNumber: 0, rowNumber: 2 }]));
      expect(winningSequence.length).toBe(4);
    })

    it('should return true diagonally', function () {
      // given
      const grid: GridState = [
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', PlayerColor.RED, '_', '_', '_'],
        ['_', '_', PlayerColor.RED, PlayerColor.YELLOW, '_', '_', '_'],
        ['_', PlayerColor.RED, PlayerColor.YELLOW, PlayerColor.YELLOW, '_', '_', '_'],
        [PlayerColor.RED, PlayerColor.YELLOW, PlayerColor.YELLOW, PlayerColor.RED, '_', '_', '_'],
      ]
      const lastTokenCoords = {
        rowNumber: 2,
        columnNumber: 3
      }

      // when
      const winningSequence = getWinningSequence(lastTokenCoords.columnNumber, lastTokenCoords.rowNumber, PlayerColor.RED, grid)

      // then
      expect(winningSequence).toEqual(expect.arrayContaining([{ color: "R", columnNumber: 0, rowNumber: 5 }, { color: "R", columnNumber: 1, rowNumber: 4 }, { color: "R", columnNumber: 2, rowNumber: 3 }, { color: "R", columnNumber: 3, rowNumber: 2 }]));
      expect(winningSequence.length).toBe(4);
    })
  })
})


describe('#isGameDraw', () => {

  it('sould be a draw game', () => {
    const grid: GridState = [
      [PlayerColor.RED, PlayerColor.RED, PlayerColor.YELLOW],
      [PlayerColor.YELLOW, PlayerColor.RED, PlayerColor.YELLOW],
      [PlayerColor.YELLOW, PlayerColor.YELLOW, PlayerColor.YELLOW],
      [PlayerColor.RED, PlayerColor.RED, PlayerColor.RED]
    ]

    expect(isGameDraw(grid)).toBe(true);
  });


  it('sould not be a draw game', () => {
    const grid: GridState = [
      [PlayerColor.RED, '_', PlayerColor.YELLOW],
      [PlayerColor.YELLOW, '_', PlayerColor.YELLOW],
      [PlayerColor.YELLOW, PlayerColor.YELLOW, PlayerColor.YELLOW],
      [PlayerColor.RED, PlayerColor.RED, PlayerColor.RED]
    ];

    expect(isGameDraw(grid)).toBe(false);
  });
});
