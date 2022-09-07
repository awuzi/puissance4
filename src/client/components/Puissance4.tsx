import React, {useEffect, useRef, useState} from 'react';
import {CellState, GridState} from "../../domain/types";

interface Puissance4Props {
    gameData: GridState
}

const Puissance4 = ({gameData}: Puissance4Props) => {

    const canvasRef = useRef(null)
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
        // @ts-ignore
        let rect = canvas.getBoundingClientRect();
        let x = click.clientX - rect.left;
        let y = click.clientY - rect.top;

        for (const [index, coord] of grilleCoords.entries()) {
            if (x < coord) {
                dropJeton('R', 5, index);
                break;
            }
        }
    }

    function dropJeton(player = 'R', ligne = 2, colonne = 0, instant = false) {
        const canvas = canvasRef.current
        // @ts-ignore
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = (player === 'R') ? "#c82124" : "#FFFF00";
        const x = colonne == 0 ? 50 : (colonne * 90) + 50;
        const y = ligne == 0 ? 41 : (ligne * 80) + 41;
        if (instant) {
            drawJeton(ctx, x, y);
        }else {
            let i = 0;
            const anim = setInterval(function () {
                i++;
                drawJeton(ctx, x, i);
                if (i >= y) clearInterval(anim);
            }, 1);
        }
    }

    function drawJeton(ctx: any, x: number, i: number) {
        ctx.beginPath();
        ctx.clearRect(x-35, i-37, 70, 35);
        ctx.arc(x, i, 35, 0, 2 * Math.PI)
        ctx.fill();
    }

    return (
        <>
            <canvas ref={canvasRef} onClick={(e) => clickGrille(e)} width="640" height="480" className="bg-amber-50" style={{ height: '480px', width: '640px', backgroundImage: "url('./assets/grille.png')" }}></canvas>
        </>
    )
}

export default Puissance4;