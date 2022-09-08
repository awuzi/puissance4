import { Simulate } from "react-dom/test-utils";
import { Server, Socket } from "socket.io";
import { GameAction, GameId, GameState, GridState, PlayerColor, PlayerId } from "../domain/types";

let game: { gameId: string, players: { id: string, playerColor: PlayerColor }[] } = {
  gameId: '',
  players: []
};

export const registerListeners = (io: Server, socket: Socket): void => {

  const gameUpdate = (data: GameState) => {
    socket.broadcast.emit(GameAction.GAME_UPDATE, data);
  }

  const createGame = (data: GameState) => {
    game = data;
    socket.join(data.gameId);
  }

  const join = ({ gameId, playerId, playerColor }: { gameId: GameId, playerId: PlayerId, playerColor: PlayerColor }) => {
    game.players.push({ id: playerId, playerColor });
    socket.join(gameId);
    io.in(gameId).emit(GameAction.GAME_UPDATE, game);
  }


  socket.on<GameAction>(GameAction.CREATE_GAME, createGame);
  socket.on<GameAction>(GameAction.JOIN, join);
  socket.on<GameAction>(GameAction.GAME_UPDATE, gameUpdate);
}
