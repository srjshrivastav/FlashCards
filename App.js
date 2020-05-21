import React from "react";
import { StatusBar, View, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Decks from "./components/Decks";
import NewDeck from "./components/NewDeck";
import { NavigationContainer } from "@react-navigation/native";
import { Feather, Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";

const Tab = createBottomTabNavigator();

function AppBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <AppBar translucent backgroundColor="blue" barStyle="default" />
        <View style={styles.tab}>
          <Text style={{ color: "white", fontSize: 25 }}>Decks</Text>
        </View>
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
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
});
