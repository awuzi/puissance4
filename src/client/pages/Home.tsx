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
    if (!joinCode?.trim()) {
      alert('Merci de renseigner un code d\'accès valide');
    }
    const currentState = {
      ...context,
      gameId: joinCode,
      playerId: generatePlayerId(),
      playerColor: PlayerColor.YELLOW
    };
    socket.emit(GameAction.JOIN, currentState);
    navigate(`/game/${joinCode}`, { replace: true });
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => setJoinCode(e.target.value)}
          />
          <button onClick={joinGame} className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg p-2">
            Rejoindre partie
          </button>
        </div>
      </div>

      {/*<button onClick={dropToken}>poser un jeton</button>*/}
      <hr/>
      <Puissance4/>
      <pre>{JSON.stringify(context, null, 2)}</pre>

      {/*</div>*/}
    </>
  );
}
