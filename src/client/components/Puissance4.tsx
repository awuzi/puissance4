import React, {useEffect, useRef, useState} from 'react';
import {findFreePositionY, playTurn} from "../../domain/gamerules";
import {CellState, GridState, PlayerColor, Position, WinningSequence} from "../../domain/types";
import {CANVA_HEIGHT, CANVA_WIDTH, CLEAR_RECT_HEIGHT, CLEAR_RECT_WIDTH, CLEAR_RECT_X, CLEAR_RECT_Y, GAME_SPEED, GRID, PLAYER_ONE_COLOR, PLAYER_TWO_COLOR, TOKEN_DISTANCE_X, TOKEN_DISTANCE_Y, TOKEN_OFFSET_X, TOKEN_OFFSET_Y, TOKEN_RADIUS, WINNING_LINE_COLOR, WINNING_LINE_WIDTH} from "../constants";

interface Puissance4Props {
    gameData: GridState,
    updateGrid?: (grid: GridState) => void
    playerColor: PlayerColor
}

const Puissance4 = ({gameData, playerColor, updateGrid}: Puissance4Props) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canDrop, setCanDrop] = useState(true);
    const [winSequence, setWinSequence] = useState<boolean|WinningSequence>(false);

    useEffect(() => {
        defaultState();

    }, [gameData]);

    useEffect(() => {
        if (winSequence !== false && typeof winSequence == 'object') {
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

        for (const [column, coord] of GRID.entries()) {
            if (x < coord && canDrop) {
                const freePosY = findFreePositionY(column, gameData);
                dropTokenCanva(playerColor, freePosY, column);
                const {grid, isWon, winningSequence} = playTurn(playerColor, column, gameData);
                updateGrid!(grid); // renvoyer la data aux autres client
                console.log(isWon, winningSequence);
                //if (isWon == true) setWinSequence(winningSequence);
                break;
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
        ctx.fillStyle = color === PlayerColor.RED ? PLAYER_ONE_COLOR : PLAYER_TWO_COLOR;

        const {x, y} = calculatePosition(ligne, colonne);

        if (!instant) {
            setCanDrop(false);
            let i = 0;
            const anim = setInterval(() => {
                i = i + GAME_SPEED;
                drawToken(ctx, x, i);
                if (i >= y) {
                    clearInterval(anim);
                    setCanDrop(true);
                }
            }, 1);
        }else drawToken(ctx, x, y);
    }

    /**
     * Calcule la position en pixels d'un jeton
     * @param ligne
     * @param colonne
     */
    function calculatePosition(ligne: number, colonne: number): Position {
        return {
          x: (colonne == 0 ? TOKEN_OFFSET_X : (colonne * TOKEN_DISTANCE_X) + TOKEN_OFFSET_X),
          y: (ligne == 0 ? TOKEN_OFFSET_Y : (ligne * TOKEN_DISTANCE_Y) + TOKEN_OFFSET_Y)
        };
    }

    /**
     * Dessine la ligne gagnante en utilisant les deux cellules d'extremité
     * @param winningCellOne
     * @param winningCellTwo
     */
    function drawWinningLine(winningCellOne: Position, winningCellTwo: Position): void {
        const canvas = canvasRef.current;
        const ctx = canvas!.getContext('2d') as CanvasRenderingContext2D;
        ctx.strokeStyle = WINNING_LINE_COLOR;
        ctx.lineWidth = WINNING_LINE_WIDTH;
        ctx.beginPath();
        const cellOne = calculatePosition(winningCellOne.x, winningCellOne.y);
        ctx.moveTo(cellOne.x, cellOne.y);
        const cellTwo = calculatePosition(winningCellTwo.x, winningCellTwo.y)
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
                onClick={clickGrid}
                width={CANVA_WIDTH}
                height={CANVA_HEIGHT}
                className="bg-amber-50 gameCanva"
                style={{width: CANVA_WIDTH, height: CANVA_HEIGHT}}
            >
            </canvas>
        </>
    )
}

export default Puissance4;