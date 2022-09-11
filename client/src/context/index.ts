import React from "react";
import { io } from "socket.io-client";
import { GameId, GameState, GridState, Player } from "../domain/types";

export const socket = io('ws://localhost:8000/');
export const GameContext = React.createContext({
  context: {} as GameState,
  setContext: (v: GameState | any): void => {}
});
