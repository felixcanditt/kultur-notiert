import { useState, useEffect } from 'react';
import styled from 'styled-components';

import LibraryForm from '../components/LibraryForm';
import LibraryCards from '../components/LibraryCards';

import plusIcon from '../images/plus.svg';

export default function Library({
  onSetCurrentPage,
  currentPage,
  library,
  onAddToLibrary,
  itemToBeEdited,
  onSetItemToBeEdited,
  onEditLibrary,
  onRemoveFromLibrary,
  onCheckItem
}) {
  useEffect(() => {
    onSetCurrentPage('library');
    onSetItemToBeEdited('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [formOnScreen, setFormOnScreen] = useState('none');

  return (
    <main>
      <TitleWrapper>
        <h2>Meine Sammlung</h2>
        <img
          src={plusIcon}
          alt="Neuen Eintrag zu Meiner Sammlung hinzufügen"
          onClick={() => setFormOnScreen('library')}
        />
      </TitleWrapper>

      {formOnScreen === 'library' && (
        <LibraryForm
          onSetFormOnScreen={setFormOnScreen}
          onAddToLibrary={onAddToLibrary}
          itemToBeEdited={itemToBeEdited}
          onSetItemToBeEdited={onSetItemToBeEdited}
          onEditLibrary={onEditLibrary}
        />
      )}

      <LibraryCards
        currentPage={currentPage}
        library={library}
        onSetItemToBeEdited={onSetItemToBeEdited}
        onSetFormOnScreen={setFormOnScreen}
        onRemoveFromLibrary={onRemoveFromLibrary}
        onCheckItem={onCheckItem}
      />
    </main>
  );
}

const TitleWrapper = styled.div`
  display: grid;
  place-items: center;
  gap: 0.8rem;

  img {
    cursor: pointer;
    width: 3rem;
  }
`;
