import { ADD_DECK, ADD_CARD, RECEIVE_DECK, DELETE_DECK } from "../actions";

export default function deck(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.card.title.toLowerCase()]: {
          ...state[action.card.title.toLowerCase()],
          questions: [
            ...state[action.card.title.toLowerCase()].questions,
            action.card.ques,
          ],
        },
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title.toLowerCase()]: action.deck,
      };
    case RECEIVE_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case DELETE_DECK:
      delete state[action.title];
      return {
        ...state,
      };
    default:
      return state;
  }
}
