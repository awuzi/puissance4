import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { makeEmptyGrid } from "../../domain/grid";
import { GameAction, GameId, GameState, GridState, Player, PlayerColor, PlayerId } from "../../domain/types";
import { generateGameId, generatePlayerId } from "../../shared/helpers/uuid";
import Puissance4 from "../components/Puissance4";
import { GameContext, socket } from "../context";

export const Home = () => {
  const { context, setContext } = useContext(GameContext);
  const navigate = useNavigate();
  const [gameId, setGameId] = useState<string>();
  const [joinCode, setJoinCode] = useState<string>('');

  useEffect(() => {

  }, []);

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => setJoinCode(e.target.value);

  const emit = (ev: GameAction, context: any) => {
    socket.emit(ev, context);
  }

  const createGame = (): void => {
    const gameId = generateGameId();
    setGameId(gameId);
    const currentPlayer = { id: generatePlayerId(), playerColor: PlayerColor.RED };
    const currentState = {
      ...context,
      gameId,
      currentPlayer,
      players: [currentPlayer]
    };
    setContext(currentState);
    socket.emit(GameAction.CREATE_GAME, currentState);
    navigate(`/game/${gameId}`, { replace: true });
  };

  const joinGame = (): void => {
    const currentState = {
      ...context,
      gameId: joinCode,
      playerId: generatePlayerId(),
      playerColor: PlayerColor.YELLOW
    };
    socket.emit(GameAction.JOIN, currentState);
    navigate(`/game/${joinCode}`, { replace: true });
  }

  const updateGrid = (grid: GridState): void => {
    const currentState = {
      ...context,
      currentPlayer: context.players.find(s => s.id !== context.currentPlayer.id)!,
      grid
    };
    setContext(context);
    socket.emit(GameAction.GAME_UPDATE, currentState);
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
        gameData={context.grid}
        updateGrid={updateGrid}
        playerColor={context.currentPlayer?.playerColor}
      />
      <pre>{JSON.stringify(context, null, 2)}</pre>

      {/*</div>*/}
    </>
  );
}
