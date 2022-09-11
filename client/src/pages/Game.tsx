import React, { useContext } from 'react';
import Puissance4 from "../components/Puissance4";
import { GameContext, socket } from "../context";

export const Game = () => {

  const { context, setContext } = useContext(GameContext);

  return (
    <>
      <div className="container mx-auto flex flex-col justify-center">
          <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
            <Puissance4 />
          </div>
      </div>
    </>
  );
};
