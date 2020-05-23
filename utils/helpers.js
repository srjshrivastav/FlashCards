import { AsyncStorage } from "react-native";

const STORAGE_KEY = "FlashCards:decks";

function createData() {
  return {
    react: {
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
    javascript: {
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

export function setData() {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(createData()));
}

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (!data) {
        setData();
      } else {
        return data;
      }
    })
    .catch((e) => console.log("wrong something"));
}
export function removeDeck(key) {
  return AsyncStorage.getItem(STORAGE_KEY).then((results) => {
    var data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
}

export function saveDeckTitle(title) {
  const key = title.toLowerCase();
  const deck = {
    [key]: {
      title,
      questions: [],
    },
  };
  return getDecks().then((data) => {
    if (!data[key]) {
      AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));
      return true;
    } else {
      return false;
    }
  });
}
export function addCardToDeck(title, card) {
  return getDecks().then((data) => {
    Object.assign(data[title.toLowerCase()].questions, [
      ...data[title.toLowerCase()].questions,
      card.ques,
    ]);
    AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(data));
  });
}
