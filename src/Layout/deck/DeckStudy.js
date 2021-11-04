import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import Breadcrumb from "../comp/Breadcrumb";
import Card from "../card/Card";
import NotEnoughCards from "../NotEnoughCards";
import PropTypes from "prop-types";

/**
 * DeckStudy component will run through the cards in a deck object
 * @param {AbortController} props.abortController - AbortController
 * @returns {ReactElement} JSX for a DeckStudy component
 */

function DeckStudy({ abortController }) {
    const [ cardNum, setCardNum ] = useState(0);
    const [ flipped, setFlipped ] = useState(false);
    const history = useHistory();
    const [ deck, setDeck ] = useState({});
    const { deckId } = useParams();

    // get deck when first rendered
    useEffect(() => {
        const abortController = new AbortController();

        async function getDeck() {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            }
            catch(error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getDeck();
        return () => {
            abortController.abort();
        };
    }, []);

    // fetches current deck from the database


    if(Object.keys(deck).length === 0) return null;

    if(!deck) return null

    // Flips the current card
    function flip() {
        setFlipped(!flipped);
    }

    // Goes to next card,
    // or prompts user to go through the deck again
    function next() {
        if(cardNum + 1 === deck.cards.length) {
            if(window.confirm(`Restart cards?\n\nClick 'cancel' to return to the home page.`)) {
                setCardNum(0);
            } else {
                history.push("/");
            }
        } else {
            setCardNum(cardNum + 1);
        }
        setFlipped(false);
    }

    return (
        <div id={`deck-${deck.id}-study`}>
            <Breadcrumb deckName={deck.name} deckId={deck.id} page="study" />
            <h1>Study: {deck.name}</h1>

            {deck.cards.length > 2 ? 
            <Card
                key={deck.cards[cardNum].id}
                deck={deck}
                cardNum={cardNum}
                flipped={flipped}
                flip={flip}
                next={next}
            /> :
            <NotEnoughCards length={deck.cards.length} id={deck.id} />}
        </div>
    );
}

DeckStudy.propTypes = {
    abortController: PropTypes.instanceOf(AbortController).isRequired,
};

export default DeckStudy;
