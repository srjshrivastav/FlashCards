import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const STORAGE_KEY = "FlashCards:decks";
const NOTIFICATION_KEY = "FlashCards:notifications";

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

function createNotification() {
  return {
    title: "Quizz Time",
    body: "Hey! Answer the some interesting quizzes",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function cancelLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(17);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
