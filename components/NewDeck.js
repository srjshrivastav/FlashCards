import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { addDeck } from "../actions";
import { connect } from "react-redux";
import { saveDeckTitle } from "../utils/helpers";
class NewDeck extends React.Component {
  state = {
    title: "",
  };

  handleAddDeck = () => {
    const { dispatch, navigation } = this.props;
    const { title } = this.state;
    this.setState(() => ({
      title: "",
    }));
    saveDeckTitle(title).then((result) => {
      if (!result) {
        alert("Deck already Exist.Try with another name.");
      } else {
        dispatch(
          addDeck({
            title,
            questions: [],
          })
        );
        navigation.navigate("Deck", { title, cards: 0 });
      }
    });
  };
  render() {
    const setTittle = (title) => {
      this.setState(() => ({
        title,
      }));
    };

    const { title } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 50,
              textAlign: "center",
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            What is the title of your new deck?
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Deck Name"
            onChangeText={(title) => setTittle(title)}
            defaultValue={title}
          />
          <TouchableOpacity
            style={styles.submitBtn}
            disabled={title === ""}
            onPress={this.handleAddDeck}
          >
            <Text style={{ padding: 20 }}>Create Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect()(NewDeck);

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
