import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import dirname from './lib/pathHelpers.js';

import watchlistRoutes from './routes/watchlist.routes.js';
import libraryRoutes from './routes/library.routes.js';

const __dirname = dirname(import.meta.url);

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'kultur-notiert';
const connectionString =
  process.env.DB_CONNECTION || 'mongodb://localhost:27017/' + DB_NAME;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const server = express();

server.use(cors());

server.use(express.json());

server.use(watchlistRoutes);
server.use(libraryRoutes);

server.use(express.static(path.join(__dirname, '../client/build')));

server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

server.get('/health', (request, response) =>
  response.json('This is my test message to see if the server is running.')
);

const port = process.env.PORT || 4000;
server.listen(port);
