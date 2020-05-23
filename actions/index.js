export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const RECEIVE_DECK = "RECEIVE_DECK";
export const DELETE_DECK = "DELETE_DECK";

export function addCard(card) {
  return {
    type: ADD_CARD,
    card,
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function receiveDeck(deck) {
  return {
    type: RECEIVE_DECK,
    deck,
  };
}
export function deleteDeck(title) {
  return {
    type: DELETE_DECK,
    title,
  };
}
