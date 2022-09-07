import { platform } from "os";
import React, { ChangeEvent, FormEventHandler, useEffect, useReducer, useState } from 'react';
import { NavLink } from "react-router-dom";
import ReconnectingWebSocket from "reconnecting-websocket";
import { io, Socket } from "socket.io-client";
import { v4 as uuid } from "uuid";
import { makeEmptyGrid } from "../../domain/grid";
import { replaceQueryParams } from "../../shared/helpers/url";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Label from "../components/Label";
import { PlayerForm } from "../components/PlayerForm";
import Title from '../components/Title';
import Logo from "../components/Logo";
import Link from "../components/Link";

const socket = io('ws://localhost:8000/');

const Home = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [gameId, setGameId] = useState<string>();
  const [state, setState] = useState<any>({
    gameId: '',
    players: [],
    grid: []
  });
  const [players, setPlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>('');

  // socket.on('connect', () => {
  //   setIsConnected(true);
  // });
  //
  // socket.on('disconnect', () => {
  //   setIsConnected(false);
  // });

  useEffect(() => {

    socket.on('message', (data: any) => {
      setState(data);
      console.log('le jeu mis à jour', data);
    });

    socket.on('joined', (data) => {
      console.log('joined event : ', data);
      setState(data);
      // socket.emit('message', data);
    });

    socket.on('tokenDropped', (data) => {
      // state.grid = grid;
      setState(data);
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);
  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => setJoinCode(e.target.value);


  const createGame = () => {
    const gameId = 'game';
    setGameId(gameId);
    const currentState = {
      ...state,
      gameId: 'game',
      players: [...state.players, socket.id]
    };
    setState(currentState);
    socket.emit('createGame', currentState);
  };

  const joinGame = () => {
    const currentState = {
      ...state,
      gameId: 'game',
      playerId: socket.id
    };
    socket.emit('join', currentState);
  }

  const dropToken = () => {
    const token = `droped by ${socket.id}`;
    socket.emit('dropToken', [...state.grid, `droped by ${socket.id}`]);
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
      <div className="flex flex-col justify-center">
        <button type="submit" onClick={createGame} className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg p-2">
          Créer partie
        </button>

        gameId = {gameId}

        <div>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2" type="text"
            placeholder={'Entrer le code de la partie'}
            value={joinCode}
            onChange={handleChangeCode}
          />
          <button onClick={joinGame}>Rejoindre partie</button>
        </div>
      </div>

      <button onClick={dropToken}>poser un jeton</button>
      <hr/>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      {/*</div>*/}
    </>
  );
}

export default Home;
