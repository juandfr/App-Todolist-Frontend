import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, KeyboardAvoidingView, TextInput , TouchableOpacity} from 'react-native';

import api from './src/services/api';
import Task from './src/components/Task/index';

class App extends Component{
       constructor(props){
         super(props);

         this.state = {
           tasks: []
         }
      }

     async componentDidMount(){
       const response = await api.get('tasks');
       this.setState({
            tasks: response.data
       })
   }

   async createTask(){
    const response = await api.get('tasks');
    this.setState({
         tasks: response.data
    })
}

   render(){
     return(
      <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Lista de Tarefas 📝</Text>
          <View style={styles.items}>
          
          <FlatList
                    data = {this.state.tasks}
                    keyExtractor  = { item => item.id.toString() }
                    renderItem  = {({item}) => <Task data={item}/>}
             />
            
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Escreva sua tarefa"}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>➕</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
     )

   }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});


export default App;
