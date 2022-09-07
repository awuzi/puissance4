import Fastify from 'fastify';
import fastifyIO from "fastify-socket.io";
import FastifyStatic from "@fastify/static";
// import FastifyWS, { SocketStream } from "@fastify/websocket";
import { resolve } from "path";
import { GameAction, PlayerColor } from "../domain/types";


const fastify = Fastify({ logger: false });
fastify.register(FastifyStatic, { root: resolve("./public") });
fastify.register(fastifyIO);

let game: { gameId: string, players: { id: string, playerColor: PlayerColor }[] } = {
  gameId: '',
  players: []
};

fastify.ready().then(() => {
  const io = fastify.io;

  io.on("connection", (socket) => {
    // console.log('socket.id : ', socket.id);

    socket.on<GameAction>(GameAction.MESSAGE, (data) => {
      socket.broadcast.emit(GameAction.MESSAGE, data);
    });

    socket.on<GameAction>(GameAction.CREATE_GAME, currentState => {
      game = currentState;
      socket.join(game.gameId);
    });

    socket.on<GameAction>(GameAction.DROP_TOKEN, grid => {
      io.in(game.gameId).emit(GameAction.MESSAGE, { ...game, grid });
    });

    socket.on<GameAction>(GameAction.JOIN, ({ gameId, playerId, playerColor }) => {
      game.players.push({ id: playerId, playerColor });
      socket.join(gameId);
      io.in(gameId).emit(GameAction.MESSAGE, game);
    });

  });
});

(async () => {
  try {
    await fastify.listen(process.env.PORT || 8000, "0.0.0.0");
    console.log('🔥 Server is running on port 8000 🔥');
  } catch (err) {
    fastify.log.error(err);
  }
})();
