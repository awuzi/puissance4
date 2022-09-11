import React, { useContext } from 'react';
import Puissance4 from "../components/Puissance4";
import { GameContext, socket } from "../context";

export const Game = () => {

  const { context, setContext } = useContext(GameContext);

  return (
    <>

        <div style={{ height: "100vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Puissance4 />
        </div>
    </>
  );
};
