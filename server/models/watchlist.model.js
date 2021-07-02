import mongoose from 'mongoose';

const watchlistItemSchema = new mongoose.Schema({
  title: String,
  category: String,
  author: String,
  director: String,
  creator: String,
  location: String,
  time: String
});

const Watchlist = mongoose.model('watchlist-item', watchlistItemSchema);

export default Watchlist;
