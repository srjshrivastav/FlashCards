import { ADD_DECK, ADD_CARD, RECEIVE_DECK } from "../actions";

export default function deck(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.card.title]: {
          ...state[action.card.title],
          questions: [...state[action.card.title].questions, action.card.ques],
        },
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck,
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
