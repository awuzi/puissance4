import React, {useEffect, useRef, useState} from 'react';

interface Puissance4Props {
    gameData: number[][]
}

const Puissance4 = ({gameData}: Puissance4Props) => {

    const canvasRef = useRef(null)
    const [click, setClick] = useState(0);

    function drawJeton(player = 1, ligne = 4, colonne = 0) {
        const canvas = canvasRef.current
        // @ts-ignore
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = (player === 1) ? "#c82124" : "#1e90ff";
        const x = colonne == 0 ? 50 : (colonne * 90) + 50;
        const y = ligne == 0 ? 41 : (ligne * 80) + 41;

        for (let i = 0; i < y; i++) {
            setTimeout(function() {
                animate(ctx, x, i);
            }, 1000 / 30);
        }
    }

    function animate(ctx: any, x: number, i: number) {
        let bg = new Image();
        bg.src = "/assets/grille.png";
        ctx.clearRect(0, 0, 640, 480);
        ctx.drawImage(bg, 0, 0, 640, 480);
        ctx.beginPath();
        ctx.arc(x, i, 35, 0, 2 * Math.PI)
        ctx.fill()
        console.log("i work");
    }

    useEffect(() => {
        drawJeton()
    }, [click]);

    return (
        <>
            <canvas ref={canvasRef} width="640" height="480" className="bg-amber-50" style={{ height: '480px', width: '640px', backgroundImage: "url('./assets/grille.png')" }}></canvas>
        </>
    )
}

export default Puissance4;