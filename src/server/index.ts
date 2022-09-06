import Fastify from 'fastify';
import fastifyIO from "fastify-socket.io";
import FastifyStatic from "@fastify/static";
import { resolve } from "path";


const fastify = Fastify({ logger: false });
fastify.register(FastifyStatic, { root: resolve("./public") });
fastify.register(fastifyIO);



fastify.ready().then(() => {
  fastify.io.on("connection", (socket) => {
    console.info('Socket connected!', socket.id);

    socket.on('event', (...args) => {
      console.log('args : ', args);
    })
  });
});

// (async () => {
//   try {
//     await fastify.listen(process.env.PORT || 8000, "0.0.0.0");
//     console.log('🔥 Server is UP on port 8000');
//   } catch (err) {
//     fastify.log.error(err);
//   }
// })();


fastify.listen(process.env.PORT || 8000, "0.0.0.0", () => {
  console.log('🔥 Server is UP on port 8000');
})
