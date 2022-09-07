import React, {ChangeEvent, useEffect, useState} from 'react';
import Logo from "../components/Logo";
import Puissance4 from "../components/Puissance4";
import {GridState, PlayerColor} from "../../domain/types";
import {io} from "socket.io-client";
import {makeEmptyGrid} from "../../domain/grid";
import Link from "../components/Link";

const socket = io('ws://localhost:8000/');

const Game = () => {

  const [gameId, setGameId] = useState<string>();
  const [playing, setPlaying] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [state, setState] = useState<any>({
    gameId: '',
    players: [],
    // currentPlayer: '',
    grid: makeEmptyGrid(6)(7)
  });
  const [players, setPlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>('');


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

  const updateGrid = (grid: GridState) => {
    setState({ ...state, grid });
  }

  return (
    <>
      <div className="h-full flex flex-row items-center justify-between" style={{ height: "100vh" }}>
        <div className="flex">
          <Logo className="flex" style={{ width: "250px", height: "250px" }}/>
        </div>
        <div className="flex w-6/12 justify-center relative">

          <Puissance4 state={state.grid} playerColor={PlayerColor.RED}/>

          { !playing ?
             <div className="float-left bg-amber-50 bg-opacity-90 absolute text-center" style={{ height: "480px", width: "640px" }}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">
                  La partie est terminée
                <br />
                  <Link route="/">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                      Nouvelle partie
                    </button>
                  </Link>
                </div>
             </div>
          : '' }
        </div>
        <div className="flex">
          <Logo className="flex" style={{ width: "250px", height: "250px" }}/>
        </div>
      </div>
    </>
  );
}

export default Game;
