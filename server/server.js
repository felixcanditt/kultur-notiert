import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import watchlistRoutes from './routes/watchlist.routes.js';
import libraryRoutes from './routes/library.routes.js';

const connectionString = 'mongodb://localhost:27017/kultur-notiert';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', (request, response) =>
  response.json('This is my test message to see if the server is running.')
);

server.use(watchlistRoutes);
server.use(libraryRoutes);

server.listen(4000);
