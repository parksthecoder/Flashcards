import React from "react";
import Buttons from "../comp/Buttons";
import PropTypes from "prop-types";

/**
 * CardView component is used when viewing a deck.
 * shows both sides of the card as well as <Buttons /> to delete/edit the card
 * @param {ComponentProps} props - Properties passed in for the component
 * @param {Object} props.card - card object representing a flashcard
 * @param {function} props.removeCard - removes the card passed in when called
 * @returns {ReactElement} - JSX for CardView component
 */

function CardView({ card, removeCard }) {
  return (
    <ul className="list-group">
      <li className="list-group-item">{card.front}</li>
      <li className="list-group-item">{card.back} </li>
      <li className="list-group-item">
        <Buttons
          names={["delete-card", "edit-card"]}
          removeCard={removeCard}
          deckId={card.deckId}
          cardId={card.id}
        />
      </li>
    </ul>
  );
}

CardView.propTypes = {
  card: PropTypes.shape({
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
    deckId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  removeCard: PropTypes.func.isRequired,
};

export default CardView;
