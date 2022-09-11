import { describe, expect, it } from "vitest";
import { makeEmptyGrid } from '../grid/index';
import { GridState, PlayerColor } from "../types";
import { findFreePositionY, findConnectedTokens, isGameDraw } from './index';

describe('#findFreePositionY', () => {
  describe('When last row is empty', () => {
    it('should insert player column in the column number he choosed in the last row', () => {
      // given
      const x = 0
      const rows = 6;
      const columns = 7

      // when
      let grid = makeEmptyGrid(rows)(columns)
      const y = findFreePositionY(x, grid)

      //then
      expect(y).toEqual(5)
    })
  })


  it('Should place token in the row above the previous token', () => {
    // given
    const x = 2
    const grid: GridState = [
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
    ]

    // when
    const y = findFreePositionY(x, grid);

    // then
    expect(y).toEqual(4)
  });

  it('should throw an error if the column is full ', () => {
    // given
    const y = 2
    const grid: GridState = [
      ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
      ['_', '_', PlayerColor.YELLOW, '_', '_', '_', '_'],
      ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
      ['_', '_', PlayerColor.YELLOW, '_', '_', '_', '_'],
      ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
      ['_', '_', PlayerColor.RED, '_', '_', '_', '_'],
    ]

    // then
    expect(() => findFreePositionY(y, grid)).toThrowError('La ligne est déjà complete');
  })
})

describe('#getWinningSequence', () => {
  describe('When less than four are aligned', () => {
    it('should return a winningSequence with less than 4 elements', () => {
      // given
      const grid: GridState = [
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', PlayerColor.YELLOW, '_', '_', '_', '_'],
        [PlayerColor.RED, PlayerColor.RED, PlayerColor.RED, '_', '_', '_', '_'],
      ]
      const lastTokenCoords = {
        x: 0,
        y: grid.length - 1
      }

      // when
      const winningSequence = findConnectedTokens(lastTokenCoords.x, lastTokenCoords.y, PlayerColor.RED, grid)

      // then
      expect(winningSequence.length).toEqual(0);
    });
  })

  describe('When four tokens are aligned', () => {
    it('should return true horizontally', () => {
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
        x: 0,
        y: 5
      }

      // when
      const winningSequence = findConnectedTokens(lastTokenCoords.x, lastTokenCoords.y, PlayerColor.RED, grid)

      console.log('winningSequence : ', winningSequence);
      expect(winningSequence.length).toEqual(4);
      expect(winningSequence).toEqual(expect.arrayContaining([
        { x: 0, y: 5, color: 'R' },
        { x: 1, y: 5, color: 'R' },
        { x: 2, y: 5, color: 'R' },
        { x: 3, y: 5, color: 'R' }
      ]));
    })
    it('should return true vertically', () => {
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
        x: 0,
        y: 2
      }

      // when
      const winningSequence = findConnectedTokens(lastTokenCoords.x, lastTokenCoords.y, PlayerColor.RED, grid)

      // then
      expect(winningSequence.length).toBe(4);
    })
    it('should return true diagonally', () => {
      // given
      const grid: GridState = [
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', PlayerColor.RED, '_', '_', '_'],
        ['_', '_', PlayerColor.RED, PlayerColor.YELLOW, '_', '_', '_'],
        ['_', PlayerColor.RED, PlayerColor.YELLOW, PlayerColor.YELLOW, '_', '_', '_'],
        [PlayerColor.RED, PlayerColor.YELLOW, PlayerColor.YELLOW, PlayerColor.RED, '_', '_', '_'],
      ];
      const lastTokenCoords = {
        x: 3,
        y: 2
      }

      // when
      const winningSequence = findConnectedTokens(lastTokenCoords.x, lastTokenCoords.y, PlayerColor.RED, grid);

      expect(winningSequence.length).toBe(4);
    });

    it('should pass diagonally', () => {
      const grid = [
        ["_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "R", "_", "_", "_"],
        ["_", "_", "_", "Y", "R", "_", "_"],
        ["_", "_", "_", "R", "R", "R", "Y"],
        ["_", "_", "_", "Y", "Y", "Y", "R"]
      ] as GridState;

      const winningSequence = findConnectedTokens(5, 4, PlayerColor.RED, grid);

      expect(winningSequence.length).toBe(4);
    })
  });
});


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
