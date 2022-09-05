import React, {useState} from 'react';
import Logo from "../components/Logo";

const Game = () => {

    return (
        <>
            <div style={{height: "100vh"}}>
                <div className="w-full h-full flex flex-row items-center">
                    <Logo className="flex" style={{width: "250px", height: "250px"}} />
                </div>
            </div>
        </>
    );
}

export default Game;