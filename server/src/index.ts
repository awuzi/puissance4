import Fastify from 'fastify';
import fastifyIO from "fastify-socket.io";
import FastifyStatic from "@fastify/static";
import { resolve } from "path";
import { Server, Socket } from "socket.io";
import { registerListeners } from "./listeners";


const fastify = Fastify({ logger: false });
fastify.register(FastifyStatic, { root: resolve("./build") });
fastify.register(fastifyIO, { cors: { origin: '*' } });

fastify.ready(err => {
  if (err) throw err;

  const io = fastify.io;
  const onConnection = (socket: Socket): void => registerListeners(io, socket);

  io.on('connection', onConnection);
});

(async () => {
  try {
    await fastify.listen(process.env.PORT || 8000, "0.0.0.0");
    console.log('🔥 Server is running on port 8000 🔥');
  } catch (err) {
    fastify.log.error(err);
  }
})();
