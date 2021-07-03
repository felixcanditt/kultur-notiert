import styled from 'styled-components';

import LibraryCard from './LibraryCard';

export default function LibraryCards({
  currentPage,
  library,
  onSetItemToBeEdited,
  onSetFormOnScreen,
  onRemoveFromLibrary,
  onCheckItem
}) {
  function listToBeRendered() {
    const libraryNewOnTop = library.slice().reverse();

    const libraryNewest = library.slice(0, 2);
    let relevantList;
    currentPage === 'library'
      ? (relevantList = libraryNewOnTop)
      : (relevantList = libraryNewest);
    return relevantList;
  }

  return (
    <Grid>
      {listToBeRendered().map((item) => (
        <LibraryCard
          key={item._id}
          item={item}
          onSetItemToBeEdited={onSetItemToBeEdited}
          onRemoveFromLibrary={onRemoveFromLibrary}
          onCheckItem={onCheckItem}
          onSetFormOnScreen={onSetFormOnScreen}
        />
      ))}
    </Grid>
  );
}

const Grid = styled.section`
  margin-top: 3rem;
  display: grid;
  justify-content: center;
  gap: 3rem;
`;
