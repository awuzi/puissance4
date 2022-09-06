import Fastify from 'fastify';
import fastifyIO from "fastify-socket.io";
import FastifyStatic from "@fastify/static";
// import FastifyWS, { SocketStream } from "@fastify/websocket";
import { resolve } from "path";


const fastify = Fastify({ logger: false });
fastify.register(FastifyStatic, { root: resolve("./public") });
fastify.register(fastifyIO);

fastify.ready().then(() => {
  const io = fastify.io;

  io.on("connection", (socket) => {
    console.log('socket.id : ', socket.id);

    socket.on('message', (data) => {
      console.log('data.event : ', data.event);
      io.emit('message', { id: socket.id, ...data });
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
