import React from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";
import FlipCard from "react-native-flip-card";
import { TouchableOpacity } from "react-native-gesture-handler";

class QuizCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: false,
      score: 0,
      cardNo: 0,
      completed: false,
      Percentage: 0,
      bounceValue: new Animated.Value(1),
    };

    this.baseState = this.state;
  }

  RestartQuiz = () => {
    this.setState(this.baseState);
  };

  handleStartQuiz = (title, cards, navigation) => {
    navigation.navigate("Quiz", { title, cards });
  };

  handleSubmit = (cards, correct) => {
    const { cardNo, bounceValue } = this.state;
    if (cardNo + 1 < cards) {
      this.setState((state) => ({
        cardNo: state.cardNo + 1,
        score: correct ? state.score + 1 : state.score,
      }));
    } else {
      this.setState((state) => ({
        completed: true,
        score: correct ? state.score + 1 : state.score,
      }));
      this.setState((state) => ({
        Percentage: ((state.score / cards) * 100).toFixed(2),
      }));
      Animated.sequence([
        Animated.timing(bounceValue, { duration: 200, toValue: 1.2 }),
        Animated.spring(bounceValue, { friction: 2, toValue: 1 }),
      ]).start();
    }
  };

  render() {
    const { questions, cards, navigation, title } = this.props;
    const { flip, cardNo, completed, Percentage, bounceValue } = this.state;
    if (cards == 0) {
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
            Sorry, you cannot take a quiz because there are no cards in the
            deck.
          </Text>
        </View>
      );
    }
    return !completed ? (
      <View style={styles.Maincontainer}>
        <Text style={{ fontSize: 25 }}>
          {cardNo + 1}/{cards}
        </Text>
        <View style={styles.CardContainer}>
          <FlipCard friction={10} clickable={false} flip={flip}>
            {/* Front Side */}
            <View style={styles.Card}>
              <View style={styles.conatiner}>
                <Text style={{ fontSize: 30, textAlign: "center" }}>
                  {questions[cardNo].question}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState((state) => ({ flip: !state.flip }))
                  }
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    Answer
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "blue" }]}
                  onPress={() => this.handleSubmit(cards, 1)}
                >
                  <Text style={[styles.btntext, { color: "white" }]}>
                    Correct
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, { borderColor: "blue", borderWidth: 1 }]}
                  onPress={() => this.handleSubmit(cards, 0)}
                >
                  <Text style={styles.btntext}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Back Side */}
            <View style={styles.Card}>
              <View style={styles.conatiner}>
                <Text style={{ fontSize: 25, textAlign: "center" }}>
                  {questions[cardNo].answer}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState((state) => ({ flip: !state.flip }))
                  }
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    Question
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "blue" }]}
                  onPress={() => this.handleSubmit(cards, 1)}
                >
                  <Text style={[styles.btntext, { color: "white" }]}>
                    Correct
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, { borderColor: "blue", borderWidth: 1 }]}
                  onPress={() => this.handleSubmit(cards, 0)}
                >
                  <Text style={styles.btntext}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
          </FlipCard>
        </View>
      </View>
    ) : (
      <View style={styles.result}>
        {Percentage < 75 ? (
          <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
            <Text style={{ fontSize: 30, textAlign: "center" }}>
              Hey! You can do better 🙂️
            </Text>
            <Text style={{ fontSize: 25, textAlign: "center" }}>
              Percentage : {Percentage}
            </Text>
            <TouchableOpacity
              onPress={this.RestartQuiz}
              style={[styles.btn, styles.RestartBtn]}
            >
              <Text style={styles.btntext}>Restart Quiz</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
            <Text style={{ fontSize: 30, textAlign: "center" }}>
              Kudos! You scored good marks 😀️
            </Text>
            <Text style={{ fontSize: 25, textAlign: "center" }}>
              Percentage : {Percentage}
            </Text>
            <TouchableOpacity
              onPress={this.RestartQuiz}
              style={[styles.btn, styles.RestartBtn]}
            >
              <Text style={styles.btntext}>Restart Quiz</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    );
  }
}
function mapStateToProps(state, { route }) {
  const title = route.params.title;
  const cards = route.params.cards;
  const questions = state[title.toLowerCase()].questions;
  return {
    questions,
    cards,
    title,
  };
}

export default connect(mapStateToProps)(QuizCard);

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
  },

  CardContainer: {
    alignSelf: "center",
    paddingBottom: 60,
    paddingTop: 20,
  },

  Card: {
    flex: 1,
    width: 350,
    borderColor: "blue",
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
  },

  conatiner: {
    flex: 2,
    marginTop: 20,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  btn: {
    borderRadius: 10,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  result: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  RestartBtn: {
    marginTop: 50,
    borderColor: "blue",
    borderWidth: 1,
    alignSelf: "center",
  },
  btntext: {
    fontSize: 15,
  },
});
