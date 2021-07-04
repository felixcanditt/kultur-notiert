import express from 'express';

import {
  getWatchlist,
  addToWatchlist,
  editWatchlist,
  removeFromWatchlist
} from '../controller/watchlist.controller.js';

const router = express.Router();

router.get('/watchlist/', getWatchlist);
router.post('/watchlist', addToWatchlist);
router.put('/watchlist/:itemId', editWatchlist);
router.delete('/watchlist/:itemId', removeFromWatchlist);

export default router;
