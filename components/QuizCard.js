import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import FlipCard from "react-native-flip-card";
import { TouchableOpacity } from "react-native-gesture-handler";

class QuizCard extends React.Component {
  state = {
    flip: false,
    score: 0,
    cardNo: 0,
  };
  render() {
    const { questions, cards } = this.props;
    const { flip, cardNo } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 25 }}>
          {cardNo + 1}/{cards}
        </Text>
        <View style={styles.CardContainer}>
          <FlipCard friction={10} clickable={false} flip={flip}>
            <View style={styles.Card}>
              <Text style={[styles.text, { fontSize: 50 }]}>
                {questions[cardNo].question}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState((state) => ({ flip: !state.flip }))
                }
              >
                <Text style={(styles.btn, {})}>Answer</Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={[styles.cardBtn, { backgroundColor: "blue" }]}
                >
                  <Text style={{ color: "white" }}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cardBtn, styles.IncBtn]}>
                  <Text>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.Card}>
              <Text style={[styles.text, { fontSize: 20, padding: 10 }]}>
                {questions[cardNo].answer}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState((state) => ({ flip: !state.flip }))
                }
              >
                <Text style={styles.btn}>Question</Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={[
                    styles.cardBtn,
                    { backgroundColor: "blue", marginTop: 150 },
                  ]}
                >
                  <Text style={{ color: "white" }}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cardBtn, styles.IncBtn]}>
                  <Text>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
          </FlipCard>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state, { route }) {
  const title = route.params.title;
  const cards = route.params.cards;
  const questions = state[title].questions;
  return {
    questions,
    cards,
  };
}

export default connect(mapStateToProps)(QuizCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  CardContainer: {
    alignSelf: "center",
    margin: 20,
  },

  Card: {
    height: 550,
    width: 350,
    borderColor: "blue",
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    color: "red",
    fontSize: 20,
  },
  text: {
    textAlign: "center",
  },
  cardBtn: {
    borderRadius: 10,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  IncBtn: {
    borderColor: "blue",
    borderWidth: 1,
  },
});
