import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import { receiveDeck } from "../actions";
import { getDecks } from "../utils/helpers";

class Decks extends React.Component {
  componentDidMount() {
    getDecks().then((data) => {
      if (data === undefined) {
        getDecks().then((data) => {
          this.props.dispatch(receiveDeck(data));
        });
      } else {
        this.props.dispatch(receiveDeck(data));
      }
    });
  }

  Item({ item, navigation }) {
    const { cards, title } = item;
    return (
      <View>
        <TouchableOpacity
          style={styles.DeckCard}
          onPress={() => navigation.navigate("Deck", { title, cards })}
        >
          <Text style={{ fontSize: 30, marginTop: 5 }}>{title}</Text>
          <Text style={{ color: "gray", fontSize: 20 }}>{cards} cards</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { decks, navigation } = this.props;
    return (
      <SafeAreaView style={styles.DeckContainer}>
        <FlatList
          data={decks}
          renderItem={(deck) => (
            <this.Item item={deck.item} navigation={navigation} />
          )}
          keyExtractor={(deck) => deck.title}
        />
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  const decks = Object.keys(state).map((deck) => {
    return {
      title: state[deck].title,
      cards: state[deck].questions.length,
    };
  });
  return {
    decks,
  };
}

export default connect(mapStateToProps)(Decks);

/////////////////////////Styling of the app/////////////////////
const styles = StyleSheet.create({
  DeckContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
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
});
