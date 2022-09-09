import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { makeEmptyGrid } from "../../domain/grid";
import { GameAction, GameId, GameState, GridState, Player, PlayerColor, PlayerId } from "../../domain/types";
import { createState } from "../../shared/helpers/state";
import { generateGameId, generatePlayerId } from "../../shared/helpers/uuid";
import Puissance4 from "../components/Puissance4";
import { GameContext, socket } from "../context";

export const Home = () => {
  const { context, setContext } = useContext(GameContext);
  const navigate = useNavigate();
  const [gameId, setGameId] = useState<string>();
  const [joinCode, setJoinCode] = useState<string>('');

  const createGame = (): void => {
    const currentState = createState(context);
    setGameId(currentState.gameId);
    setContext(currentState);
    socket.emit(GameAction.CREATE_GAME, currentState);
    navigate(`/game/${currentState.gameId}`, { replace: true });
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
    localStorage.setItem('playerId', currentState.playerId);
    localStorage.setItem('playerColor', currentState.playerColor);
    socket.emit(GameAction.JOIN, currentState);
    navigate(`/game/${joinCode}`, { replace: true });
  }

  return (
    <>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

        <button onClick={createGame} className="w-1/4 text-white bg-blue-700 hover:bg-blue-800 rounded-lg p-2">
          Créer partie
        </button>
        <hr/>
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
    </>
  );
}
