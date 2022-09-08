import React, {useEffect, useRef, useState} from 'react';
import {findFreePositionY, playTurn} from "../../domain/gamerules";
import {CellState, EmptyCell, GridState, PlayerColor, Position, Row} from "../../domain/types";

interface Puissance4Props {
    gameData: GridState,
    updateGrid?: (grid: GridState) => void
    playerColor: PlayerColor
}

const Puissance4 = ({gameData, playerColor, updateGrid}: Puissance4Props) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canDrop, setCanDrop] = useState(true);
    const grilleCoords = [100, 190, 280, 370, 460, 550, 640];

    useEffect(() => {
        defaultState();
        drawWinningLine([[1, 2], [1, 3]]);
    }, [gameData]);

    /**
     * Dessine la grille de jetons
     */
    function defaultState(): void {
        gameData.forEach((row: CellState[], rowIndex: number) => {
            row.forEach((col: CellState, colIndex: number) => {
                // On ne dessine que les cellules remplies
                if (col !== "_") dropTokenCanva(col, rowIndex, colIndex, true);
            });
        });
    }

    /**
     * Calcule la colonne sur laquelle le joueur a cliqué
     * @param click
     */
    function clickGrid(click: React.MouseEvent): void {
        const canvas = canvasRef.current
        let rect: DOMRect = canvas!.getBoundingClientRect();
        const x = click.clientX - rect.left;

        for (const [column, coord] of grilleCoords.entries()) {
            if (x < coord && canDrop) {
                const freePosY = findFreePositionY(column, gameData);
                // @ts-ignore
                if (freePosY !== false) {
                    dropTokenCanva(playerColor, freePosY, column);
                    const updatedGrid = playTurn(playerColor, column, gameData);
                    updateGrid!(updatedGrid); // renvoyer la data aux autres client
                    break;
                }
            }
        }
    }

    /**
     * Calcul l'emplacement du jeton sur la grille + Animation de chute du jeton
     * @param color
     * @param ligne
     * @param colonne
     * @param instant
     */
    function dropTokenCanva(color: PlayerColor, ligne: number, colonne: number, instant?: boolean): void {
        const canvas = canvasRef.current;
        const ctx = canvas!.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle = color === PlayerColor.RED ? "#c82124" : "#FFFF00";

        const {x, y} = calculatePosition(ligne, colonne);

        if (!instant) {
            setCanDrop(false);
            let i = 0;
            const anim = setInterval(() => {
                i = i + 3;
                drawToken(ctx, x, i);
                if (i >= y) {
                    clearInterval(anim);
                    setCanDrop(true);
                }
            }, 1);
        }else drawToken(ctx, x, y);
    }

    function calculatePosition(ligne: number, colonne: number): Position {
        // Constantes de pixels
        const offsetX = 50;
        const offsetY = 40;
        const distanceX = 90;
        const distanceY = 80;

        return {
          x: (colonne == 0 ? offsetX : (colonne * distanceX) + offsetX),
          y: (ligne == 0 ? offsetY : (ligne * distanceY) + offsetY)
        };
    }

    function drawWinningLine(winningLine: any): void {
        const canvas = canvasRef.current;
        const ctx = canvas!.getContext('2d') as CanvasRenderingContext2D;
        ctx.strokeStyle = "#3ff100";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(winningLine[0][0], winningLine[0][1]);
        ctx.lineTo(winningLine[1][0], winningLine[1][1]);
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
        ctx.clearRect(x - 36, y - 39, 72, 35);
        ctx.arc(x, y, 36, 0, 2 * Math.PI)
        ctx.fill();
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                onClick={clickGrid}
                width="640"
                height="480"
                className="bg-amber-50 gameCanva">
            </canvas>
        </>
    )
}

export default Puissance4;