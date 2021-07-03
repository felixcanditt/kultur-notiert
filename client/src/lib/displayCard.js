import bookIcon from '../images/book.svg';
import cameraIcon from '../images/camera.svg';
import televisionIcon from '../images/television.svg';
import musicIcon from '../images/music.svg';
import curtainIcon from '../images/curtain.svg';
import venusIcon from '../images/venus-de-milo.svg';
import confettiIcon from '../images/confetti.svg';
import maskIcon from '../images/mask.svg';

export function displayCategoryIcon(savedCategory) {
  let categoryIcon;
  let categoryAlt;

  if (savedCategory === 'book') {
    categoryIcon = bookIcon;
    categoryAlt = 'Kategorie Buch';
  } else if (savedCategory === 'movie') {
    categoryIcon = cameraIcon;
    categoryAlt = 'Kategorie Film';
  } else if (savedCategory === 'series') {
    categoryIcon = televisionIcon;
    categoryAlt = 'Kategorie Serie';
  } else if (savedCategory === 'music') {
    categoryIcon = musicIcon;
    categoryAlt = 'Kategorie Musik';
  } else if (savedCategory === 'stage') {
    categoryIcon = curtainIcon;
    categoryAlt = 'Kategorie Bühne';
  } else if (savedCategory === 'exhibition') {
    categoryIcon = venusIcon;
    categoryAlt = 'Kategorie Ausstellung';
  } else if (savedCategory === 'festival') {
    categoryIcon = confettiIcon;
    categoryAlt = 'Kategorie Festival';
  } else if (savedCategory === 'miscellaneous') {
    categoryIcon = maskIcon;
    categoryAlt = 'Kategorie Sonstiges';
  }

  return <img src={categoryIcon} alt={categoryAlt} />;
}

export function displayCategory(savedCategory) {
  const getText = {
    book: 'Buch',
    movie: 'Film',
    series: 'Serie',
    music: 'Musik',
    stage: 'Bühne',
    exhibition: 'Ausstellung',
    festival: 'Festival',
    miscellaneous: 'Sonstiges',
    noSavedData: ''
  };

  return getText[savedCategory] ? (
    <p>{getText[savedCategory]}</p>
  ) : (
    getText['noSavedData']
  );
}

export function displayDetails(savedItem) {
  if (savedItem.category === 'book') {
    return <>{savedItem.creator && <p>von {savedItem.creator}</p>}</>;
  } else if (savedItem.category === 'movie') {
    return (
      <>
        {savedItem.creator ? <p>von {savedItem.creator}</p> : ''}
        {savedItem.location ? <p>gibt's hier: {savedItem.location}</p> : ''}
      </>
    );
  } else if (savedItem.category === 'series') {
    return (
      <>{savedItem.location ? <p>gibt's hier: {savedItem.location}</p> : ''}</>
    );
  } else if (savedItem.category === 'music' || 'miscellaneous') {
    return (
      <>
        {savedItem.creator ? <p>von {savedItem.creator}</p> : ''}
        {savedItem.location ? <p>Wo? {savedItem.location}</p> : ''}
        {savedItem.time ? <p>Wann? {savedItem.time}</p> : ''}
      </>
    );
  } else if (savedItem.category === 'exhibition') {
    return (
      <>
        {savedItem.location ? <p>Ort: {savedItem.location}</p> : ''}
        {savedItem.time ? <p>Läuft bis: {savedItem.time}</p> : ''}
      </>
    );
  } else if (savedItem.category === 'stage' || 'festival') {
    return (
      <>
        {savedItem.location ? <p>Ort: {savedItem.location}</p> : ''}
        {savedItem.time ? <p>Wann? {savedItem.time}</p> : ''}
      </>
    );
  }
}
