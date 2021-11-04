React Component Structure

- index.js - Entry point into React Application

  - App.js - Includes Layout Folder

    - /layout/index.js
      --> the main component of entire app
      --> exported as layout/ imported as layout into App.js

    * receives { listDecks, deleteDeck, createDeck, deleteCard, updateDeck, createCard, updateCard } from "../utils/api/index";

      getDecks() uses listDecks API call
      addDeck() uses createDeck API call
      addCard() uses createCard API call
      editDeck() uses updateDeck API call
      editCard() uses updateCard API call
      removeDeck() uses deleteDeck API call
      removeCard() uses deleteCard API call

    * sends to DeckList.js
      decks={decks} removeDeck={removeDeck}

    * sends to Form.js
      edit={false} addDeck={addDeck} abortController={abortController}

    * sends to Deck.js
      editDeck={editDeck}
      removeDeck={removeDeck}
      addCard={addCard}
      editCard={editCard}
      removeCard={removeCard}
      abortController={abortController}

    * NotFound.js is included with no route path

      - /layout/DeckList.js - receives
        decks={decks}
        removeDeck={removeDeck}
        from layout/index.js

      - /layout/Form.js - receives
        edit={false}
        addDeck={addDeck}
        abortController={abortController}
        from layout/index.js

      - /layout/Deck.js receives
        editDeck={editDeck}
        removeDeck={removeDeck}
        addCard={addCard}
        editCard={editCard}
        removeCard={removeCard}
        abortController={abortController}




