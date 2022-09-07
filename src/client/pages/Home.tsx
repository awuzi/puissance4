import React, { ChangeEvent, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import { makeEmptyGrid } from "../../domain/grid";
import { GameAction, GameId, GridState, PlayerColor, PlayerId } from "../../domain/types";
import Puissance4 from "../components/Puissance4";
import { v4 as uuid } from 'uuid';

const socket = io('ws://localhost:8000/');

const Home = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [gameId, setGameId] = useState<string>();
  const [state, setState] = useState<{
    gameId: string,
    players: { id: string, playerColor: PlayerColor }[],
    currentPlayer: { id: string, playerColor: PlayerColor },
    grid: GridState
  }>({
    gameId: '' as GameId,
    players: [],
    currentPlayer: {} as { id: PlayerId, playerColor: PlayerColor },
    grid: makeEmptyGrid(6)(7)
  });
  const [players, setPlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>('');


  useEffect(() => {

    socket.on(GameAction.MESSAGE, (data: typeof state) => {
      setState(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => setJoinCode(e.target.value);


  const createGame = () => {
    const gameId = uuid() as GameId;
    setGameId(gameId);
    const currentPlayer = { id: socket.id, playerColor: PlayerColor.RED };
    const currentState = {
      ...state,
      gameId,
      currentPlayer,
      players: [currentPlayer]
    };
    setState(currentState);
    socket.emit(GameAction.CREATE_GAME, currentState);
  };

  const joinGame = () => {
    const currentState = {
      ...state,
      gameId: joinCode,
      playerId: socket.id,
      playerColor: PlayerColor.YELLOW
    };
    socket.emit(GameAction.JOIN, currentState);
  }

  const updateGrid = (grid: GridState) => {
    const currentState = {
      ...state,
      currentPlayer: state.players.find(s => s.id !== socket.id)!,
      grid
    };
    setState(currentState);
    socket.emit(GameAction.MESSAGE, currentState);
  }

  return (
    <>
      <div className="container mx-auto flex flex-col justify-center">
        <button onClick={createGame} className="w-1/4 text-white bg-blue-700 hover:bg-blue-800 rounded-lg p-2">
          Créer partie
        </button>

        <p>
          gameId = {gameId}
        </p>

        <div>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2" type="text"
            placeholder={'Entrer le code de la partie'}
            value={joinCode}
            onChange={handleChangeCode}
          />
          <button onClick={joinGame} className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg p-2">
            Rejoindre partie
          </button>
        </div>
      </div>

      {/*<button onClick={dropToken}>poser un jeton</button>*/}
      <hr/>
      <Puissance4
        gameData={state.grid}
        updateGrid={updateGrid}
        playerColor={state.currentPlayer?.playerColor}
      />
      <pre>{JSON.stringify(state, null, 2)}</pre>

      {/*</div>*/}
    </>
  );
}

export default Home;
