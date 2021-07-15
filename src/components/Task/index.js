import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";

class Task extends Component {
  render() {
    return (
      <TouchableOpacity>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemText}>{this.props.data.description}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 10,
    height: 10,
    backgroundColor: "#000000",
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "1000%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
