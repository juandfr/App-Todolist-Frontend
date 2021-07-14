import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

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

   render(){
     return(
       <View  style={styles.container}>
             <FlatList
                    data = {this.state.tasks}
                    keyExtractor  = { item => item.id.toString() }
                    renderItem  = {({item}) => <Task data={item}/>}
             />
       </View>
     )

   }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
