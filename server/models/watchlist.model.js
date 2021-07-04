import mongoose from 'mongoose';

const watchlistItemSchema = new mongoose.Schema({
  title: String,
  category: String,
  creator: String,
  location: String,
  time: String,
  rating: Number,
  notes: String
});

const Watchlist = mongoose.model('watchlist-item', watchlistItemSchema);

export default Watchlist;
