import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import FlipCard from "react-native-flip-card";
import { TouchableOpacity } from "react-native-gesture-handler";

class QuizCard extends React.Component {
  render() {
    const { questions, cards } = this.props;
    return (
      <View style={styles.container}>
        <Text>{cards}</Text>
        <View style={styles.CardContainer}>
          <FlipCard>
            {/* Face Side */}
            <View style={styles.Card}>
              <Text>The Face</Text>
            </View>
            {/* Back Side */}
            <View style={styles.Card}>
              <Text>The Back</Text>
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
});
