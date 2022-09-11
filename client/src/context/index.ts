import React from "react";
import { io } from "socket.io-client";
import { GameState } from "../domain/types";

export const socket = io("ws://server.puissance.diyar.dev/");
export const GameContext = React.createContext({
  context: {} as GameState,
  setContext: (v: GameState | any): void => {}
});
