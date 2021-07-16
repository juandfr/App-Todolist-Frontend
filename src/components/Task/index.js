import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import api from "../../services/api";
class Task extends Component {

  async deleteTask(id) {
    await api.delete("tasks/" + id + "/");
  }

  render() {
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemText}>{this.props.data.description}</Text>
        </View>
        <TouchableOpacity onPress={() => this.deleteTask(this.props.data.id)}>
        <View style={styles.circular}></View>
        </TouchableOpacity>
      </View>
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
    width: 20,
    height: 20,
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
