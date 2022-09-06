import { expect, describe, it } from "vitest";
import { playTurn } from './index';
import { makeEmptyGrid } from '../grid/index';
import { GridState, PlayerColor } from "../types";

describe('#playTurn', function () {

  describe('when player 1 start', function() {
    it('should insert player id in the column number he choosed', ()=> {
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
          ['_','_','R','_','_','_','_'],
        ]
        )
    })
  })

  describe('when player 2 play after player 1', function () {
    it('should insert player id in the column number he choosed', ()=> {
      // given
      const columnNumber = 3
      
      // when
      let grid: GridState = [
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_'],
        ['_','_',PlayerColor.RED,'_','_','_','_'],
      ]
      grid = playTurn(PlayerColor.YELLOW, columnNumber, grid)
      
      //then
      expect(grid).toEqual(
        [
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_','_','_','_','_','_'],
          ['_','_',PlayerColor.RED,PlayerColor.YELLOW,'_','_','_'],
        ]
        )
    })
  })

})
