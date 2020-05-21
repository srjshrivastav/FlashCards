import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { getData } from "../utils/helpers";

class Decks extends React.Component {
  render() {
    const data = getData();
    return (
      <View>
        <View style={styles.tab}>
          <Text style={{ color: "white", fontSize: 25 }}>Decks</Text>
        </View>
        <View style={styles.DeckContainer}>
          {Object.keys(data).map((key) => {
            const { title, questions } = data[key];
            return (
              <TouchableOpacity key={key} style={styles.DeckCard}>
                <Text style={{ fontSize: 30, marginTop: 5 }}>{title}</Text>
                <Text style={{ color: "gray", fontSize: 20 }}>
                  {questions.length} cards
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Decks;

const styles = StyleSheet.create({
  DeckContainer: {
    flex: 1,
    padding: 10,
  },

  DeckCard: {
    backgroundColor: "white",
    height: 100,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
  },
  tab: {
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
});
