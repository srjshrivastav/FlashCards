import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

class QuizCard extends React.Component {
  render() {
    const { questions, cards } = this.props;
    console.log(questions);
    return (
      <View>
        <View>
          <Text>{(questions, cards)}</Text>
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
