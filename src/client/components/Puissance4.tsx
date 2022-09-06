import React, {useEffect, useRef, useState} from 'react';

interface Puissance4Props {
    gameData: number[][]
}

const Puissance4 = ({gameData}: Puissance4Props) => {

    const canvasRef = useRef(null)
    const [click, setClick] = useState(0);

    function addJeton(player = 1, ligne = 2, colonne = 0) {
        const canvas = canvasRef.current
        // @ts-ignore
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.fillStyle = (player === 1) ? "#c82124" : "#1e90ff";
        const x = ((colonne) * 45.47) + 46;
        const y = ((ligne) * 40.2) + 40.2;
        ctx.arc(x, y, 35, 0, 2 * Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        addJeton()
    }, [click]);

    return (
        <>
            <button onClick={() => setClick(click + 1)}>Click</button>
            <canvas ref={canvasRef} width="640" height="480" className="bg-amber-50" style={{ height: '480px', width: '640px', backgroundImage: "url('./assets/grille.png')" }}></canvas>
        </>
    )
}

export default Puissance4;