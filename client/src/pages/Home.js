import { useState, useEffect } from 'react';

import WatchlistCards from '../components/WatchlistCards';
import LibraryCards from '../components/LibraryCards';
import WatchlistForm from '../components/WatchlistForm';
import LibraryForm from '../components/LibraryForm';

export default function Home({
  onSetPage,
  watchlist,
  library,
  onCheckItem,
  onEditWatchlist,
  onRemoveFromWatchlist,
  onEditLibrary,
  onRemoveFromLibrary,
  onSetItemToBeEdited,
  itemToBeEdited
}) {
  useEffect(() => {
    onSetPage('home');
    onSetItemToBeEdited('');
  }, []);

  const [formOnScreen, setFormOnScreen] = useState(false);
  const [formToBeShown, setFormToBeShown] = useState('none');

  useEffect(() => {
    if (itemToBeEdited) {
      if (watchlist.find((item) => item.id === itemToBeEdited.id)) {
        setFormToBeShown('watchlist');
      } else if (library.find((item) => item.id === itemToBeEdited.id)) {
        setFormToBeShown('library');
      }
    } else {
      setFormToBeShown('none');
    }
  }, [formOnScreen]);

  return (
    <>
      <main>
        <h2>Meine letzten Einträge</h2>

        <WatchlistCards
          watchlist={watchlist}
          onSetItemToBeEdited={onSetItemToBeEdited}
          onSetFormOnScreen={setFormOnScreen}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
          onCheckItem={onCheckItem}
        />

        <LibraryCards
          library={library}
          onSetItemToBeEdited={onSetItemToBeEdited}
          onSetFormOnScreen={setFormOnScreen}
          onRemoveFromLibrary={onRemoveFromLibrary}
          onCheckItem={onCheckItem}
        />

        {formToBeShown === 'watchlist' && (
          <WatchlistForm
            onSetFormOnScreen={setFormOnScreen}
            itemToBeEdited={itemToBeEdited}
            onSetItemToBeEdited={onSetItemToBeEdited}
            onEditWatchlist={onEditWatchlist}
          />
        )}
        {formToBeShown === 'library' && (
          <LibraryForm
            onSetFormOnScreen={setFormOnScreen}
            itemToBeEdited={itemToBeEdited}
            onSetItemToBeEdited={onSetItemToBeEdited}
            onEditLibrary={onEditLibrary}
          />
        )}
      </main>
    </>
  );
}
