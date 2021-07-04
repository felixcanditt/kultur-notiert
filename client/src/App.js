import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Library from './pages/Library';

import Header from './components/Header';
import Footer from './components/Footer';

import { updateLocalStorage, loadFromLocalStorage } from './lib/localStorage';

export default function App() {
  const [watchlist, setWatchlist] = useState(
    loadFromLocalStorage('kulturNotiertWatchlist') ?? []
  );

  const [library, setLibrary] = useState(
    loadFromLocalStorage('kulturNotiertLibrary') ?? []
  );

  const [itemToBeEdited, setItemToBeEdited] = useState('');

  const [currentPage, setCurrentPage] = useState('home');

  // useEffect(() => {
  //   fetch('http://localhost:4000/')
  //     .then((response) => response.json())
  //     .then((response) => setServerMessage(response));
  // }, []);

  useEffect(() => {
    fetch('/watchlist')
      .then((result) => result.json())
      .then((apiWatchlist) => setWatchlist(apiWatchlist))
      .catch((error) =>
        console.error(
          `Could not fetch watchlist, please check the following error message: `,
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch('/library')
      .then((result) => result.json())
      .then((apiLibrary) => setLibrary(apiLibrary))
      .catch((error) =>
        console.error(
          `Could not fetch library, please check the following error message: `,
          error
        )
      );
  }, []);

  useEffect(() => {
    updateLocalStorage('kulturNotiertWatchlist', watchlist);
  }, [watchlist]);

  useEffect(() => {
    updateLocalStorage('kulturNotiertLibrary', library);
  }, [library]);

  function addToWatchlist(newItem) {
    fetch('/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newItem.title,
        category: newItem.category,
        creator: newItem.creator,
        location: newItem.location,
        time: newItem.time,
        rating: newItem.rating,
        notes: newItem.notes
      })
    })
      .then((result) => result.json())
      .then((savedItem) => setWatchlist([...watchlist, savedItem]))
      .catch((error) =>
        console.error(
          `Could not add the item ${newItem.title} to watchlist, please check the following error message: `,
          error
        )
      );
  }

  function editWatchlist(editedItem) {
    const updatedWatchlist = watchlist.filter(
      (item) => item._id !== editedItem._id
    );

    fetch('/watchlist/' + editedItem._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedItem)
    })
      .then((result) => result.json())
      .then((savedItem) => {
        setWatchlist([...updatedWatchlist, savedItem]);
        setItemToBeEdited();
      })
      .catch((error) => console.error(error));
  }

  function removeFromWatchlist(itemToBeRemoved) {
    fetch('/watchlist/' + itemToBeRemoved._id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.data && response.data._id) {
          const updatedWatchlist = watchlist.filter(
            (item) => item._id !== response.data._id
          );
          setWatchlist(updatedWatchlist);
        } else {
          console.log(`Could not remove the item ${response.data.title}.`);
        }
      });
  }

  function checkItem(checkedItem) {
    function currentRating() {
      return checkedItem.rating ? checkedItem.rating : 0;
    }

    if (watchlist.find((item) => item._id === checkedItem._id)) {
      const checkedItemWithRating = {
        ...checkedItem,
        rating: currentRating()
      };
      addToLibrary(checkedItemWithRating);
      removeFromWatchlist(checkedItem);
    } else if (library.find((item) => item.id === checkedItem.id)) {
      addToWatchlist(checkedItem);
      removeFromLibrary(checkedItem);
    }
  }

  function addToLibrary(newItem) {
    fetch('/library', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newItem.title,
        category: newItem.category,
        creator: newItem.creator,
        location: newItem.location,
        time: newItem.time,
        rating: newItem.rating,
        notes: newItem.notes
      })
    })
      .then((result) => result.json())
      .then((savedItem) => setLibrary([...library, savedItem]))
      .catch((error) =>
        console.error(
          `Could not add the item ${newItem.title} to library, please check the following error message: `,
          error
        )
      );
  }

  function editLibrary(editedItem) {
    const updatedLibrary = library.filter(
      (item) => item._id !== editedItem._id
    );

    fetch('/library/' + editedItem._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedItem)
    })
      .then((result) => result.json())
      .then((savedItem) => {
        setLibrary([...updatedLibrary, savedItem]);
        setItemToBeEdited();
      })
      .catch((error) => console.error(error));
  }

  function removeFromLibrary(itemToBeRemoved) {
    fetch('/library/' + itemToBeRemoved._id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.data && response.data._id) {
          const updatedLibrary = library.filter(
            (item) => item._id !== response.data._id
          );
          setLibrary(updatedLibrary);
        } else {
          console.log(`Could not remove the item ${response.data.title}.`);
        }
      });
  }

  return (
    <div>
      <Header />

      <Switch>
        <Route exact path="/">
          <Home
            onSetCurrentPage={setCurrentPage}
            currentPage={currentPage}
            watchlist={watchlist}
            library={library}
            onCheckItem={checkItem}
            onEditWatchlist={editWatchlist}
            onRemoveFromWatchlist={removeFromWatchlist}
            onEditLibrary={editLibrary}
            onRemoveFromLibrary={removeFromLibrary}
            onSetItemToBeEdited={setItemToBeEdited}
            itemToBeEdited={itemToBeEdited}
          />
        </Route>

        <Route path="/watchlist">
          <Watchlist
            onSetCurrentPage={setCurrentPage}
            currentPage={currentPage}
            watchlist={watchlist}
            onAddToWatchlist={addToWatchlist}
            itemToBeEdited={itemToBeEdited}
            onSetItemToBeEdited={setItemToBeEdited}
            onEditWatchlist={editWatchlist}
            onRemoveFromWatchlist={removeFromWatchlist}
            onCheckItem={checkItem}
          />
        </Route>

        <Route path="/library">
          <Library
            onSetCurrentPage={setCurrentPage}
            currentPage={currentPage}
            library={library}
            onAddToLibrary={addToLibrary}
            itemToBeEdited={itemToBeEdited}
            onSetItemToBeEdited={setItemToBeEdited}
            onEditLibrary={editLibrary}
            onRemoveFromLibrary={removeFromLibrary}
            onCheckItem={checkItem}
          />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}
