import React from "react";
import { io } from "socket.io-client";
import { makeEmptyGrid } from "../../domain/grid";
import { GameId, GameState, GridState, Player } from "../../domain/types";

export const socket = io(`${window.location.protocol.replace("http", "ws")}//${window.location.host}/`);
export const GameContext = React.createContext({
  context: {
    gameId: '' as GameId,
    players: [] as Player[],
    currentPlayer: {} as Player,
    grid: makeEmptyGrid(6)(7) as GridState
  },
  setContext: (v: any): void => {}
});
