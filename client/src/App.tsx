import './assets/style.css'
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import { makeEmptyGrid } from "./domain/grid";
import { GameAction, GameId, GameState, GridState, Player } from "./domain/types";
import { GameContext, socket } from "./context/";
import { Home } from "./pages/Home";
import { Game } from "./pages/Game";
import type { Dispatch } from 'react'
import React, { SetStateAction, useContext, useEffect, useState } from "react";

const App = () => {
  const [context, setContext] = useState({
    gameId: '' as GameId,
    players: [] as Player[],
    currentPlayer: {} as Player,
    grid: makeEmptyGrid(6)(7)
  });

  useEffect(() => {
    socket.on(GameAction.GAME_UPDATE, (data: GameState) => {
      console.log('GameAction.GAME_UPDATE : ', data);
      setContext(data);
    });
  }, []);

  return (
    <GameContext.Provider value={{ context, setContext }}>
      <div className="App">
        <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path="game/:gameId" element={<Game/>}/>
        </Routes>
      </div>
    </GameContext.Provider>
  )
}

export default App;
