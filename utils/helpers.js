import { AsyncStorage } from "react-native";

const STORAGE_KEY = "FlashCards:decks";

function createData() {
  return {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces",
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event",
        },
      ],
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared.",
        },
      ],
    },
  };
}

export function getData() {
  return createData();
}

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      return data;
    })
    .catch((e) => console.log("wrong something"));
}

export function getDeck(id) {}

export function saveDeckTitle(title) {
  // const deck = {
  //   title,
  //   questions: [],
  // };
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(createData()))
    .then(() => {
      getDecks();
    })
    .catch((e) => console.log(e));
}
export function addCardToDeck(title, card) {}
