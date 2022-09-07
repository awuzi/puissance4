import Fastify from 'fastify';
import fastifyIO from "fastify-socket.io";
import FastifyStatic from "@fastify/static";
// import FastifyWS, { SocketStream } from "@fastify/websocket";
import { resolve } from "path";
import { PlayerColor } from "../domain/types";


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

    socket.on('message', (data) => {
      socket.broadcast.emit('message', data);
    });

    socket.on('createGame', currentState => {
      game = currentState;
      socket.join('game');
    });

    socket.on('dropToken', grid => {
      io.in('game').emit('tokenDropped', { ...game, grid });
    });

    socket.on('join', ({ gameId, playerId, playerColor }) => {
      game.players.push({ id: playerId, playerColor });
      socket.join(gameId);
      io.in('game').emit('joined', game);
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
