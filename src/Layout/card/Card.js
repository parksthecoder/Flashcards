import React from "react";
import PropTypes from "prop-types";

/**
 * Card component used during a Study session.
 * Shows the front side and can be flipped to the back side
 * @param {ComponentProps} props - Properties passed in for the component
 * @param {Object} props.deck - deck object represents a stack of cards
 * @param {number} props.cardNum - index of the card
 * @param {boolean} props.flipped - whether card is currently flipped
 * @param {function} props.flip - flips the card when callled
 * @param {function} props.next - Goes to the next card when called
 * @returns {ReactElement} JSX for a Card component
 */

function Card({ deck, cardNum, flipped, flip, next }) {
  return (
    <div className="card mt-2" id={`card-${deck.id}`}>
      <div className="card-body">
        <h4 className="card-title">
          Card {cardNum + 1} of {deck.cards.length}
        </h4>
        <p className="card-text">
          {deck.cards[cardNum][flipped ? "back" : "front"]}
        </p>
        <button type="button" className="btn btn-secondary mr-2" onClick={flip}>
          Flip
        </button>
        {flipped && (
          <button type="button" className="btn btn-primary mr-2" onClick={next}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

Card.propTypes = {
  deck: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  cardNum: PropTypes.number.isRequired,
  flipped: PropTypes.bool.isRequired,
  flip: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

export default Card;
