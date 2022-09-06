import React, { useEffect, useReducer, useState } from 'react';
import ReconnectingWebSocket from "reconnecting-websocket";
import { io, Socket } from "socket.io-client";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Label from "../components/Label";
import Title from '../components/Title';
import Logo from "../components/Logo";
import Link from "../components/Link";
import {Simulate} from "react-dom/test-utils";

const Home = () => {
  const [socket, setSocket] = useState<Socket>();

  const [status, setStatus] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>('');
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [adversaire, setAdversaire] = useState<string>("Diyar");

  const onMessage = (args: any) => {
    localStorage.setItem('gameId', args.id);
    localStorage.setItem('playerName', args.name);
    console.log('le jeu mis à jour', args);
  }

  useEffect(() => {
    const socket = io();
    setSocket(socket);

    socket.on('connect', () => console.log('SocketIO is running ', socket.id))

    socket.on('message', onMessage);

  }, []);


  const createGame = () => {
    socket?.emit('message', { type: 'startGame', name: pseudo });
  }

  return (
    <>
      <div className="w-full flex flex-col justify-center">
          <div className="mx-auto">
              <Logo />
          </div>
          <div className="container mx-auto">
              <div className="flex justify-center">
                  <div className="w-full xl:w-2/4 lg:w-11/12 flex">
                      <div
                          className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                          style={{backgroundImage: `url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')`}}></div>
                      <div className="w-full lg:w-7/12 bg-gray-100 p-5 rounded-lg lg:rounded-l-none">
                          <Title>Créez une partie de Puissance 4</Title>
                          <Title>Renseignez votre pseudo pour jouer</Title>

                          <div className="mb-4">
                              <Label htmlFor="pseudo">Pseudo</Label>
                              <input
                                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                  id="pseudo"
                                  type="text"
                                  placeholder="Pseudo"
                                  onChange={(e) => setPseudo(e.target.value)}
                                  required
                              />
                          </div>
                          <div className="mb-6 text-center">
                              <Button onClick={() => createGame()}>Créer</Button>
                          </div>
                          <Alert type="error" message={error}/>
                          <Alert type="success" message={success}/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}

export default Home;
