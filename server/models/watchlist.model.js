import mongoose from 'mongoose';

const watchlistItemSchema = new mongoose.Schema({
  title: String,
  category: String
});

const Watchlist = mongoose.model('watchlist-item', watchlistItemSchema);

export default Watchlist;
