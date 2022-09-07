import React, { ChangeEvent, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import { makeEmptyGrid } from "../../domain/grid";
import { GridState, PlayerColor } from "../../domain/types";
import Puissance4 from "../components/Puissance4";

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
    gameId: '',
    players: [],
    currentPlayer: {} as { id: string, playerColor: PlayerColor },
    grid: makeEmptyGrid(6)(7)
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
    });

    socket.on('joined', (data) => {
      console.log('joined event : ', data);
      setState(data);
    });

    socket.on('tokenDropped', (data) => {
      console.log('joined event : ', data);
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
    const currentPlayer = { id: socket.id, playerColor: PlayerColor.RED };
    const currentState = {
      ...state,
      gameId: 'game',
      currentPlayer,
      players: [currentPlayer]
    };
    setState(currentState);
    socket.emit('createGame', currentState);
  };

  const joinGame = () => {
    const currentState = {
      ...state,
      gameId: 'game',
      playerId: socket.id,
      playerColor: PlayerColor.YELLOW
    };
    socket.emit('join', currentState);
  }

  const dropToken = () => {
    // const token = `droped by ${socket.id}`;
    // const currentState = {
    //   ...state,
    // }
    // socket.emit('dropToken', [...state.grid, `droped by ${socket.id}`]);
  }

  const updateGrid = (grid: GridState) => {
    const currentState = {
      ...state,
      currentPlayer: state.players.find(s => s.id !== socket.id)!,
      grid
    };
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
