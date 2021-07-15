import React, {Component} from 'react';
import RNRestart from 'react-native-restart';
import { StyleSheet, Text, View, FlatList, ScrollView, KeyboardAvoidingView, TextInput , TouchableOpacity, Button} from 'react-native';

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

   async createTask(username){
    api.post('tasks/', {
      description: username,
      user_id: 1
    })
    const response = await api.get('tasks');
       this.setState({
            tasks: response.data
       })
    
  } 

   render(){
     return(
      <View style={styles.container}>
      
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Lista de Tarefas 📝</Text>
          <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
          <View style={styles.items}>
          
          <FlatList
                    data = {this.state.tasks}
                    keyExtractor  = { item => item.id.toString() }
                    renderItem  = {({item}) => <Task data={item}/>}
             />
            
          </View>
          </ScrollView>
        </View>
     

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Escreva sua tarefa"}
          onChangeText={(value) => this.setState({username: value})}

        />
        <TouchableOpacity >
          <View style={styles.addWrapper} >
          <Text style={styles.addText} onPress={() =>this.createTask(this.state.username)}>➕</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
     )

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
    marginBottom: 120
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 20,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
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
  addText: {
  },
});


export default App;
