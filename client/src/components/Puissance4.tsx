import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {findFreePositionY, isGameDraw, playTurn} from "../domain/gamerules";
import {CellState, GameAction, GameId, GridState, Player, PlayerColor, Position, WinningSequence} from "../domain/types";
import { calculatePosition } from "../shared/helpers/canva";
import {
  CANVA_GRID,
  CANVA_HEIGHT,
  CANVA_WIDTH,
  CLEAR_RECT_HEIGHT,
  CLEAR_RECT_WIDTH,
  CLEAR_RECT_X,
  CLEAR_RECT_Y,
  GAME_SPEED,
  NB_OF_MATCHING_COLOR,
  RED_COLOR,
  TOKEN_RADIUS,
  WINNING_LINE_COLOR,
  WINNING_LINE_WIDTH,
  YELLOW_COLOR
} from "../constants";
import { GameContext, socket } from "../context";
import {makeEmptyGrid} from "../domain/grid";


const Puissance4 = () => {

  const navigate = useNavigate();
  const { context, setContext } = useContext(GameContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [winSequence, setWinSequence] = useState<WinningSequence>([]);
  const [playing, setPlaying] = useState(true);
  const [gameDraw, setGameDraw] = useState(false);

  useEffect(() => {
    defaultState();

    if (winSequence.length >= NB_OF_MATCHING_COLOR) {
      drawWinningLine(winSequence[0], winSequence[3]);

      const winningFrame = setTimeout(() => {
        setPlaying(false);
        clearInterval(winningFrame);
      }, 5000);
    }
  }, [context]);


  const backHome = () => {
    setContext({
      gameId: '' as GameId,
      players: [] as Player[],
      currentPlayer: {} as Player,
      grid: makeEmptyGrid(6)(7)
    });
    navigate('/', { replace: true });
  }

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
            if (isGameDraw(grid)) {
              setGameDraw(true);
              setPlaying(false);
            }
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
  function dropTokenCanva(color: PlayerColor, row: number, column: number, translate?: boolean): void {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = color == PlayerColor.RED ? RED_COLOR : YELLOW_COLOR;

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
    const cellOne = calculatePosition(firstY, firstX);
    const cellTwo = calculatePosition(lastY, lastX)
    ctx.moveTo(cellOne.x, cellOne.y);
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
      {!playing ?
        <div className="float-left bg-amber-50 bg-opacity-90 absolute text-center" style={{ height: "480px", width: "640px" }}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">
            La partie est terminée {gameDraw ? "en égalité" : (context.currentPlayer.playerColor == PlayerColor.RED) ? "et le joueur Jaune a gagné" : "et le joueur Rouge a gagné"}
            <br/>
            <button onClick={backHome} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
              Retour à l'accueil
            </button>
          </div>
        </div>
        : ''}
    </>
  )
}

export default Puissance4;
