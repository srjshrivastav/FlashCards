import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { addCardToDeck } from "../utils/helpers";

class AddCard extends React.Component {
  state = {
    question: "",
    answer: "",
  };
  handleAddCard = () => {
    const { dispatch, navigation, route } = this.props;
    const { question, answer } = this.state;

    dispatch(
      addCard({
        title: route.params.title,
        ques: {
          question,
          answer,
        },
      })
    );
    addCardToDeck(route.params.title, {
      title: route.params.title,
      ques: {
        question,
        answer,
      },
    });

    navigation.goBack();
  };

  render() {
    const setQuestion = (question) => {
      this.setState(() => ({
        question,
      }));
    };

    const setAnswer = (answer) => {
      this.setState(() => ({
        answer,
      }));
    };

    const { question, answer } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { marginTop: 100 }]}>
          <TextInput
            style={styles.textInput}
            placeholder="Your Question"
            onChangeText={(question) => setQuestion(question)}
            defaultValue={question}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Your Answer"
            onChangeText={(answer) => setAnswer(answer)}
            defaultValue={answer}
          />
          <TouchableOpacity
            style={styles.submitBtn}
            disabled={question === "" || answer === ""}
            onPress={() => this.handleAddCard()}
          >
            <Text style={{ padding: 20 }}>Add Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect()(AddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  tab: {
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 350,
    marginTop: 10,
    textAlign: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  submitBtn: {
    borderColor: "blue",
    borderWidth: 1,
    marginTop: 100,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
