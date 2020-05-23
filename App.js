import React from "react";
import { StatusBar, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Decks from "./components/Decks";
import NewDeck from "./components/NewDeck";
import { NavigationContainer } from "@react-navigation/native";
import { Feather, Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Cards from "./components/Cards";
import AddCard from "./components/AddCard";
import QuizCard from "./components/QuizCard";
import { setNotification } from "./utils/helpers";

const Tab = createBottomTabNavigator();
const Deckstack = createStackNavigator();
function HomeStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Decks") {
            return <Feather name="inbox" size={size} color={color} />;
          } else if (route.name === "New Deck") {
            return <Entypo name="plus" size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="New Deck" component={NewDeck} />
    </Tab.Navigator>
  );
}

function AppBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  render() {
    setNotification();
    return (
      <Provider store={createStore(reducers)}>
        <NavigationContainer>
          <AppBar translucent backgroundColor="blue" barStyle="default" />
          <Deckstack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "blue",
              },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: 25,
              },
            }}
          >
            <Deckstack.Screen name="Decks" component={HomeStack} />
            <Deckstack.Screen
              name="Deck"
              component={Cards}
              options={({ route }) => ({ title: route.params.title })}
            />
            <Deckstack.Screen name="Add Card" component={AddCard} />
            <Deckstack.Screen
              name="Quiz"
              component={QuizCard}
              options={({ route }) => ({ title: route.params.title })}
            />
          </Deckstack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
