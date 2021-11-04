import React from "react";
import Buttons from "./comp/Buttons";
import PropTypes from "prop-types";

/**
 * NotEnoughCards component is displayed when user tries to
 * study a deck with too little cards
 * @param {ComponentProps} props - Properties passed in for the component
 * @param {number} length - how many cards are in the deck
 * @param {number} id - the id of the deck they are in
 * @returns {ReactElement} JSX for NotEnoughCards component
 */

function NotEnoughCards({ length, id }) {
    return (
        <div id="card-error">
            <h3>Not enough cards.</h3>
            <p>You need at least 3 cards to study. There are {length} cards in this deck.</p>

            <Buttons names={["add-card"]} deckId={id}/>
        </div>
    );
}

NotEnoughCards.propTypes = {
    length: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
};

export default NotEnoughCards;