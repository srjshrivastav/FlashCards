import React from "react";
import { Text, View, StyleSheet, TextInput, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class NewDeck extends React.Component {
  state = {
    text: "",
  };
  render() {
    const setText = (text) => {
      this.setState(() => ({
        text,
      }));
    };

    const { text } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.tab}>
          <Text style={{ color: "white", fontSize: 25 }}>Add Deck</Text>
        </View>
        <View style={styles.container}>
          <Text style={{ fontSize: 40, paddingTop: 40 }}>
            What is the title
          </Text>
          <Text style={{ fontSize: 40 }}>of your new</Text>
          <Text style={{ fontSize: 40, paddingBottom: 20 }}>deck?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Deck Name"
            onChangeText={(text) => setText(text)}
            defaultValue={text}
          />
          <TouchableOpacity style={styles.submitBtn} disabled={text === ""}>
            <Text style={{ padding: 20 }}>ADD DECK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
