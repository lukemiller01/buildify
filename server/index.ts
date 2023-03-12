import express from 'express';
import { ApolloServer } from "@apollo/server";
import schema from './graphql/schema.js'; // https://www.typescriptlang.org/docs/handbook/esm-node.html
import cors from 'cors'
import pkg from 'body-parser';
const { json } = pkg;
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';

const PORT = 5001;
dotenv.config();

async function startApolloServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        schema
    });
    await apolloServer.start();
  
    app.get('/', (req, res) => {
        res.sendStatus(200);
    })
    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(apolloServer, {
        context: async ({ req }) => ({ token: req.headers.token }),
      })
    )
  
    await new Promise<void>(resolve => app.listen({port: PORT}, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
    return { apolloServer, app };
}

startApolloServer();