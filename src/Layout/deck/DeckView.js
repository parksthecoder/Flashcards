import React, { useState, useEffect } from "react";
import { readDeck } from "../../utils/api/index";
import { useParams } from "react-router-dom";
import Breadcrumb from "../comp/Breadcrumb";
import Buttons from "../comp/Buttons";
import CardView from "../card/CardView";
import PropTypes from "prop-types";

/**
 * DeckView component displayed information about the deck
 * as well as all of its cards
 * @param {ComponentProps} props - Properties passed in for the component
 * @param {function} props.removeDeck - Removes the deck passed in when called
 * @param {function} props.removeCard - Removes the card passed in when called
 * @param {AbortController} props.abortController - AbortController
 * @returns {ReactElement} JSX for DeckView component
 */

function DeckView({ removeDeck, removeCard, abortController }) {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  //get deck when first rendered
  useEffect(() => {
      const abortController = new AbortController();

      async function getDeck() {
        try {
          const response = await readDeck(deckId, abortController.signal);
          setDeck(response);
        } catch (error) {
          if (error.name !== "AbortError") {
            throw error;
          }
        }
      }
    getDeck();

    return () => {
      abortController.abort();
    };
  }, []);

  if (Object.keys(deck).length === 0) return null;

  const cardsJSX = deck.cards.map((card) => (
    <CardView key={card.id} card={card} removeCard={removeCard} />
  ));

  return (
    <div id={`deck-${deck.id}-view`}>
      <Breadcrumb deckName={deck.name} deckId={deck.id} page="view" />
      <h5>{deck.name}</h5>
      <p>{deck.description}</p>

      <Buttons
        names={["edit-deck", "study", "add-card", "delete-deck"]}
        deckId={deck.id}
        removeDeck={removeDeck}
      />

      <h3 className="mt-4">Cards</h3>
      {cardsJSX}
    </div>
  );
}

DeckView.propTypes = {
  removeDeck: PropTypes.func,
  removeCard: PropTypes.func,
  abortController: PropTypes.instanceOf(AbortController).isRequired,
};

export default DeckView;
