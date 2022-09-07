import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import Logo from "../components/Logo";
import Puissance4 from "../components/Puissance4";
import {GridState, PlayerColor} from "../../domain/types";

const Game = () => {

  const { gameId } = useParams();
  const [playing, setPlaying] = useState(true);
  const [gameData, setGameData] = useState<GridState>([
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', PlayerColor.RED, PlayerColor.YELLOW, '_', '_'],
  ]);

  return (
    <>
      <div className="h-full flex flex-row items-center justify-between" style={{ height: "100vh" }}>
        <div className="flex">
          <Logo className="flex" style={{ width: "250px", height: "250px" }}/>
        </div>
        <div className="flex w-6/12 justify-center">
          {playing ?
            <Puissance4 gameData={gameData}/>
            : 'La partie est terminée'}
        </div>
        <div className="flex">
          <Logo className="flex" style={{ width: "250px", height: "250px" }}/>
        </div>
      </div>
    </>
  );
}

export default Game;
