import { ADD_DECK, ADD_CARD, RECEIVE_DECK, DELETE_DECK } from "../actions";

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
    case DELETE_DECK:
      delete state[action.title];
      console.log("In Index", state);
      return {
        ...state,
      };
    default:
      return state;
  }
}
