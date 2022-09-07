import React, { useEffect, useRef, useState } from 'react';
import { findFreePositionY, playTurn } from "../../domain/gamerules";
import { CellState, GridState, PlayerColor } from "../../domain/types";
import game from "../pages/Game";

interface Puissance4Props {
  gameData: GridState,
  setGrid?: (grid: GridState) => void
  playerColor: PlayerColor
}

const Puissance4 = ({ gameData, playerColor }: Puissance4Props) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const grilleCoords = [100, 190, 280, 370, 460, 550, 640];

  useEffect(() => {
    defaultState();
  }, []);

  function defaultState() {
    gameData.forEach((row: CellState[], rowIndex: number) => {
      row.forEach((col: CellState, colIndex: number) => {
        if (col !== '_') {
          dropJeton(col, rowIndex, colIndex, true)
        }
      });
    });
  }

  function clickGrille(click: React.MouseEvent) {
    const canvas = canvasRef.current
    let rect: DOMRect = canvas!.getBoundingClientRect();
    let x = click.clientX - rect.left;
    let y = click.clientY - rect.top;

    for (const [index, coord] of grilleCoords.entries()) {
      if (x < coord) {
        dropJeton(playerColor, findFreePositionY(index, gameData), index);
        const updatedGrid = playTurn(playerColor, index, gameData);
        break;
      }
    }
  }

  function dropJeton(color: PlayerColor, ligne: number, colonne: number, instant?: boolean) {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = color === 'R' ? "#c82124" : "#FFFF00";
    const x = colonne == 0 ? 50 : (colonne * 90) + 50;
    const y = ligne == 0 ? 41 : (ligne * 80) + 41;
    if (instant) {
      drawJeton(ctx, x, y);
    } else {
      let i = 0;
      const anim = setInterval(() => {
        i++;
        drawJeton(ctx, x, i);
        if (i >= y) clearInterval(anim);
      }, 1);
    }
  }

  function drawJeton(ctx: CanvasRenderingContext2D, x: number, i: number): void {
    ctx.beginPath();
    ctx.clearRect(x - 35, i - 37, 70, 35);
    ctx.arc(x, i, 35, 0, 2 * Math.PI)
    ctx.fill();
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        onClick={clickGrille}
        width="640"
        height="480"
        className="bg-amber-50"
        style={{ height: '480px', width: '640px', backgroundImage: "url('./assets/grille.png')" }}></canvas>
    </>
  )
}

export default Puissance4;
