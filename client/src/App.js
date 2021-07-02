import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Library from './pages/Library';

import Header from './components/Header';
import Footer from './components/Footer';

import { updateLocalStorage, loadFromLocalStorage } from './lib/localStorage';

export default function App() {
  // const [serverMessage, setServerMessage] = useState([]);

  const [watchlist, setWatchlist] = useState([]);

  // const [watchlist, setWatchlist] = useState(
  //   loadFromLocalStorage('kulturNotiertWatchlist') ?? []
  // );

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
    fetch('http://localhost:4000/watchlist')
      .then((result) => result.json())
      .then((apiWatchlist) => setWatchlist(apiWatchlist))
      .catch((error) =>
        console.error(
          `Could not fetch watchlist, please check the following error message: `,
          error
        )
      );
  }, []);

  function addToWatchlist(newItem) {
    fetch('http://localhost:4000/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newItem.title,
        category: newItem.category,
        author: newItem.author,
        director: newItem.director,
        creator: newItem.creator,
        location: newItem.location,
        time: newItem.time
      })
    })
      .then((result) => result.json())
      .then((savedItem) => setWatchlist([savedItem, ...watchlist]))
      .catch((error) =>
        console.error(
          `Could not add the item ${newItem.title} to watchlist, please check the following error message: `,
          error
        )
      );
  }

  // useEffect(() => {
  //   updateLocalStorage('kulturNotiertWatchlist', watchlist);
  // }, [watchlist]);

  useEffect(() => {
    updateLocalStorage('kulturNotiertLibrary', library);
  }, [library]);

  // function addToWatchlist(newItem) {
  //   setWatchlist([newItem, ...watchlist]);
  // }

  function editWatchlist(editedItem) {
    const updatedWatchlist = watchlist.filter(
      (item) => item.id !== editedItem.id
    );
    setWatchlist([editedItem, ...updatedWatchlist]);
    setItemToBeEdited();
  }

  function removeFromWatchlist(itemToBeRemoved) {
    const updatedWatchlist = watchlist.filter(
      (item) => item.id !== itemToBeRemoved.id
    );
    setWatchlist(updatedWatchlist);
  }

  function checkItem(checkedItem) {
    function currentRating() {
      return checkedItem.rating ? checkedItem.rating : 0;
    }

    if (watchlist.find((item) => item.id === checkedItem.id)) {
      const checkedItemWithRating = {
        ...checkedItem,
        rating: currentRating()
      };
      setLibrary([checkedItemWithRating, ...library]);
      removeFromWatchlist(checkedItem);
    } else if (library.find((item) => item.id === checkedItem.id)) {
      setWatchlist([checkedItem, ...watchlist]);
      removeFromLibrary(checkedItem);
    }
  }

  function addToLibrary(newItem) {
    setLibrary([newItem, ...library]);
  }

  function editLibrary(editedItem) {
    const editedLibrary = library.filter((item) => item.id !== editedItem.id);
    setLibrary([editedItem, ...editedLibrary]);
    setItemToBeEdited();
  }

  function removeFromLibrary(itemToBeRemoved) {
    const updatedLibrary = library.filter(
      (item) => item.id !== itemToBeRemoved.id
    );
    setLibrary(updatedLibrary);
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
