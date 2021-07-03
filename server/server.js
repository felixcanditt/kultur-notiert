import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import watchlistRoutes from './routes/watchlist.routes.js';
import libraryRoutes from './routes/library.routes.js';

dotenv.config();
const server = express();

const DB_NAME = process.env.DB_NAME || 'kultur-notiert';
const connectionString =
  process.env.DB_CONNECTION || 'mongodb://localhost:27017/' + DB_NAME;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

server.use(cors());
server.use(express.json());

server.get('/', (request, response) =>
  response.json('This is my test message to see if the server is running.')
);

server.use(watchlistRoutes);
server.use(libraryRoutes);

server.listen(4000);
