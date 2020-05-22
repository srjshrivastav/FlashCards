import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

export function NotQuiz() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 20, textAlign: "center" }}>
        Sorry, you cannot take a quiz because there are no cards in the deck.
      </Text>
    </View>
  );
}

class Cards extends React.Component {
  startQuiz = (title, cards, navigation) => {
    return cards !== 0
      ? navigation.navigate("Quiz", { title, cards })
      : navigation.navigate("NotQuiz");
  };

  render() {
    const { title, cards, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 60 }}>{title}</Text>
        <Text style={{ fontSize: 20, color: "gray" }}>{cards} cards</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.Btn, { backgroundColor: "blue" }]}
            onPress={() => {
              navigation.navigate("Add Card", { title });
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => this.startQuiz(title, cards, navigation)}
          >
            <Text style={{ fontWeight: "bold" }}>Start Quiz</Text>
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
    cards: state[title].questions.length,
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
    paddingLeft: 70,
  },
});
