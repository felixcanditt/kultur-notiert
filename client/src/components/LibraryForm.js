import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import LibraryFormStars from './LibraryFormStars';

export default function LibraryForm({
  onAddToLibrary,
  itemToBeEdited,
  onSetItemToBeEdited,
  onEditLibrary
}) {
  const initialFormItem = {
    title: '',
    category: '',
    rating: 0,
    notes: '',
    isWatched: true
  };

  const [formItem, setFormItem] = useState(initialFormItem);

  useEffect(() => {
    if (itemToBeEdited) {
      setFormItem(itemToBeEdited);
    }
  }, [itemToBeEdited]);

  function updateFormItem(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setFormItem({ ...formItem, [inputName]: inputValue });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    itemToBeEdited
      ? onEditLibrary(formItem)
      : onAddToLibrary({ ...formItem, id: uuidv4() });
    setFormItem(initialFormItem);
  }

  function handleFormCancelation() {
    if (itemToBeEdited) {
      onSetItemToBeEdited();
    }
    setFormItem(initialFormItem);
  }

  return (
    <Form onSubmit={handleFormSubmission}>
      <h3>Neuen Eintrag hinzufügen</h3>

      <label>
        <span>Titel</span>
        <input
          type="text"
          name="title"
          onChange={updateFormItem}
          value={formItem.title}
        />
      </label>

      <label>
        <span>Kategorie</span>
        <select
          name="category"
          onChange={updateFormItem}
          value={formItem.category}
        >
          <option value=""></option>
          <option value="book">Buch</option>
          <option value="movie">Film</option>
          <option value="series">Serie</option>
          <option value="stage">Bühne</option>
          <option value="exhibition">Ausstellung</option>
          <option value="festival">Festival</option>
        </select>
      </label>

      <LibraryFormStars formItem={formItem} onSetFormItem={setFormItem} />

      <Notes>
        <label htmlFor="notes" className="notesLabel">
          Notizen
        </label>
        <textarea
          id="notes"
          name="notes"
          onChange={updateFormItem}
          value={formItem.notes}
        ></textarea>
      </Notes>

      <Buttons>
        <button type="reset" onClick={handleFormCancelation}>
          abbrechen
        </button>
        <button>speichern</button>
      </Buttons>
    </Form>
  );
}

const Form = styled.form`
  margin: 0 auto;
  max-width: 25rem;

  box-shadow: 0.3rem 0.3rem 0.8rem var(--grey-light);
  border-radius: 1.8rem;

  background-color: var(--primary-lightest);

  padding: 2rem;

  display: grid;
  gap: 1.5rem;

  h3 {
    margin-bottom: 0.5rem;
    text-align: center;
  }

  span {
    margin-right: 0.7rem;
  }

  input,
  select,
  textarea {
    border-radius: 0.8rem;
    background: white;
    padding: 0.5rem;
    border: 0.06rem black solid;
  }

  input {
    width: 11rem;
  }
`;

const Notes = styled.div`
  display: grid;
  gap: 0.5rem;

  textarea {
    resize: none;
    height: 5rem;
  }
`;

const Buttons = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-around;

  button {
    cursor: pointer;

    border: none;
    border-radius: 0.4rem;

    background-color: var(--secondary);

    padding: 0.6rem;
  }
`;
