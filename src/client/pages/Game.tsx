import React, { useContext, useEffect, useState } from 'react';
import { GameAction, GameState } from "../../domain/types";
import Logo from "../components/Logo";
import Puissance4 from "../components/Puissance4";
import Link from "../components/Link";
import { GameContext, socket } from "../context";

export const Game = () => {

  const { context, setContext } = useContext(GameContext);
  const [playing, setPLaying] = useState(true);

  return (
    <>
      {/*<div className="container mx-auto flex flex-col justify-center">*/}
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>

        <Puissance4/>
        {!playing ?
          <div className="float-left bg-amber-50 bg-opacity-90 absolute text-center" style={{ height: "480px", width: "640px" }}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">
              La partie est terminée
              <br/>
              <Link route="/">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                  Nouvelle partie
                </button>
              </Link>
            </div>
          </div>
          : ''}
        <pre>{JSON.stringify(context, null, 2)}</pre>
      </div>
      {/*</div>*/}
    </>
  );
};
