import Watchlist from '../models/watchlist.model.js';

export function getWatchlist(request, response) {
  Watchlist.find()
    .then((watchlist) => response.json(watchlist))
    .catch((error) => response.json(error.message));
}

export function addToWatchlist(request, response) {
  const newItem = new Watchlist({
    title: request.body.title,
    category: request.body.category,
    author: request.body.author,
    director: request.body.director,
    creator: request.body.creator,
    location: request.body.location,
    time: request.body.time
  });
  newItem
    .save()
    .then((savedItem) => response.json(savedItem))
    .catch((error) => response.json(error.message));
}

export function editWatchlist(request, response) {
  const { itemId } = request.params;
  const updatedItem = request.body;
  Watchlist.findByIdAndUpdate(
    { _id: itemId },
    updatedItem,
    { new: true },
    (error, doc) => {
      if (error) {
        response.json({ message: 'Could not update watchlist. ' });
        return;
      }
      response.json(doc);
    }
  );
}

export function removeFromWatchlist(request, response) {
  const { itemId } = request.params;
  Watchlist.findByIdAndDelete({ _id: itemId }, (error, doc) => {
    if (error) {
      response.json({
        success: false,
        message: `Could not delete the item ${doc.title}.`
      });
      return;
    }

    response.json({
      success: true,
      message: `The item ${doc.title} has been deleted.`,
      data: doc
    });
  });
}
