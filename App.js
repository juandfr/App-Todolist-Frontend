import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import api from "./src/services/api";
import Task from "./src/components/Task/index";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  async componentDidMount() {
    const response = await api.get("tasks");
    this.setState({
      tasks: response.data,
    });
  }

  async createTask(task) {
    api.post("tasks/", {
      description: task,
      user_id: 1,
    });
    const response = await api.get("tasks");
    this.setState({
      tasks: response.data,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          <TouchableOpacity>
          <Text style={styles.sectionTitle} onPress={() => this.componentDidMount()}>Lista de Tarefas 📝</Text>
          </TouchableOpacity>
          <View style={styles.items}>
            <FlatList
              data={this.state.tasks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Task data={item} />}
            />
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Escreva sua tarefa"}
            onChangeText={(value) => this.setState({ task: value })}
          />
          <TouchableOpacity onPress={() => this.createTask(this.state.task)}>
            <View style={styles.addWrapper}>
              <Text
                style={styles.addText}
              >
                ➕
              </Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 120,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 15,
    marginBottom: 35
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 280,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});

export default App;
