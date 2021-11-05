import React, { Fragment, useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import {
  listDecks,
  deleteDeck,
  createDeck,
  deleteCard,
  updateDeck,
  createCard,
  updateCard,
} from "../utils/api/index";

import Header from "./comp/Header";
import NotFound from "./NotFound";
import DeckList from "./deck/DeckList";
import Deck from "./deck/Deck";
import Form from "./form/Form";

function Layout() {
  const [decks, setDecks] = useState([]);
  const abortController = new AbortController();
  const signal = abortController.signal;
  const history = useHistory();


  useEffect(() => {
    async function getListOfDesk() {
      const listOfDesksFromAPI = await listDecks();

      setDecks((current) => (current = listOfDesksFromAPI));
    }

    getListOfDesk();
  }, []);

  /**
   * Fetches all current decks form the database
   * -- using listDecks from utils/api/index.js -> API call
   */
  async function getDecks() {
    try {
      const response = await listDecks(signal);
      console.log("=response=>", response, "<==");
      setDecks(response);
    } catch (error) {
      console.log("=error=>", error, "<==");
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }

  /**
   * Posts a deck to the database
   * -- using createDeck from utils/api/index.js -> API call
   * @param {Object} deck - deck object represents a stack of cards
   * @returns {number} The id of created deck
   */

  async function addDeck(deck) {
    const created = await createDeck(deck, signal);
    getDecks();
    return created.id;
  }

  /**
   * Posts a card to the database
   * @param {Object} card - Card object represents a flashcard
   * @param {number} id - id of the deck to post card in
   * @returns {number} - the id of the newly created card
   */
  async function addCard(card, id) {
    const created = await createCard(id, card, signal);
    getDecks();
    return created.id;
  }

  /**
   * Updates a deck in the database
   * @param {Object} deck - a deck object representing a stack of cards
   * @returns {number} - id of the newly edited deck
   */
  async function editDeck(deck) {
    const edited = await updateDeck(deck, signal);
    getDecks();
    return edited.id;
  }

  /**
   * Updates a card in the database
   * @param {Object} card - card object representing a flashcard
   * @returns {number} - id of the newly edited card
   */
  async function editCard(card) {
    const edited = await updateCard(card, signal);
    getDecks();
    return edited.id;
  }

  /**
   * Delete a deck in the database
   * @param {Object} id - id of the deck to delete
   */
  async function removeDeck(id) {
    if (
      window.confirm(`Delete this deck?/n/nYou will not be able to recover it.`)
    ) {
      await deleteDeck(id, signal);
      getDecks();
    }
    history.push("/");
  }

  /**
   * Delete a card in the database
   * @param {Object} id - id of the card to delete
   */
  async function removeCard(id) {
    if (
      window.confirm(`Delete this card?/n/nYou will not be able to recover it.`)
    ) {
      await deleteCard(id, signal);
      getDecks();
    }
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} removeDeck={removeDeck} />
          </Route>

          <Route path="/decks/new">
            <Form
              type="deck"
              edit={false}
              addDeck={addDeck}
              abortController={abortController}
            />
          </Route>

          <Route path="/decks/:deckId/">
            <Deck
              editDeck={editDeck}
              removeDeck={removeDeck}
              addCard={addCard}
              editCard={editCard}
              removeCard={removeCard}
              abortController={abortController}
            />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
