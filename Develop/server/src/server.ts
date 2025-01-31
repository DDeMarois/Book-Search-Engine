import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { getUserFromToken } from './services/auth.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';
console.log('Server starting...');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log('Express middleware initialized...');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
console.log('Apollo server initialized...');

await server.start();
console.log('Apollo server started...');

app.use('/graphql', expressMiddleware(server, {
  context: async ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1] || '';
    const user = await getUserFromToken(token);
    return { user };
  },
}));
console.log('Express middleware initialized...');

if (process.env.NODE_ENV === 'production') {
  console.log('Production environment detected...');
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

app.use(routes);
console.log('Routes initialized...');
console.log('Server starting...');

mongoose.connect(MONGODB_URI);

mongoose.connection.once('connected', () => {
  console.log('Connected to the database');
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });

  console.log('Server started...');
});