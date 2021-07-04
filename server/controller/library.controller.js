import Library from '../models/library.model.js';

export function getLibrary(request, response) {
  Library.find()
    .then((library) => response.json(library))
    .catch((error) => response.json(error.message));
}

export function addToLibrary(request, response) {
  const newItem = new Library({
    title: request.body.title,
    category: request.body.category,
    creator: request.body.creator,
    location: request.body.location,
    time: request.body.time,
    rating: request.body.rating,
    notes: request.body.notes
  });
  newItem
    .save()
    .then((savedItem) => response.json(savedItem))
    .catch((error) => response.json(error.message));
}

export function editLibrary(request, response) {
  const { itemId } = request.params;
  const updatedItem = request.body;
  Library.findByIdAndUpdate(
    { _id: itemId },
    updatedItem,
    { new: true },
    (error, doc) => {
      if (error) {
        response.json({ message: 'Could not update library.' });
        return;
      }
      response.json(doc);
    }
  );
}

export function removeFromLibrary(request, response) {
  const { itemId } = request.params;
  Library.findByIdAndDelete({ _id: itemId }, (error, doc) => {
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
