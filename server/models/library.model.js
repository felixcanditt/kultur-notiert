import mongoose from 'mongoose';

const libraryItemSchema = new mongoose.Schema({
  title: String,
  category: String,
  creator: String,
  location: String,
  time: String,
  rating: Number,
  notes: String
});

const Library = mongoose.model('library-item', libraryItemSchema);

export default Library;
