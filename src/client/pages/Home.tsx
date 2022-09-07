import React, { useEffect, useReducer, useState } from 'react';
import { NavLink } from "react-router-dom";
import ReconnectingWebSocket from "reconnecting-websocket";
import { io, Socket } from "socket.io-client";
import { v4 as uuid } from "uuid";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Label from "../components/Label";
import Title from '../components/Title';
import Logo from "../components/Logo";
import Link from "../components/Link";
import Game from "./Game";

const socket = io('ws://localhost:8000/');

const Home = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [playerName, setPlayerName] = useState<string>();
  const [state, setState] = useState<any>({
    players: [],
    connected: socket.connected,
  });

  socket.on('connect', () => {
    setIsConnected(true);
  });

  socket.on('disconnect', () => {
    setIsConnected(false);
  });

  const handleEvent = (data: any) => {
    console.log('le jeu mis à jour', data);
    // setState(data)
  }


  useEffect(() => {
    console.log('ici');

    socket.on('message', handleEvent);

    const gameId = new URLSearchParams(window.location.search).get('gameId');

    if (gameId && socket) {
      console.log('on m\'a partagé un lien : ', gameId);
    }
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);


  const createGame = () => {
    const gameId = uuid();
    const currentState = {
      ...state,
      type: 'createGame',
      gameId,
      players: [{ playerId: uuid(), playerName }]
    }
    setState(currentState);

    socket.emit('message', currentState);
  }
  return (
    <>
      {/*<div className="w-full flex flex-col justify-center">
        <div className="mx-auto">
          <Logo/>
        </div>
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full xl:w-2/4 lg:w-11/12 flex">
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{ backgroundImage: `url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')` }}></div>
              <div className="w-full lg:w-7/12 bg-gray-100 p-5 rounded-lg lg:rounded-l-none">
                <Title>Jouer au Puissance 4</Title>
                <Title>Renseignez votre pseudo pour créer une nouvelle partie</Title>
                <div className="mb-4">
                  <Label htmlFor="pseudo">Pseudo</Label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="pseudo"
                    type="text"
                    placeholder="Pseudo"
                    onChange={(e) => setPseudo(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6 text-center">
                  <Link route="/game">
                    <Button type="submit">Jouer</Button>
                  </Link>
                </div>
                <Alert type="error" message={error}/>
                <Alert type="success" message={success}/>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
      <div>
        {/*<input*/}
        {/*  type="text"*/}
        {/*  value={playerName}*/}
        {/*  onChange={(e) => setPlayerName(e.target.value)}*/}
        {/*/>*/}
        {/*<p>votre playerName : {playerName}</p>*/}

        <NavLink onClick={createGame} to={`/game/${state.gameId}`}>Create Game</NavLink>
        {/*<button type='submit' onClick={() => createGame()}>Create Game</button>*/}
      </div>
    </>
  );
}

export default Home;
