import React from "react";
import { io } from "socket.io-client";
import { makeEmptyGrid } from "../../domain/grid";
import { GameId, GameState, GridState, Player } from "../../domain/types";

export const socket = io(`${window.location.protocol.replace("http", "ws")}//${window.location.host}/`);
export const GameContext = React.createContext({
  context: {} as GameState,
  setContext: (v: GameState | any): void => {}
});
