import { ADD_DECK, ADD_CARD, RECEIVE_DECK } from "../actions";

export function deck(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [state[action.card.title]]: {
          ...state[action.card.title],
          ...card.question,
        },
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case RECEIVE_DECK:
      return {
        ...state,
        ...action.deck,
      };
    default:
      return state;
  }
}
