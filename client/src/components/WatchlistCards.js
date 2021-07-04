import styled from 'styled-components';

import WatchlistCard from './WatchlistCard';

export default function WatchlistCards({
  currentPage,
  watchlist,
  onSetItemToBeEdited,
  onSetFormOnScreen,
  onRemoveFromWatchlist,
  onCheckItem
}) {
  function listToBeRendered() {
    const watchlistNewOnTop = watchlist.slice().reverse();
    const watchlistNewest = watchlistNewOnTop.slice(0, 2);
    let relevantList;
    currentPage === 'watchlist'
      ? (relevantList = watchlistNewOnTop)
      : (relevantList = watchlistNewest);
    return relevantList;
  }

  return (
    <Grid>
      {listToBeRendered().map((item) => (
        <WatchlistCard
          key={item._id}
          item={item}
          onSetItemToBeEdited={onSetItemToBeEdited}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
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
