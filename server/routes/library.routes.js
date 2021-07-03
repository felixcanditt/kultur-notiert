import express from 'express';

import {
  getLibrary,
  addToLibrary,
  editLibrary,
  removeFromLibrary
} from '../controller/library.controller.js';

const router = express.Router();

router.get('/library/', getLibrary);
router.post('/library', addToLibrary);
router.put('/library/:itemId', editLibrary);
router.delete('/library/:itemId', removeFromLibrary);

export default router;
