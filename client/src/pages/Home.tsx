import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { GameAction, PlayerColor } from "../domain/types";
import { createState } from "../shared/helpers/state";
import { generatePlayerId } from "../shared/helpers/uuid";
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
        <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex flex-col items-center pb-10">
            <Logo className={"logo"}/>
            <div className="flex flex-col mt-4 space-x-3 md:mt-6">
              <button
                onClick={createGame}
                className="py-2 px-4 ml-3 mr-3 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Créer une partie
              </button>
              <span className="text-center font-bold my-2">ou</span>
              <div className="flex flex-row items-center">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 mr-2" type="text"
                  placeholder={'Entrer le code de la partie'}
                  value={joinCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setJoinCode(e.target.value)}
                />
                <button onClick={joinGame} className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg p-2 mr-3">
                  Rejoindre la partie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
