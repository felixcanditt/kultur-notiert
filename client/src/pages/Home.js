import { useState, useEffect } from 'react';

import WatchlistCards from '../components/WatchlistCards';
import LibraryCards from '../components/LibraryCards';
import WatchlistForm from '../components/WatchlistForm';
import LibraryForm from '../components/LibraryForm';

export default function Home({
  onSetCurrentPage,
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
    onSetCurrentPage('home');
    onSetItemToBeEdited('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [formOnScreen, setFormOnScreen] = useState('none');

  return (
    <>
      <main>
        <h2>
          Meine letzten <br /> Einträge
        </h2>

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

        {formOnScreen === 'watchlist' && (
          <WatchlistForm
            onSetFormOnScreen={setFormOnScreen}
            itemToBeEdited={itemToBeEdited}
            onSetItemToBeEdited={onSetItemToBeEdited}
            onEditWatchlist={onEditWatchlist}
          />
        )}
        {formOnScreen === 'library' && (
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
