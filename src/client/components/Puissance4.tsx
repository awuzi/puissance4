import React, { useContext, useEffect, useRef, useState } from 'react';
import { findFreePositionY, playTurn } from "../../domain/gamerules";
import { CellState, GameAction, GameState, GridState, Player, PlayerColor, Position, WinningSequence } from "../../domain/types";
import { calculatePosition } from "../../shared/helpers/canva";
import {
  CANVA_HEIGHT,
  CANVA_WIDTH,
  CLEAR_RECT_HEIGHT,
  CLEAR_RECT_WIDTH,
  CLEAR_RECT_X,
  CLEAR_RECT_Y,
  GAME_SPEED,
  CANVA_GRID,
  RED_COLOR,
  YELLOW_COLOR,
  TOKEN_DISTANCE_X,
  TOKEN_DISTANCE_Y,
  TOKEN_OFFSET_X,
  TOKEN_OFFSET_Y,
  TOKEN_RADIUS,
  WINNING_LINE_COLOR,
  WINNING_LINE_WIDTH, NB_OF_MATCHING_COLOR
} from "../constants";
import { GameContext, socket } from "../context";


const Puissance4 = () => {

  const { context, setContext } = useContext(GameContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [winSequence, setWinSequence] = useState<WinningSequence>([]);

  useEffect(() => {
    defaultState();
  }, [context]);

  useEffect(() => {
    if (winSequence.length >= NB_OF_MATCHING_COLOR) {
      drawWinningLine({
          x: winSequence[0].rowNumber,
          y: winSequence[0].columnNumber
        },
        {
          x: winSequence[3].rowNumber,
          y: winSequence[3].columnNumber
        });
    }
  }, [winSequence]);

  /**
   * Dessine la grille de jetons
   */
  function defaultState(): void {
    context.grid.forEach((row: CellState[], rowIndex: number) => {
      row.forEach((color: CellState, colIndex: number) => {
        // On ne dessine que les cellules remplies
        if (color !== "_") dropTokenCanva(color, rowIndex, colIndex, true);
      });
    });
  }

  /**
   * Calcule la colonne sur laquelle le joueur a cliqué
   * @param event
   */
  function onGridClick(event: React.MouseEvent): void {
    if (localStorage.getItem('playerId') === context.currentPlayer.id) {
      const canvas = canvasRef.current
      let rect: DOMRect = canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const storedTokenColor = localStorage.getItem('playerColor') as PlayerColor;
      for (const [column, coord] of CANVA_GRID.entries()) {
        if (x < coord) {
          const freePosY = findFreePositionY(column, context.grid);
            dropTokenCanva(storedTokenColor, freePosY, column)
            const {grid, isWon, winningSequence} = playTurn(storedTokenColor, column, context.grid);
            if (isWon == true) setWinSequence(winningSequence);
          break;
        }
      }
    }
  }

  const updateGrid = (grid: GridState): void => {
    const currentState = {
      ...context,
      currentPlayer: context.players.find(s => s.id !== context.currentPlayer.id)!,
      grid
    };
    setContext(currentState);
    socket.emit(GameAction.GAME_UPDATE, currentState);
  }


  /**
   * Calcul l'emplacement du jeton sur la grille + Animation de chute du jeton
   * @param color
   * @param row
   * @param column
   * @param translate
   */
  function dropTokenCanva(color: PlayerColor, row: number, column: number, translate?: boolean): boolean {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = color == 'R' ? RED_COLOR : YELLOW_COLOR;

    const { x, y } = calculatePosition(row, column);

    if (!translate) {
      let i = 0;
      const animation = setInterval(() => {
        i = i + GAME_SPEED;
        drawToken(ctx, x, i);
        if (i >= y) {
          clearInterval(animation);
          updateGrid(context.grid); // renvoyer la data aux autres client
        }
      }, 1);
    } else {
      drawToken(ctx, x, y);
    }
    return true;
  }

  /**
   * Dessine la ligne gagnante en utilisant les deux cellules d'extremité
   * @param winningCellOne
   * @param winningCellTwo
   */
  function drawWinningLine(
    { x: firstX, y: firstY }: Position,
    { x: lastX, y: lastY }: Position
  ): void {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d') as CanvasRenderingContext2D;
    ctx.strokeStyle = WINNING_LINE_COLOR;
    ctx.lineWidth = WINNING_LINE_WIDTH;
    ctx.beginPath();
    const cellOne = calculatePosition(firstX, firstY);
    ctx.moveTo(cellOne.x, cellOne.y);
    const cellTwo = calculatePosition(lastX, lastY)
    ctx.lineTo(cellTwo.x, cellTwo.y);
    ctx.stroke();
  }

  /**
   * Dessine un jeton aux coordonnés x et y
   * @param ctx
   * @param x
   * @param y
   */
  function drawToken(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.beginPath();
    ctx.clearRect(x - CLEAR_RECT_X, y - CLEAR_RECT_Y, CLEAR_RECT_WIDTH, CLEAR_RECT_HEIGHT);
    ctx.arc(x, y, TOKEN_RADIUS, 0, 2 * Math.PI)
    ctx.fill();
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        onClick={onGridClick}
        width={CANVA_WIDTH}
        height={CANVA_HEIGHT}
        className="bg-amber-50 gameCanva"
        style={{ width: CANVA_WIDTH, height: CANVA_HEIGHT }}
      >
      </canvas>
    </>
  )
}

export default Puissance4;
