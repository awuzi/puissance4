import { expect, describe, it } from "vitest";
import { findFreePositionY, playTurn, isGameWon } from './index';
import { makeEmptyGrid } from '../grid/index';
import { GridState, PlayerColor } from "../types";

describe('#playTurn', function () {

  describe('When last row is empty', function () {
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
          ['_', '_', '_', '_', '_', '_', '_'],
          ['_', '_', '_', '_', '_', '_', '_'],
          ['_', '_', '_', '_', '_', '_', '_'],
          ['_', '_', '_', '_', '_', '_', '_'],
          ['_', '_', '_', '_', '_', '_', '_'],
          ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
        ]
      )
    })
  })
})

describe('When last row is not empty', function () {
  it('Should place token in the row above the previous token', () => {
    // given
    const columnNumber = 2
    let grid: GridState = [
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
    ]

    // when
    grid = playTurn(PlayerColor.YELLOW, columnNumber, grid)

    //then
    expect(grid).toEqual(
      [
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', PlayerColor.YELLOW, '_', '_', '_', '_'],
        ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
      ]
    )
  })
})

describe('#calculateRowNumber', () => {
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

describe('#isGameWon', function () {
  describe('When less than four are aligned', function () {

    it('should return false', function () {
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
      const gameWon = isGameWon(lastTokenCoords.columnNumber, lastTokenCoords.rowNumber, PlayerColor.RED, grid)

      // then
      expect(gameWon).toBe(false);
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
      const gameWon = isGameWon(lastTokenCoords.columnNumber, lastTokenCoords.rowNumber, PlayerColor.RED, grid)

      // then
      expect(gameWon).toBe(true);
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
      const gameWon = isGameWon(lastTokenCoords.columnNumber, lastTokenCoords.rowNumber, PlayerColor.RED, grid)

      // then
      expect(gameWon).toBe(true);
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
      const gameWon = isGameWon(lastTokenCoords.columnNumber, lastTokenCoords.rowNumber, PlayerColor.RED, grid)

      // then
      expect(gameWon).toBe(true);
    })
  })
})
