import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { deleteDeck } from "../actions";
import {
  removeDeck,
  setNotification,
  cancelLocalNotification,
} from "../utils/helpers";

class Cards extends React.Component {
  handleStartQuiz = (title, cards, navigation) => {
    cancelLocalNotification();
    setNotification();
    navigation.navigate("Quiz", { title, cards });
  };

  handleDelete = (title, navigation) => {
    removeDeck(title.toLowerCase()).then(() => {
      this.props.dispatch(deleteDeck(title.toLowerCase()));
    });

    navigation.navigate("Decks");
  };

  render() {
    const { title, cards, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 60 }}>{title}</Text>
        <Text style={{ fontSize: 20, color: "gray" }}>{cards} cards</Text>
        <View style={[styles.btnContainer, { alignItems: "center" }]}>
          <TouchableOpacity
            style={[styles.Btn, { backgroundColor: "blue" }]}
            onPress={() => {
              navigation.navigate("Add Card", { title });
            }}
          >
            <Text style={{ color: "white" }}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => this.handleStartQuiz(title, cards, navigation)}
          >
            <Text>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleDelete(title, navigation)}
            style={{ marginTop: 20 }}
          >
            <Text style={{ color: "red", fontSize: 15 }}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, { route }) {
  const title = route.params.title;
  return {
    title,
    cards: state[title.toLowerCase()]
      ? state[title.toLowerCase()].questions.length
      : null,
  };
}

export default connect(mapStateToProps)(Cards);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    marginTop: 200,
    justifyContent: "space-around",
  },
  Btn: {
    margin: 5,
    width: 200,
    height: 65,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
