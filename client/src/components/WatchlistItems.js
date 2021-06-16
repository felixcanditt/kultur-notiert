import styled from 'styled-components';

export default function WatchlistItems({
  watchlist,
  onRemoveFromWatchlist,
  onCheckItem
}) {
  return (
    <Grid>
      {watchlist.map((item, index) => (
        <ItemCard key={index}>
          <p>{item.title}</p>
          <p>{item.category}</p>

          <label>
            <input
              type="checkbox"
              name="isWatched"
              checked={item.isWatched}
              onChange={(event) => onCheckItem(event, item, index)}
            />
            angeschaut
          </label>

          <button onClick={() => onRemoveFromWatchlist(item, index)}>
            löschen
          </button>
        </ItemCard>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  margin-top: 3rem;
  display: grid;
  justify-content: center;
  gap: 1rem;
`;

const ItemCard = styled.div`
  max-width: 15rem;
  border-radius: 0.4rem;
  padding: 1.2rem 1rem;
  background: hotpink;
  color: ivory;

  display: grid;
  gap: 0.8rem;

  input {
    transform: scale(1.5);
    margin-right: 0.7rem;
  }

  button {
    justify-self: end;
    cursor: pointer;
    border: none;
    border-radius: 0.3rem;
    background: turquoise;
    padding: 0.2rem 0.3rem;
    font-size: 1.25rem;
  }
`;
