import { useState } from 'react';

import styled from 'styled-components';

import CardCategory from './CardCategory';

import starIcon from '../images/star.svg';
import arrowDownIcon from '../images/arrow-down.svg';
import arrowUpIcon from '../images/arrow-up.svg';
import checkmarkIcon from '../images/checkmark-checked.svg';
import pencilIcon from '../images/pencil.svg';
import removeIcon from '../images/remove.svg';

export default function LibraryCard({
  item,
  onCheckItem,
  onSetItemToBeEdited,
  onSetFormOnScreen,
  onRemoveFromLibrary
}) {
  const [notesOnScreen, setNotesOnScreen] = useState(false);

  function displayStar(positionOfClickedStar) {
    return (
      <img
        src={starIcon}
        alt="Eintrag mit Sternen bewerten"
        style={
          item.rating >= positionOfClickedStar
            ? { opacity: '100%' }
            : { opacity: '25%' }
        }
      />
    );
  }

  function handleClickOnEdit(clickedItem) {
    onSetItemToBeEdited(clickedItem);
    onSetFormOnScreen('library');
  }

  return (
    <Card>
      {item.title ? <h4>{item.title}</h4> : <h4>Ohne Titel</h4>}

      {item.category && <CardCategory item={item} />}

      {item.rating !== 0 && (
        <Stars>
          {displayStar(1)}
          {displayStar(2)}
          {displayStar(3)}
          {displayStar(4)}
          {displayStar(5)}
        </Stars>
      )}

      {item.notes && (
        <ShowNotesButton>
          <img
            src={notesOnScreen ? arrowUpIcon : arrowDownIcon}
            alt="Meine Notizen anzeigen"
            onClick={() => setNotesOnScreen(!notesOnScreen)}
          />
          <span>Meine Notizen</span>
        </ShowNotesButton>
      )}

      {item.notes && notesOnScreen && <p>{item.notes}</p>}

      <Buttons>
        <img
          src={checkmarkIcon}
          alt="Haekchen setzen"
          onClick={() => onCheckItem(item)}
        />

        <img
          src={pencilIcon}
          alt="Eintrag bearbeiten"
          onClick={() => handleClickOnEdit(item)}
        />

        <img
          src={removeIcon}
          alt="Eintrag entfernen"
          onClick={() => onRemoveFromLibrary(item)}
        />
      </Buttons>
    </Card>
  );
}

const Card = styled.article`
  width: 85vw;
  max-width: 20rem;

  box-shadow: var(--grey-light) 0px 12.5px 25px -5px,
    var(--secondary-darkest) 0px 7.5px 15px -7.5px,
    var(--grey-light) 0px -2px 6px 0px inset;

  border-radius: 1.8rem;
  padding: 2rem;
  background: var(--secondary-lightest);

  display: grid;
  gap: 0.2rem;

  h4 {
    margin-bottom: 0.7rem;
  }
`;

const Stars = styled.div`
  margin: 0.2rem 0 1.1rem 0;
  display: flex;
  gap: 1rem;

  img {
    width: 2.2rem;
  }
`;

const ShowNotesButton = styled.div`
  margin: 0.4rem 0;
  display: flex;
  align-items: center;
  gap: 0.7rem;

  img {
    cursor: pointer;
    width: 2rem;
  }
`;

const Buttons = styled.div`
  margin-top: 1.1rem;
  display: flex;
  justify-content: space-around;

  img {
    cursor: pointer;
    width: 2.1rem;
  }
`;
