import React from "react";
import DeckPreview from "./DeckPreview";
import Buttons from "../comp/Buttons";
import PropTypes from "prop-types";

/**
 * Decklist component contains a list of DeckView components
 * @param {ComponentProps} props - Properties passed in for the component
 * @param {Array<Object>} props.deck - array of all deck objects
 * @param {function} props.removeDeck - removes the deck passed in when called
 * @returns {ReactElement} JSX for a DeckList component
 */

function DeckList({ decks, removeDeck }) {
  const decksJSX = decks.map((deck) => (
    <DeckPreview key={deck.id} deck={deck} removeDeck={removeDeck} />
  ));

  return (
    <div>
      <Buttons names={["add-deck"]} />
      {decksJSX}
    </div>
  );
}

DeckList.propTypes = {
  decks: PropTypes.arrayOf(
    PropTypes.shape({
    //   name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  removeDeck: PropTypes.func.isRequired,
};

export default DeckList;
