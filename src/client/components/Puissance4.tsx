import React, {useEffect, useRef, useState} from 'react';

interface Puissance4Props {
    gameData: number[][]
}

const Puissance4 = ({gameData}: Puissance4Props) => {

    const canvasRef = useRef(null)
    const grilleCoords = [100, 190, 280, 370, 460, 550, 640];

    function clickGrille(click: React.MouseEvent) {
        const canvas = canvasRef.current
        // @ts-ignore
        let rect = canvas.getBoundingClientRect();
        let x = click.clientX - rect.left;
        let y = click.clientY - rect.top;

        for (const [index, coord] of grilleCoords.entries()) {
            if (x < coord) {
                drawJeton(1, 5, index);
                break;
            }
        }
    }

    function drawJeton(player = 1, ligne = 2, colonne = 0) {
        const canvas = canvasRef.current
        // @ts-ignore
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = (player === 1) ? "#c82124" : "#1e90ff";
        const x = colonne == 0 ? 50 : (colonne * 90) + 50;
        const y = ligne == 0 ? 41 : (ligne * 80) + 41;
        let i = 0;
        const anim = setInterval(function() {
            i++;
            animate(ctx, x, i);
            if (i >= y) clearInterval(anim);
        }, 1);
    }

    function animate(ctx: any, x: number, i: number) {
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